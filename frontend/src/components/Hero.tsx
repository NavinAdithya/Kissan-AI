import { Camera, Upload, ShieldCheck, Check } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  onTakePhoto: () => void;
  onUploadPhoto: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTakePhoto, onUploadPhoto }) => {
  return (
    <section className="relative pt-6 pb-16 sm:pt-10 sm:pb-24 overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-leaf-100/40 via-cream-100/20 to-transparent pointer-events-none -z-10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left copy, Right Visual Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/5 border border-forest-900/10 text-forest-900 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
              <ShieldCheck className="w-4 h-4 text-leaf-600" />
              <span>See. Verify. Protect.</span>
              <span className="text-charcoal-400">·</span>
              <span className="text-charcoal-600">Zero Blind Predictions</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.15] sm:leading-[1.1]">
                AI-powered crop disease triage from a single phone photo.
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-charcoal-700 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                CropSathi doesn't blindly trust one prediction. It checks photo quality, evaluates model confidence, and independently verifies visual evidence before providing agricultural guidance.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              
              <button
                onClick={onTakePhoto}
                className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-2xl bg-forest-900 hover:bg-forest-800 active:scale-98 text-white font-bold text-sm sm:text-base shadow-elevated hover:shadow-2xl transition-all border border-forest-950 group"
              >
                <Camera className="w-5 h-5 text-leaf-400 group-hover:rotate-12 transition-transform" />
                <span>TAKE PHOTO</span>
              </button>

              <button
                onClick={onUploadPhoto}
                className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-cream-100 active:scale-98 text-charcoal-900 font-bold text-sm sm:text-base shadow-subtle hover:shadow-md transition-all border border-cream-300"
              >
                <Upload className="w-5 h-5 text-forest-800" />
                <span>UPLOAD IMAGE</span>
              </button>

            </div>

            {/* Compact Visual Representation: SEE -> CHECK -> PREDICT -> VERIFY -> DECIDE */}
            <div className="pt-4 border-t border-cream-200">
              <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3 text-center lg:text-left">
                The CropSathi Verification Flow
              </p>
              
              <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center items-stretch">
                
                <div className="p-1 sm:p-2.5 rounded-xl bg-white border border-cream-300 shadow-sm flex flex-col justify-between h-full min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-400 block">01</span>
                  <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-forest-900 my-0.5">SEE</span>
                  <span className="text-[9px] sm:text-[10px] text-charcoal-500 block truncate">Photo</span>
                </div>

                <div className="p-1 sm:p-2.5 rounded-xl bg-white border border-cream-300 shadow-sm flex flex-col justify-between h-full min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-400 block">02</span>
                  <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-forest-900 my-0.5">CHECK</span>
                  <span className="text-[9px] sm:text-[10px] text-charcoal-500 block truncate">Quality</span>
                </div>

                <div className="p-1 sm:p-2.5 rounded-xl bg-white border border-cream-300 shadow-sm flex flex-col justify-between h-full min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-charcoal-400 block">03</span>
                  <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-forest-900 my-0.5">PREDICT</span>
                  <span className="text-[9px] sm:text-[10px] text-charcoal-500 block truncate">Classifier</span>
                </div>

                <div className="p-1 sm:p-2.5 rounded-xl bg-leaf-50/80 border border-leaf-400/50 shadow-sm ring-1 ring-leaf-500/20 flex flex-col justify-between h-full min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-leaf-600 block">04</span>
                  <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-forest-950 my-0.5">VERIFY</span>
                  <span className="text-[9px] sm:text-[10px] text-leaf-700 font-semibold block truncate">Vision</span>
                </div>

                <div className="p-1 sm:p-2.5 rounded-xl bg-forest-900 text-white shadow-sm border border-forest-950 flex flex-col justify-between h-full min-w-0">
                  <span className="text-[9px] sm:text-[10px] font-bold text-leaf-300 block">05</span>
                  <span className="text-[11px] sm:text-xs md:text-sm font-extrabold text-white my-0.5">DECIDE</span>
                  <span className="text-[9px] sm:text-[10px] text-leaf-300 block truncate">Consensus</span>
                </div>

              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-leaf-600" />
                <span>OpenCV Quality Gate</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-leaf-600" />
                <span>Confidence Gate (75%)</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-leaf-600" />
                <span>Dual-Model Visual Consensus</span>
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Leaf Reticle */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>

        </div>

      </div>

    </section>
  );
};
