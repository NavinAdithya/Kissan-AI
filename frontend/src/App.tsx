import React, { useState, useEffect } from 'react';
import type { 
  TriageResponse, 
  PipelineStage, 
  DemoScenarioId 
} from './types/triage';
import { 
  triageImage, 
  checkBackendHealth, 
  fetchDemoScenario, 
  TriageApiError 
} from './api/triageApi';
import { DEMO_SCENARIOS } from './api/demoData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CameraUploadModal } from './components/CameraUploadModal';
import { AnalysisPipeline } from './components/AnalysisPipeline';
import { ResultView } from './components/ResultView';
import { JudgeModePanel } from './components/JudgeModePanel';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyCropSathiSection } from './components/WhyCropSathiSection';
import { TechCredibilitySection } from './components/TechCredibilitySection';
import { DemoScenarioBar } from './components/DemoScenarioBar';
import { Footer } from './components/Footer';

const INITIAL_STAGES: PipelineStage[] = [
  { id: 'quality', label: 'Checking photo quality', sublabel: 'OpenCV Laplacian sharpness & brightness histograms', status: 'pending' },
  { id: 'preprocess', label: 'Processing leaf image', sublabel: 'Cropping region of interest & foliar color balancing', status: 'pending' },
  { id: 'classifier', label: 'Running disease classifier', sublabel: 'Extracting necrotic lesion patterns across 38 classes', status: 'pending' },
  { id: 'confidence_gate', label: 'Evaluating model confidence', sublabel: 'Verifying statistical margin meets 75% threshold', status: 'pending' },
  { id: 'verification', label: 'Verifying visual evidence', sublabel: 'Decoupled vision model inspecting morphological signs', status: 'pending' },
  { id: 'guidance', label: 'Checking disease guidance', sublabel: 'Querying structured plant pathology knowledge base', status: 'pending' },
];

