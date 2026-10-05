import { useState } from 'react';
import { 
  AlertTriangle, 
  Cpu, 
  Eye, 
  ShieldAlert, 
  Info, 
  Camera
} from 'lucide-react';
import type { TriageResponse } from '../types/triage';

interface UncertainResultCardProps {
  data: TriageResponse;
  previewUrl?: string;
  onRetake: () => void;
}

export const UncertainResultCard: React.FC<UncertainResultCardProps> = ({
  data,
  onRetake,
}) => {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState<boolean>(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* ========================================================================= */}
      {/* 1. SAFETY REASSURANCE BANNER - UNCERTAINTY IS A SAFETY FEATURE */}
      {/* ========================================================================= */}
      <div className="bg-amber-50 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300 font-mono">
                  AGRONOMIC SAFETY GATE
                </span>
                <span className="text-xs font-bold text-amber-800">
                  Trust Status: UNCERTAIN
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-outfit mt-0.5">
                AI Result Uncertain
              </h2>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 rounded-xl bg-amber-200/70 border border-amber-300 text-amber-900 text-xs font-bold">
              Verification Conflict Flagged
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-amber-900 font-medium leading-relaxed max-w-3xl">
          The available evidence is not sufficient for a reliable disease assessment. CropSathi detected conflicting foliar indicators between statistical prediction and visual evidence.
        </p>

        <div className="p-3.5 rounded-xl bg-white/80 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Safety Protocol:</strong> Spraying the wrong fungicide can destroy plant immunity. Inconclusive scans trigger an automatic protection hold.
          </span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. THE CONTRADICTION: MODEL PREDICTION VS INDEPENDENT VISUAL VERIFICATION */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-premium p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-cream-200 pb-3">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-forest-950 font-outfit">
            Dual Evidence Conflict Analysis
          </h3>
          <span className="text-xs font-mono text-charcoal-500">
            Automated Cross-Examination
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* LEFT: STATISTICAL CLASSIFIER */}
          <div className="p-5 rounded-2xl bg-cream-50 border border-cream-300 flex flex-col justify-between h-full space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-cream-200 pb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-forest-800" />
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-900">
                    Model Prediction
                  </span>
                </div>
                <span className="text-xs font-bold text-forest-950 bg-white px-2 py-0.5 rounded border border-cream-300">
                  Confidence: {data.model_confidence}%
                </span>
              </div>

              <h4 className="text-xl font-extrabold text-forest-950">
                {data.predicted_disease}
              </h4>
            </div>

            <p className="text-xs text-charcoal-600 pt-2 border-t border-cream-200/60">
              Primary deep neural network identified pixel signatures favoring {data.predicted_disease}.
            </p>
          </div>

          {/* RIGHT: INDEPENDENT VISION VERIFICATION (DISCORDANT) */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-300 flex flex-col justify-between h-full space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-950">
                    Visual Verification
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  Conflict Detected
                </span>
              </div>

              <h4 className="text-xl font-extrabold text-amber-950">
                {data.verification.alternative_disease || 'Discrepant Pathology'}
              </h4>
            </div>

            <p className="text-xs text-amber-900/90 leading-relaxed pt-2 border-t border-amber-200/60">
              {data.verification.reasoning}
            </p>
          </div>

        </div>

        {/* WHY THE CONFLICT OCCURRED */}
        <div className="p-5 rounded-2xl bg-cream-100/70 border border-cream-300 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
              Why did CropSathi flag this as uncertain?
            </h4>
          </div>

          <p className="text-xs text-charcoal-700 font-medium leading-relaxed">
            The observed visual features conflict with the classifier's prediction. The consensus engine requires both models to corroborate morphological lesions before approving a diagnosis.
          </p>

          {/* Specific contradictions listed */}
          <div className="space-y-2 pt-1">
            {data.verification.contradictions.map((contra, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5 shadow-xs"
              >
                <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  ⚠
                </span>
                <span className="leading-relaxed">{contra}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. RETAKE GUIDANCE & HOW TO PROCEED */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-forest-950 flex items-center gap-2">
          <Camera className="w-5 h-5 text-leaf-600" />
          <span>Recommended Next Steps to Resolve Uncertainty</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-700">
          {data.retake.instructions.map((inst, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-forest-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{inst}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. PRIMARY CALLS TO ACTION */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        
        <button
          onClick={onRetake}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-bold text-base shadow-md hover:shadow-lg transition-all"
        >
          <Camera className="w-5 h-5" />
          <span>RETAKE PHOTO</span>
        </button>

        <button
          onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-cream-100 text-charcoal-800 font-bold text-sm border border-cream-300 transition-all"
        >
          <Info className="w-4 h-4 text-forest-800" />
          <span>{showDetailedAnalysis ? 'HIDE TECHNICAL BREAKDOWN' : 'VIEW DETAILED ANALYSIS'}</span>
        </button>

      </div>

      {/* Expandable Detailed Technical Breakdown for Judges */}
      {showDetailedAnalysis && (
        <div className="p-6 rounded-2xl bg-cream-100/80 border border-cream-300 text-xs space-y-3 animate-fadeIn">
          <h4 className="font-bold text-forest-950 uppercase tracking-wider">
            Consensus Engine Trace Log
          </h4>
          <pre className="p-4 rounded-xl bg-charcoal-900 text-leaf-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
{JSON.stringify({
  triage_status: data.status,
  classifier: {
    disease: data.predicted_disease,
    confidence: `${data.model_confidence}%`
  },
  verifier: {
    alternative_hypothesis: data.verification.alternative_disease,
    support_level: data.verification.support_level,
    contradictions: data.verification.contradictions
  },
  action: 'AGRONOMIC_SAFETY_HOLD_TRIGGERED'
}, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
};
