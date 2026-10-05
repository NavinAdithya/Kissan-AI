import { Camera, AlertOctagon, Sun, Focus, Move, Crosshair } from 'lucide-react';
import type { TriageResponse } from '../types/triage';

interface RetakeQualityCardProps {
  data: TriageResponse;
  previewUrl?: string;
  onRetake: () => void;
}

export const RetakeQualityCard: React.FC<RetakeQualityCardProps> = ({
  data,
  onRetake,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Quality Gate Failure Alert Banner */}
      <div className="bg-rose-50 rounded-3xl border-2 border-rose-300 p-6 sm:p-8 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200/80 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shrink-0">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900 border border-rose-300 font-mono">
                STAGE 01 QUALITY GATE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 font-outfit mt-0.5">
                Photo Quality Too Low
              </h2>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="inline-block px-3 py-1 rounded-xl bg-rose-200/80 border border-rose-300 text-rose-900 text-xs font-bold font-mono">
              STATUS: RETAKE REQUIRED
            </span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-rose-950 font-medium leading-relaxed">
          We couldn't reliably analyze this image. Running AI models on blurry, under-exposed, or poorly framed leaf images leads to false diagnoses.
        </p>

        {/* Quality Metrics Bar */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <div className="p-3 rounded-xl bg-white border border-rose-200 text-center">
            <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Sharpness</span>
            <span className="text-lg font-extrabold text-rose-700 font-outfit">{data.quality.sharpness}/100</span>
            <span className="text-[9px] text-rose-600 block">Below threshold (100)</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-rose-200 text-center">
            <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Brightness</span>
            <span className="text-lg font-extrabold text-rose-700 font-outfit">{data.quality.brightness}/100</span>
            <span className="text-[9px] text-rose-600 block">Low ambient light</span>
          </div>
          <div className="p-3 rounded-xl bg-white border border-rose-200 text-center">
            <span className="text-[10px] uppercase font-bold text-charcoal-500 block">Leaf Visibility</span>
            <span className="text-lg font-extrabold text-rose-700 font-outfit">{data.quality.leaf_visibility}/100</span>
            <span className="text-[9px] text-rose-600 block">Off-center</span>
          </div>
        </div>

      </div>

      {/* Detected Problems Card */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-sm p-6 sm:p-8 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-forest-950 font-outfit">
          Detected Quality Issues
        </h3>

        <div className="space-y-2">
          {data.quality.issues.map((issue, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs text-rose-900 font-medium"
            >
              <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0">
                ⚠
              </span>
              <span>{issue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How to take a better photo */}
      <div className="bg-white rounded-3xl border border-cream-300 shadow-premium p-6 sm:p-8 space-y-5">
        <div className="border-b border-cream-200 pb-3">
          <h3 className="text-base font-extrabold text-forest-950 font-outfit">
            How to Take a Better Photo
          </h3>
          <p className="text-xs text-charcoal-600">
            Follow these 4 simple steps to ensure 100% diagnostic reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 text-leaf-300 flex items-center justify-center shrink-0">
              <Move className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-forest-950 text-sm">1. Move Closer</h4>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Hold phone 15 to 25 cm away from the infected leaf tissue.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 text-leaf-300 flex items-center justify-center shrink-0">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-forest-950 text-sm">2. Keep Leaf Centered</h4>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Align the single symptomatic leaf inside the camera reticle corner guides.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 text-leaf-300 flex items-center justify-center shrink-0">
              <Sun className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-forest-950 text-sm">3. Use Natural Daylight</h4>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Photograph under bright indirect morning sunlight. Avoid harsh camera flashes.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 border border-cream-300 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-forest-900 text-leaf-300 flex items-center justify-center shrink-0">
              <Focus className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-forest-950 text-sm">4. Hold Steady</h4>
              <p className="text-xs text-charcoal-600 mt-0.5">
                Rest your hands or hold phone steady for 2 seconds before tapping capture.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Primary Retake CTA Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold text-base shadow-elevated transition-all"
        >
          <Camera className="w-5 h-5" />
          <span>RETAKE PHOTO NOW</span>
        </button>
      </div>

    </div>
  );
};