export const App: React.FC = () => {
  // Navigation & View States
  const [viewState, setViewState] = useState<'home' | 'analyzing' | 'result'>('home');
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState<boolean>(false);
  const [captureInitialMode, setCaptureInitialMode] = useState<'camera' | 'upload'>('camera');
  const [judgeMode, setJudgeMode] = useState<boolean>(false);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const [activeScenario, setActiveScenario] = useState<DemoScenarioId | 'live'>('live');

  // Active File & Analysis Data
  const [, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(INITIAL_STAGES);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [triageResult, setTriageResult] = useState<TriageResponse | null>(null);

  // Check backend health periodically
  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const health = await checkBackendHealth();
      if (isMounted) {
        setBackendOnline(health.status === 'ok');
      }
    };
    check();
    const interval = setInterval(check, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleOpenCapture = (mode: 'camera' | 'upload') => {
    setCaptureInitialMode(mode);
    setIsCaptureModalOpen(true);
  };

  const handleResetToHome = () => {
    setViewState('home');
    setTriageResult(null);
    setAnalysisError(null);
    setPipelineStages(INITIAL_STAGES.map(s => ({ ...s, status: 'pending' })));
    setCurrentStageIndex(0);
  };

  // Helper to animate stages sequentially during asynchronous processing
  const animatePipeline = async (isQualityFail: boolean = false): Promise<void> => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    for (let i = 0; i < INITIAL_STAGES.length; i++) {
      setCurrentStageIndex(i);

      // Set stage to processing
      setPipelineStages(prev => prev.map((stage, idx) => {
        if (idx === i) return { ...stage, status: 'processing' };
        if (idx < i) return { ...stage, status: 'completed' };
        return { ...stage, status: 'pending' };
      }));

      // Stage duration
      await delay(260);

      // If quality check failed, abort further stages honestly at Stage 01
      if (isQualityFail && i === 0) {
        setPipelineStages(prev => prev.map((stage, idx) => {
          if (idx === 0) return { ...stage, status: 'failed' };
          return { ...stage, status: 'pending' };
        }));
        await delay(200);
        return;
      }

      // Mark current stage completed
      setPipelineStages(prev => prev.map((stage, idx) => {
        if (idx === i) return { ...stage, status: 'completed' };
        return stage;
      }));
    }
  };

  // Executes analysis on a given File
  const handleAnalyzePhoto = async (file: File, imagePreview: string) => {
    setIsCaptureModalOpen(false);
    setCurrentFile(file);
    setPreviewUrl(imagePreview);
    setViewState('analyzing');
    setAnalysisError(null);
    setPipelineStages(INITIAL_STAGES.map(s => ({ ...s, status: 'pending' })));
    setCurrentStageIndex(0);

    try {
      if (activeScenario !== 'live') {
        // Run simulated demo scenario
        await runScenario(activeScenario, imagePreview);
        return;
      }

      // Live inference with backend
      // Kick off sequential visual animation while network request is in flight
      const animationPromise = animatePipeline(false);
      const apiPromise = triageImage(file);

      // Wait for both
      const [, result] = await Promise.all([animationPromise, apiPromise]);

      setTriageResult(result);
      setViewState('result');
    } catch (err: unknown) {
      console.error('Triage error:', err);
      if (err instanceof TriageApiError && err.isNetworkError && !backendOnline) {
        // Gracefully fallback to Scenario A with clear demo banner if backend is not started
        setAnalysisError('Local backend not responding. Loaded deterministic Scenario A for presentation.');
        await runScenario('scenario_a', imagePreview);
      } else {
        setAnalysisError(err instanceof Error ? err.message : 'Unknown triage error occurred');
        setPipelineStages(prev => prev.map((stage, idx) => {
          if (idx === currentStageIndex) return { ...stage, status: 'failed' };
          return stage;
        }));
      }
    }
  };

  // Triggered by demo scenario buttons
  const runScenario = async (scenarioId: DemoScenarioId, overridePreview?: string) => {
    setActiveScenario(scenarioId);
    const scenario = DEMO_SCENARIOS[scenarioId];
    if (!scenario) return;

    setPreviewUrl(overridePreview || scenario.previewImage);
    setViewState('analyzing');
    setAnalysisError(null);
    setPipelineStages(INITIAL_STAGES.map(s => ({ ...s, status: 'pending' })));
    setCurrentStageIndex(0);

    const isQualityFail = scenarioId === 'scenario_b';

    await animatePipeline(isQualityFail);
    const result = await fetchDemoScenario(scenarioId);

    setTriageResult(result);
    setViewState('result');
  };

  return (
    <div className="min-h-screen bg-cream-50 text-charcoal-900 flex flex-col font-sans selection:bg-leaf-100 selection:text-forest-900">
      
      {/* 1. Header Navigation */}
      <Navbar
        onOpenCapture={() => handleOpenCapture('camera')}
        judgeMode={judgeMode}
        onToggleJudgeMode={() => setJudgeMode(!judgeMode)}
        activeScenario={activeScenario}
        onSelectScenario={(scen) => {
          setActiveScenario(scen);
          if (scen !== 'live') {
            runScenario(scen);
          }
        }}
        backendOnline={backendOnline}
        onResetToHome={handleResetToHome}
      />

      {/* 2. Optional Hackathon Judge Mode Architecture Panel */}
      <JudgeModePanel
        isOpen={judgeMode}
        onClose={() => setJudgeMode(false)}
        latestResponse={triageResult}
      />

      {/* 3. Main Dynamic Content */}
      <main className="flex-1 pb-32 sm:pb-36 pb-safe">
        {viewState === 'home' && (
          <>
            <Hero
              onTakePhoto={() => handleOpenCapture('camera')}
              onUploadPhoto={() => handleOpenCapture('upload')}
            />
            <HowItWorksSection />
            <WhyCropSathiSection />
            <TechCredibilitySection />
          </>
        )}

        {viewState === 'analyzing' && (
          <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
            <AnalysisPipeline
              stages={pipelineStages}
              currentStageIndex={currentStageIndex}
              previewUrl={previewUrl || undefined}
              error={analysisError}
            />

            {analysisError && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleResetToHome}
                  className="px-6 py-2.5 rounded-xl bg-forest-900 text-white font-bold text-xs"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>
        )}

        {viewState === 'result' && triageResult && (
          <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
            <ResultView
              data={triageResult}
              previewUrl={previewUrl || undefined}
              onRetake={() => handleOpenCapture('camera')}
            />
          </div>
        )}
      </main>

      {/* 4. Camera & Upload Farmer Modal */}
      <CameraUploadModal
        isOpen={isCaptureModalOpen}
        initialMode={captureInitialMode}
        onClose={() => setIsCaptureModalOpen(false)}
        onAnalyze={handleAnalyzePhoto}
      />

      {/* 5. Floating Hackathon Demo Switcher */}
      <DemoScenarioBar
        activeScenario={activeScenario}
        onSelectScenario={(scen) => setActiveScenario(scen)}
        onTriggerScenario={(scen) => runScenario(scen)}
      />

      {/* 6. Footer & Responsible AI Disclaimer */}
      <Footer />

    </div>
  );
};

export default App;
