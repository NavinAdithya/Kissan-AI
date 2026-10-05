import { XCircle, CheckCircle2 } from 'lucide-react';

export const WhyCropSathiSection: React.FC = () => {
  return (
    <section id="why-cropsathi" className="py-16 sm:py-24 bg-white border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-forest-900 bg-cream-200 px-3 py-1 rounded-full border border-cream-300">
            Architectural Differentiation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-outfit">
            Why CropSathi? Don't Blindly Trust One Prediction.
          </h2>
          <p className="text-base text-charcoal-700 leading-relaxed">
            In crop pathology, false confidence is disastrous. Spraying fungicide for Early Blight when the actual pathogen is Late Blight wastes thousands of rupees and can cause complete harvest collapse.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* TRADITIONAL AI APPS */}
          <div className="bg-rose-50/40 rounded-3xl border border-rose-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                  Ordinary AI Apps
                </span>
                <XCircle className="w-5 h-5 text-rose-500" />
              </div>

              <h3 className="text-2xl font-extrabold text-rose-950 font-outfit">
                Single-Model Black Box
              </h3>

              <div className="p-4 rounded-2xl bg-white border border-rose-200 text-xs text-charcoal-700 font-mono space-y-2">
                <div className="font-bold text-rose-900 uppercase">Linear Pipeline:</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-rose-100 px-2 py-1 rounded">PHOTO</span>
                  <span>→</span>
                  <span className="bg-rose-100 px-2 py-1 rounded">GENERIC CNN</span>
                  <span>→</span>
                  <span className="bg-rose-200 px-2 py-1 rounded font-bold">BLIND ANSWER</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-charcoal-700">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Accepts blurry, out-of-focus, or dark images and fabricates 99% confident hallucinations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Cannot express uncertainty: always outputs a disease label even when foliage is ambiguous.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Zero independent visual sanity check on physical lesion symptoms.</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-100/70 text-rose-900 text-xs font-medium border border-rose-200">
              High risk of misdiagnosis leading to expensive chemical over-spraying.
            </div>
          </div>

          {/* CROPSATHI DUAL-VERIFICATION CONSENSUS */}
          <div className="bg-forest-950 text-white rounded-3xl border border-forest-900 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-premium">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-leaf-300 bg-leaf-500/20 px-3 py-1 rounded-full border border-leaf-400/30">
                  CropSathi Standard
                </span>
                <CheckCircle2 className="w-5 h-5 text-leaf-400" />
              </div>

              <h3 className="text-2xl font-extrabold text-white font-outfit">
                Multi-Stage Dual Verification
              </h3>

              <div className="p-4 rounded-2xl bg-forest-900 border border-forest-800 text-xs font-mono space-y-2">
                <div className="font-bold text-leaf-300 uppercase">Verification Pipeline:</div>
                <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                  <span className="bg-forest-800 px-2 py-0.5 rounded text-white">PHOTO</span>
                  <span className="text-leaf-400">→</span>
                  <span className="bg-forest-800 px-2 py-0.5 rounded text-leaf-300">OPENCV QUALITY</span>
                  <span className="text-leaf-400">→</span>
                  <span className="bg-forest-800 px-2 py-0.5 rounded text-white">CLASSIFIER</span>
                  <span className="text-leaf-400">→</span>
                  <span className="bg-forest-800 px-2 py-0.5 rounded text-leaf-300">75% GATE</span>
                  <span className="text-leaf-400">→</span>
                  <span className="bg-forest-800 px-2 py-0.5 rounded text-white">VISION VERIFIER</span>
                  <span className="text-leaf-400">→</span>
                  <span className="bg-leaf-500 text-forest-950 px-2 py-0.5 rounded font-bold">CONSENSUS</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-leaf-100">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leaf-400 shrink-0 mt-0.5" />
                  <span>Rejects unreadable, blurry, or occluded leaf photos at Stage 01 before model inference.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leaf-400 shrink-0 mt-0.5" />
                  <span>Cross-examines statistical predictions against independent morphological vision inspections.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-leaf-400 shrink-0 mt-0.5" />
                  <span>Treats uncertainty as an agronomic safety asset, advising safe retakes instead of dangerous guesses.</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-forest-900 text-leaf-300 text-xs font-medium border border-forest-800">
              Startup-grade trust designed specifically for high-stakes farm decisions.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
