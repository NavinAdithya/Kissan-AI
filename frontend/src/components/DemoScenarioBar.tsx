import { useState } from 'react';
import type { DemoScenarioId } from '../types/triage';
import { Sparkles, Layers, ShieldCheck, AlertTriangle, AlertOctagon, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

interface DemoScenarioBarProps {
  activeScenario: DemoScenarioId | 'live';
  onSelectScenario: (id: DemoScenarioId | 'live') => void;
  onTriggerScenario: (id: DemoScenarioId) => void;
}

export const DemoScenarioBar: React.FC<DemoScenarioBarProps> = ({
  activeScenario,
  onSelectScenario,
  onTriggerScenario,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (isMinimized) {
    return (
      <aside aria-label="Demo Scenarios Bar" className="fixed bottom-4 right-4 z-40 mb-safe">
        <button
          onClick={() => setIsMinimized(false)}
          className="min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-forest-950/95 backdrop-blur-md text-leaf-300 border border-forest-800 shadow-2xl text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all"
          title="Expand Demo Switcher"
        >
          <Sparkles className="w-3.5 h-3.5 text-leaf-400" />
          <span>Demo Scenarios</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Demo Scenarios Bar" className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-4 z-40 max-w-xl bg-forest-950/95 backdrop-blur-md text-white p-3 sm:p-3.5 rounded-2xl border border-forest-800 shadow-2xl flex flex-col gap-2 mb-safe">
      <div className="flex items-center justify-between text-[11px] font-mono text-leaf-300 pb-1 border-b border-forest-800">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-leaf-400" />
          <span>Hackathon Demo Switcher</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-charcoal-400 hidden xs:inline">Quick branch test:</span>
          <button
            onClick={() => setIsMinimized(true)}
            className="w-7 h-7 flex items-center justify-center text-charcoal-400 hover:text-white rounded-lg transition-colors"
            title="Minimize"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: 5 columns on desktop/tablet, clean touch layout */}
      <div className="grid grid-cols-5 gap-1 sm:gap-1.5 text-center text-[11px] font-semibold">
        
        {/* Scenario A: Trusted */}
        <button
          onClick={() => {
            onSelectScenario('scenario_a');
            onTriggerScenario('scenario_a');
          }}
          className={`min-h-[44px] px-1.5 sm:px-2 py-1.5 rounded-xl border transition-all truncate flex flex-col items-center justify-center gap-0.5 sm:gap-1 active:scale-95 ${
            activeScenario === 'scenario_a'
              ? 'bg-emerald-600 text-white border-emerald-400 font-bold shadow-md'
              : 'bg-forest-900 hover:bg-forest-800 text-emerald-300 border-forest-700'
          }`}
          title="Scenario A: Quality PASS -> High Confidence -> Visual Match -> TRUSTED"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[9px] sm:text-[10px] leading-tight truncate">A: Trusted</span>
        </button>

        {/* Scenario B: Blur / Retake */}
        <button
          onClick={() => {
            onSelectScenario('scenario_b');
            onTriggerScenario('scenario_b');
          }}
          className={`min-h-[44px] px-1.5 sm:px-2 py-1.5 rounded-xl border transition-all truncate flex flex-col items-center justify-center gap-0.5 sm:gap-1 active:scale-95 ${
            activeScenario === 'scenario_b'
              ? 'bg-rose-600 text-white border-rose-400 font-bold shadow-md'
              : 'bg-forest-900 hover:bg-forest-800 text-rose-300 border-forest-700'
          }`}
          title="Scenario B: Excessive Blur -> Quality Gate Fails -> RETAKE PHOTO"
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="text-[9px] sm:text-[10px] leading-tight truncate">B: Retake</span>
        </button>

        {/* Scenario C: Contradiction / Uncertain */}
        <button
          onClick={() => {
            onSelectScenario('scenario_c');
            onTriggerScenario('scenario_c');
          }}
          className={`min-h-[44px] px-1.5 sm:px-2 py-1.5 rounded-xl border transition-all truncate flex flex-col items-center justify-center gap-0.5 sm:gap-1 active:scale-95 ${
            activeScenario === 'scenario_c'
              ? 'bg-amber-600 text-white border-amber-400 font-bold shadow-md'
              : 'bg-forest-900 hover:bg-forest-800 text-amber-300 border-forest-700'
          }`}
          title="Scenario C: Classifier says Early Blight, Vision detects Late Blight -> UNCERTAIN"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[9px] sm:text-[10px] leading-tight truncate">C: Conflict</span>
        </button>

        {/* Scenario D: Low Confidence */}
        <button
          onClick={() => {
            onSelectScenario('scenario_d');
            onTriggerScenario('scenario_d');
          }}
          className={`min-h-[44px] px-1.5 sm:px-2 py-1.5 rounded-xl border transition-all truncate flex flex-col items-center justify-center gap-0.5 sm:gap-1 active:scale-95 ${
            activeScenario === 'scenario_d'
              ? 'bg-amber-700 text-white border-amber-500 font-bold shadow-md'
              : 'bg-forest-900 hover:bg-forest-800 text-amber-300 border-forest-700'
          }`}
          title="Scenario D: Classifier confidence 48% < 75% -> Gated as UNCERTAIN"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[9px] sm:text-[10px] leading-tight truncate">D: Low Conf</span>
        </button>

        {/* Scenario E: Verifier Offline */}
        <button
          onClick={() => {
            onSelectScenario('scenario_e');
            onTriggerScenario('scenario_e');
          }}
          className={`min-h-[44px] px-1.5 sm:px-2 py-1.5 rounded-xl border transition-all truncate flex flex-col items-center justify-center gap-0.5 sm:gap-1 active:scale-95 ${
            activeScenario === 'scenario_e'
              ? 'bg-charcoal-700 text-white border-charcoal-500 font-bold shadow-md'
              : 'bg-forest-900 hover:bg-forest-800 text-leaf-200 border-forest-700'
          }`}
          title="Scenario E: Groq Vision Offline -> PRELIMINARY PREDICTION AVAILABLE"
        >
          <EyeOff className="w-3.5 h-3.5 text-leaf-400 shrink-0" />
          <span className="text-[9px] sm:text-[10px] leading-tight truncate">E: Offline</span>
        </button>

      </div>
    </aside>
  );
};
