import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 text-white border-t border-forest-900 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Responsible AI Disclaimer Card */}
        <div className="p-5 rounded-2xl bg-forest-900/70 border border-forest-800 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-leaf-100">
          <div className="w-9 h-9 rounded-xl bg-forest-800 text-leaf-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-white text-xs uppercase tracking-wider font-mono">
              Responsible AI Agricultural Protocol:
            </span>
            <p className="leading-relaxed text-leaf-200/90 text-xs">
              CropSathi provides AI-assisted disease triage, not a definitive agricultural diagnosis. When evidence is insufficient or contradictory, the system actively recommends retaking the photo or seeking confirmation from a certified agricultural extension officer.
            </p>
          </div>
        </div>

        {/* Brand and Links row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-forest-900/90 pt-8">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 flex items-center justify-center border border-forest-700">
              <span className="text-leaf-400 font-bold text-lg">🌱</span>
            </div>
            <div>
              <span className="text-lg font-bold text-white font-outfit">
                Crop<span className="text-leaf-400">Sathi</span>
              </span>
              <p className="text-[11px] text-charcoal-400 uppercase tracking-widest font-mono">
                See. Verify. Protect.
              </p>
            </div>
          </div>

          <div className="text-center md:text-right text-xs text-charcoal-400 space-y-1">
            <p>Built for the Sathyabama Hackathon 2026</p>
            <p className="text-[11px] text-charcoal-500">
              Empowering farmers with accountable, multi-stage dual-verification AI.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};
