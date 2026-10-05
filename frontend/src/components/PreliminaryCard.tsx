import { RefreshCw, Cpu, EyeOff } from 'lucide-react';
import type { TriageResponse } from '../types/triage';

interface PreliminaryCardProps {
  data: TriageResponse;
  previewUrl?: string;
  onRetake: () => void;
}

export const PreliminaryCard: React.FC<PreliminaryCardProps> = ({
  data,
  onRetake,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Notice Banner */}
      <div className="bg-amber-50/80 rounded-3xl border border-amber-300 p-6 sm:p-8 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-mono">
                DEGRADED DUAL-VERIFICATION
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-outfit mt-0.5">
                Preliminary Prediction Available
              </h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded-xl bg-amber-200/80 border border-amber-300 text-amber-900 text-xs font-bold">
            Verification Unavailable
          </span>
        </div>

        <p className="text-sm text-amber-900 leading-relaxed font-medium">
          Independent visual verification is temporarily unavailable. A preliminary classifier prediction is provided below, but dual-model consensus could not be verified.
        </p>

      </div>

      {/* Comparison Grid distinguishing Prediction from Verification */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-premium p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* AVAILABLE: PREDICTION */}
          <div className="p-5 rounded-2xl bg-cream-50 border border-cream-300 space-y-3">
            <div className="flex items-center justify-between border-b border-cream-200 pb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-forest-800" />
                <span className="text-xs font-bold uppercase tracking-wider text-forest-950">
                  Primary Classifier
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                Online
              </span>
            </div>

            <h4 className="text-xl font-extrabold text-forest-950">
              {data.predicted_disease}
            </h4>

            <div className="p-3 rounded-xl bg-white border border-cream-200 flex items-center justify-between">
              <span className="text-xs text-charcoal-600 font-medium">Model Confidence</span>
              <span className="text-xl font-extrabold text-forest-900">{data.model_confidence}%</span>
            </div>
          </div>

          {/* UNAVAILABLE: VISION VERIFIER */}
          <div className="p-5 rounded-2xl bg-cream-100/50 border border-dashed border-cream-300 space-y-3 opacity-80">
            <div className="flex items-center justify-between border-b border-cream-200 pb-2">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-charcoal-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                  Visual Verification
                </span>
              </div>
              <span className="text-[11px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                Offline / Unreachable
              </span>
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed pt-2">
              Independent vision verification engine could not be contacted. Dual consensus could not be confirmed.
            </p>

            <div className="p-3 rounded-xl bg-cream-50 border border-cream-200 text-xs text-charcoal-500">
              Diagnostic Trust downgraded to <strong>MEDIUM</strong> due to single-model reliance.
            </div>
          </div>

        </div>

        {/* Guidance section */}
        <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-forest-950">
            Preliminary Advice & Next Steps
          </h4>
          <ul className="space-y-2 text-xs text-charcoal-700">
            {data.recommendations.what_to_do.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded bg-forest-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Retake Action */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onRetake}
          className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md transition-all"
        >
          <RefreshCw className="w-4 h-4 text-leaf-400" />
          <span>TAKE ANOTHER PHOTO</span>
        </button>
      </div>

    </div>
  );
};
