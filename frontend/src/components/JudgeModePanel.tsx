import { 
  Camera, 
  Scan, 
  Cpu, 
  ShieldCheck, 
  Eye, 
  Scale, 
  BookOpen, 
  CheckCircle2, 
  X,
  Layers,
  Terminal
} from 'lucide-react';
import type { TriageResponse } from '../types/triage';

interface JudgeModePanelProps {
  isOpen: boolean;
  onClose: () => void;
  latestResponse?: TriageResponse | null;
}

export const JudgeModePanel: React.FC<JudgeModePanelProps> = ({
  isOpen,
  onClose,
  latestResponse
}) => {
  if (!isOpen) return null;

  const qualityPassed = latestResponse ? latestResponse.quality.passed : true;
  const confidenceScore = latestResponse ? latestResponse.model_confidence : 91;
  const isConfidenceGated = confidenceScore >= 75;
  const verificationSupported = latestResponse ? latestResponse.verification.supports_prediction : true;
  const status = latestResponse ? latestResponse.status : 'trusted';

  return (
    <div className="bg-forest-950 text-white border-y border-forest-800 p-6 sm:p-8 animate-fadeIn relative">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Panel Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-leaf-500 text-forest-950 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-extrabold tracking-widest px-2 py-0.5 rounded bg-leaf-400/20 text-leaf-300 border border-leaf-400/30">
                  HACKATHON EVALUATOR MODE
                </span>
                <span className="text-xs text-charcoal-400 font-mono">10-Second Architecture</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-outfit mt-0.5">
                CropSathi Technical Decision Pipeline
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-xs font-mono text-leaf-300 border border-forest-700 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Close Panel</span>
          </button>
        </div>

        {/* Pipeline Diagram: 8 Nodes */}
        {/* Pipeline Diagram: 8 Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-center text-xs items-stretch">
          
          {/* Node 1: PHOTO */}
          <div className="p-3.5 rounded-2xl bg-forest-900 border border-forest-800 flex flex-col justify-between items-center text-center h-full relative">
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-leaf-400 mx-auto flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-400 block font-bold">01. INPUT</span>
              <p className="font-extrabold text-white text-xs sm:text-sm">PHOTO</p>
            </div>
            <span className="text-[10px] text-charcoal-400 block">Mobile Shutter</span>
          </div>

          {/* Node 2: QUALITY CHECK */}
          <div className={`p-3.5 rounded-2xl border flex flex-col justify-between items-center text-center h-full relative ${
            qualityPassed ? 'bg-forest-900 border-forest-800' : 'bg-rose-950/60 border-rose-500'
          }`}>
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-leaf-400 mx-auto flex items-center justify-center">
              <Scan className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-400 block font-bold">02. FILTER</span>
              <p className="font-extrabold text-white text-xs sm:text-sm">QUALITY</p>
            </div>
            <span className={`text-[10px] font-mono font-bold ${qualityPassed ? 'text-leaf-300' : 'text-rose-400'}`}>
              {qualityPassed ? 'OpenCV (Pass)' : 'Blur Failed'}
            </span>
          </div>

          {/* Node 3: AI CLASSIFIER */}
          <div className="p-3.5 rounded-2xl bg-forest-900 border border-forest-800 flex flex-col justify-between items-center text-center h-full relative">
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-leaf-400 mx-auto flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-400 block font-bold">03. PREDICT</span>
              <p className="font-extrabold text-white text-xs sm:text-sm">CLASSIFIER</p>
            </div>
            <span className="text-[10px] text-leaf-300 font-mono font-bold">
              {latestResponse ? `${latestResponse.model_confidence}% Conf` : 'Feature Net'}
            </span>
          </div>

          {/* Node 4: CONFIDENCE GATE */}
          <div className={`p-3.5 rounded-2xl border flex flex-col justify-between items-center text-center h-full relative ${
            isConfidenceGated ? 'bg-forest-900 border-forest-800' : 'bg-amber-950/60 border-amber-500'
          }`}>
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-leaf-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-400 block font-bold">04. GATE</span>
              <p className="font-extrabold text-white text-xs sm:text-sm">CONFIDENCE</p>
            </div>
            <span className={`text-[10px] font-mono font-bold ${isConfidenceGated ? 'text-leaf-300' : 'text-amber-400'}`}>
              Threshold &gt; 75%
            </span>
          </div>

          {/* Node 5: INDEPENDENT VISION VERIFICATION */}
          <div className={`p-3.5 rounded-2xl border flex flex-col justify-between items-center text-center h-full relative ${
            verificationSupported ? 'bg-forest-900 border-forest-800' : 'bg-amber-950/60 border-amber-500'
          }`}>
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-leaf-400 mx-auto flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-400 block font-bold">05. VERIFY</span>
              <p className="font-extrabold text-white text-xs sm:text-sm">VISION</p>
            </div>
            <span className="text-[10px] text-leaf-300 font-mono font-bold">
              Groq Llama-3.2
            </span>
          </div>

          {/* Node 6: CONSENSUS ENGINE */}
          <div className="p-3.5 rounded-2xl bg-forest-900 border border-forest-800 flex flex-col justify-between items-center text-center h-full relative">
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-leaf-400 mx-auto flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-400 block font-bold">06. RESOLVE</span>
              <p className="font-extrabold text-white text-xs sm:text-sm">CONSENSUS</p>
            </div>
            <span className="text-[10px] text-leaf-300 font-mono font-bold">
              Deterministic
            </span>
          </div>

          {/* Node 7: KNOWLEDGE BASE */}
          <div className="p-3.5 rounded-2xl bg-forest-900 border border-forest-800 flex flex-col justify-between items-center text-center h-full relative">
            <div className="w-8 h-8 rounded-lg bg-forest-800 text-leaf-400 mx-auto flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-400 block font-bold">07. RETRIEVE</span>
              <p className="font-extrabold text-white text-xs sm:text-sm">KNOWLEDGE</p>
            </div>
            <span className="text-[10px] text-leaf-300 font-mono font-bold">
              Agronomic DB
            </span>
          </div>

          {/* Node 8: GUIDANCE */}
          <div className={`p-3.5 rounded-2xl border flex flex-col justify-between items-center text-center h-full relative ${
            status === 'trusted' 
              ? 'bg-emerald-950 border-emerald-500' 
              : status === 'uncertain'
              ? 'bg-amber-950 border-amber-500'
              : 'bg-rose-950 border-rose-500'
          }`}>
            <div className="w-8 h-8 rounded-lg bg-white/10 text-white mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="my-1.5">
              <span className="text-[10px] font-mono text-leaf-300 block font-bold">08. OUTPUT</span>
              <p className="font-extrabold text-white uppercase text-xs sm:text-sm">{status}</p>
            </div>
            <span className="text-[10px] text-leaf-300 font-mono font-bold">
              Action Plan
            </span>
          </div>

        </div>

        {/* Technical Pipeline Annotation */}
        <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-800 text-xs text-leaf-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-leaf-400" />
            <span>Architecture Rule: Output is NEVER emitted based on a single statistical classification.</span>
          </div>
          <span className="text-charcoal-400 text-[11px]">Fail-Safe by Design</span>
        </div>

      </div>
    </div>
  );
};
