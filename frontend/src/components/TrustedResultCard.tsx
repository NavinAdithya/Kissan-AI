import { useState } from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  HelpCircle,
  FileCheck,
  Check
} from 'lucide-react';
import type { TriageResponse } from '../types/triage';

interface TrustedResultCardProps {
  data: TriageResponse;
  previewUrl?: string;
  onRetake: () => void;
}

export const TrustedResultCard: React.FC<TrustedResultCardProps> = ({
  data,
  onRetake,
}) => {
  const [isWhyOpen, setIsWhyOpen] = useState<boolean>(false);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* ========================================================================= */}
      {/* 1. VISUAL CENTERPIECE: MODEL VS INDEPENDENT VERIFICATION COMPARISON */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-premium p-6 sm:p-8 space-y-6">
        
        {/* Top Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-500 font-bold block">
                Consensus Engine Verification
              </span>
              <span className="text-xs font-bold text-emerald-800">
                Dual Verification Complete · Zero Conflict
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Diagnostic Trust: HIGH</span>
            </span>
          </div>
        </div>

        {/* COMPARISON GRID: AI Prediction (Left) + Independent Vision Verification (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          
          {/* LEFT COLUMN: PRIMARY AI CLASSIFIER */}
          <div className="p-5 sm:p-6 rounded-2xl bg-cream-50/70 border border-cream-300 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-cream-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-forest-900 text-leaf-300 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-950 font-outfit">
                    AI Prediction
                  </span>
                </div>
                <span className="text-[11px] font-mono text-charcoal-500 bg-white px-2 py-0.5 rounded border border-cream-300">
                  Primary Model
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wide">
                  Identified Pathogen
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-forest-950">
                  {data.predicted_disease}
                </h3>
              </div>

              {/* Model Confidence Metric Card */}
              <div className="p-3.5 rounded-xl bg-white border border-cream-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-charcoal-600 font-medium">Model Confidence</p>
                  <p className="text-2xl font-extrabold text-forest-900 font-outfit">
                    {data.model_confidence}%
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-leaf-100 text-leaf-800 border border-leaf-300">
                    Gated &gt; 75%
                  </span>
                  <p className="text-[11px] text-charcoal-500 mt-1 font-mono">Statistical Weight</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-charcoal-500 italic pt-2 border-t border-cream-200/60">
              *Evaluated via high-dimensional foliar lesion classifier.
            </p>
          </div>

          {/* RIGHT COLUMN: INDEPENDENT VISUAL VERIFIER */}
          <div className="p-5 sm:p-6 rounded-2xl bg-leaf-50/40 border border-leaf-300/80 flex flex-col justify-between h-full space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-leaf-200/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-leaf-600 text-white flex items-center justify-center">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-950 font-outfit">
                    Independent Visual Verification
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                  Vision Engine
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wide">
                  Verification Result
                </span>
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg sm:text-xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Visual evidence supports prediction</span>
                </div>
              </div>

              {/* Support Level Metric Card */}
              <div className="p-3.5 rounded-xl bg-white border border-leaf-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs text-charcoal-600 font-medium">Support Level</p>
                  <p className="text-2xl font-extrabold text-emerald-800 font-outfit">
                    {data.verification.support_level}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {data.verification.verification_confidence}% Agreement
                  </span>
                  <p className="text-[11px] text-charcoal-500 mt-1 font-mono">Morphological Match</p>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-charcoal-600 leading-relaxed pt-2 border-t border-leaf-200/60">
              {data.verification.reasoning}
            </p>
          </div>

        </div>

        {/* SYMPTOM EVIDENCE MATCH SECTION */}
        <div className="p-5 rounded-2xl bg-cream-100/60 border border-cream-300 space-y-3">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-forest-800" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest-950 font-outfit">
              Observed Symptom Match
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.verification.observed_symptoms.map((symptom, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-cream-200 shadow-xs text-xs text-charcoal-800 font-medium"
              >
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <span>{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CONVERGENCE BANNER: TRUSTED RESULT */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-forest-950 via-forest-900 to-forest-800 text-white shadow-elevated border border-forest-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-leaf-400 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-leaf-300 font-mono">
                CONVERGED CONSENSUS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit flex items-center gap-2">
              <CheckCircle2 className="w-7 h-7 text-leaf-400 shrink-0" />
              <span>TRUSTED RESULT</span>
            </h2>
            <p className="text-xs text-leaf-100/90 max-w-lg">
              Both models converged with zero visual contradictions. Safe for actionable agronomic intervention.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold">
              Model Confidence: {data.model_confidence}%
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-leaf-500 text-forest-950 font-extrabold text-xs">
              Trust Level: HIGH
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. EXPANDABLE "WHY DID CROPSATHI TRUST THIS RESULT?" ACCORDION */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-sm overflow-hidden">
        
        <button
          onClick={() => setIsWhyOpen(!isWhyOpen)}
          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-cream-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-forest-900/10 text-forest-900 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4 text-leaf-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-forest-950">
                Why did CropSathi trust this result?
              </h3>
              <p className="text-xs text-charcoal-500">
                Inspect the 6 verification criteria behind the consensus engine.
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center text-charcoal-700">
            {isWhyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isWhyOpen && (
          <div className="p-6 pt-0 border-t border-cream-200 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs text-charcoal-700">
              {data.trust_explanation.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-cream-50 border border-cream-200 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-leaf-100 text-leaf-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. ACTIONABLE GUIDANCE: WHAT TO DO & PREVENTION CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* WHAT TO DO CARD */}
        <div className="bg-white rounded-3xl border border-cream-300 shadow-sm p-6 space-y-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2.5 border-b border-cream-200 pb-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold">🌱</span>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-forest-950 font-outfit">
                  What to do immediately
                </h3>
                <p className="text-[11px] text-charcoal-500">Curative Agronomic Interventions</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-charcoal-700 pt-3">
              {data.recommendations.what_to_do.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-forest-900 text-leaf-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PREVENTION CARD */}
        <div className="bg-white rounded-3xl border border-cream-300 shadow-sm p-6 space-y-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2.5 border-b border-cream-200 pb-3">
              <div className="w-7 h-7 rounded-lg bg-forest-900 text-leaf-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-forest-950 font-outfit">
                  Long-Term Prevention
                </h3>
                <p className="text-[11px] text-charcoal-500">Field Biosecurity & Crop Rotation</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-charcoal-700 pt-3">
              {data.recommendations.prevention.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-md bg-cream-200 text-charcoal-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. FOOTER ACTIONS */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <RefreshCw className="w-4 h-4 text-leaf-400" />
          <span>TAKE ANOTHER PHOTO</span>
        </button>
      </div>

    </div>
  );
};
