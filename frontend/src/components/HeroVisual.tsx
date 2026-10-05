import { CheckCircle2, ShieldCheck, Scan } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-leaf-500/10 via-forest-900/5 to-transparent rounded-3xl blur-2xl -z-10" />

      {/* Main Leaf Card Container */}
      <div className="relative bg-white rounded-3xl border border-cream-300 p-4 sm:p-6 shadow-premium overflow-hidden">
        
        {/* Card Header info */}
        <div className="flex items-center justify-between mb-4 border-b border-cream-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-leaf-500 animate-pulse" />
            <span className="text-xs font-bold text-forest-900 uppercase tracking-wider font-mono">
              LIVE MULTI-STAGE TRIAGE
            </span>
          </div>
          <span className="text-xs font-semibold text-charcoal-500 bg-cream-100 px-2.5 py-0.5 rounded-full border border-cream-300">
            6-Stage Pipeline
          </span>
        </div>

        {/* Leaf Inspection Viewport with Framing Reticle */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-charcoal-900 border border-forest-900/20 group">
          
          {/* Leaf Sample Graphic with high-res plant pathology foliage */}
          <img
            src="https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=800&q=80"
            alt="Symptomatic tomato leaf being analyzed"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Semi-transparent scanning grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-forest-950/20 via-transparent to-forest-950/40 pointer-events-none" />

          {/* Camera Leaf Viewfinder Reticle */}
          <div className="absolute inset-6 border border-white/40 rounded-xl pointer-events-none">
            {/* Corner Markers */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-leaf-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-leaf-400" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-leaf-400" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-leaf-400" />
          </div>

          {/* Laser scanning beam line */}
          <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-leaf-400 to-transparent animate-scan shadow-[0_0_12px_#4ade80]" />

          {/* Dynamic Detection Bounding Box on Concentric Lesion */}
          <div className="absolute top-[38%] left-[42%] w-24 h-24 border-2 border-dashed border-amber-400/90 rounded-lg bg-amber-400/10 pointer-events-none animate-pulse-subtle">
            <div className="absolute -top-5 left-0 bg-charcoal-900/90 text-amber-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-amber-500/40 whitespace-nowrap">
              Lesion #1: 91% match
            </div>
          </div>

          {/* Bottom Viewport Status Tag */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 bg-charcoal-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-mono">
            <span className="flex items-center gap-1.5">
              <Scan className="w-3.5 h-3.5 text-leaf-400" />
              <span>Target: Solanum lycopersicum</span>
            </span>
            <span className="text-leaf-300 font-bold">Passed Quality Check</span>
          </div>

        </div>

        {/* Floating Verified Pipeline Status Cards around/under preview */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 text-xs items-stretch">
          
          {/* Status 1: Image Quality */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-cream-50 border border-cream-300 flex items-center gap-2.5 shadow-sm h-full">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-charcoal-900 truncate">Image Quality</p>
              <p className="text-[11px] text-charcoal-600 truncate">Sharpness: 94 · Good</p>
            </div>
          </div>

          {/* Status 2: AI Prediction */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-cream-50 border border-cream-300 flex items-center gap-2.5 shadow-sm h-full">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-charcoal-900 truncate">AI Prediction</p>
              <p className="text-[11px] text-charcoal-600 truncate">Early Blight</p>
            </div>
          </div>

          {/* Status 3: Confidence Gate */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-cream-50 border border-cream-300 flex items-center gap-2.5 shadow-sm h-full">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-charcoal-900 truncate">Confidence Gate</p>
              <p className="text-[11px] text-emerald-700 font-semibold truncate">91% (&gt; 75%)</p>
            </div>
          </div>

          {/* Status 4: Visual Verification */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-cream-50 border border-cream-300 flex items-center gap-2.5 shadow-sm h-full">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-charcoal-900 truncate">Visual Verification</p>
              <p className="text-[11px] text-emerald-700 font-semibold truncate">Supported (High)</p>
            </div>
          </div>

        </div>

        {/* Convergence Bar: Evidence Match */}
        <div className="mt-3 p-3 rounded-xl bg-forest-900 text-white flex items-center justify-between shadow-sm border border-forest-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-leaf-400 shrink-0" />
            <div>
              <span className="font-bold text-xs">Deterministic Consensus: </span>
              <span className="text-leaf-300 text-xs font-semibold">Evidence Matches Prediction</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-leaf-500/20 text-leaf-300 border border-leaf-400/30 text-[10px] font-bold uppercase tracking-wider">
            TRUSTED
          </span>
        </div>

      </div>

    </div>
  );
};
