import React, { useState } from 'react';
import { Camera, Layers, CheckCircle2, Menu, X, Home, Info, Cpu } from 'lucide-react';
import type { DemoScenarioId } from '../types/triage';

interface NavbarProps {
  onOpenCapture: () => void;
  judgeMode: boolean;
  onToggleJudgeMode: () => void;
  activeScenario: DemoScenarioId | 'live';
  onSelectScenario: (id: DemoScenarioId | 'live') => void;
  backendOnline: boolean;
  onResetToHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCapture,
  judgeMode,
  onToggleJudgeMode,
  activeScenario,
  onSelectScenario,
  backendOnline,
  onResetToHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-md border-b border-cream-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={onResetToHome} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
            title="Return to CropSathi Home"
          >
            {/* Visual Identity Logo: Leaf + Camera + Verification Shield */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-forest-900 flex items-center justify-center shadow-md transition-transform group-hover:scale-105 border border-forest-700/50 shrink-0">
              <span className="text-leaf-400 font-bold text-lg sm:text-xl">🌱</span>
              <div className="absolute -bottom-1 -right-1 bg-leaf-500 text-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-forest-950 font-outfit">
                  Crop<span className="text-leaf-600">Sathi</span>
                </span>
                <span className="hidden xs:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-forest-100 text-forest-900 border border-forest-200">
                  AI Triage
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-charcoal-500 uppercase -mt-0.5 hidden sm:block">
                See. Verify. Protect.
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal-700">
            <a href="#how-it-works" className="hover:text-forest-900 transition-colors">
              How It Works
            </a>
            <a href="#why-cropsathi" className="hover:text-forest-900 transition-colors">
              Why Verification?
            </a>
            <a href="#architecture" className="hover:text-forest-900 transition-colors">
              Architecture
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Backend Connectivity Status Indicator */}
            <div 
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                backendOnline 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
              title={backendOnline ? 'Connected to local FastAPI backend' : 'Backend offline - Demo fixtures ready'}
            >
              <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span>{backendOnline ? 'Backend Live' : 'Demo Ready'}</span>
            </div>

            {/* Judge Mode Toggle */}
            <button
              onClick={onToggleJudgeMode}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                judgeMode
                  ? 'bg-forest-900 text-leaf-300 border-forest-950 shadow-inner'
                  : 'bg-white text-charcoal-700 border-cream-300 hover:border-forest-700 hover:bg-cream-100'
              }`}
              title="Toggle Technical Decision Pipeline Architecture for Judges"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Judge Mode</span>
              {judgeMode && <span className="w-1.5 h-1.5 rounded-full bg-leaf-400" />}
            </button>

            {/* Quick Demo Scenarios Selector */}
            <select
              aria-label="Select Demo Scenario"
              value={activeScenario}
              onChange={(e) => onSelectScenario(e.target.value as DemoScenarioId | 'live')}
              className="text-xs font-semibold px-2.5 py-2 rounded-xl border border-cream-300 bg-white text-charcoal-800 focus:outline-none focus:ring-2 focus:ring-leaf-500/20 cursor-pointer hidden lg:block"
            >
              <option value="live">⚡ Live Inference</option>
              <option value="scenario_a">Demo A: Trusted Consensus</option>
              <option value="scenario_b">Demo B: Quality Fail / Retake</option>
              <option value="scenario_c">Demo C: Contradiction / Uncertain</option>
              <option value="scenario_d">Demo D: Low Confidence</option>
              <option value="scenario_e">Demo E: Verifier Offline</option>
            </select>

            {/* Primary CTA: Take Photo */}
            <button
              onClick={onOpenCapture}
              className="min-h-[40px] sm:min-h-[44px] flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 border border-forest-950 whitespace-nowrap"
            >
              <Camera className="w-4 h-4 text-leaf-400" />
              <span className="hidden xs:inline">Diagnose Leaf</span>
              <span className="xs:hidden">Diagnose</span>
            </button>

            {/* Mobile Navigation Hamburger (visible only on small screens < md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="md:hidden w-10 h-10 rounded-xl bg-white border border-cream-300 text-charcoal-800 flex items-center justify-center hover:bg-cream-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu (only renders on screens < md) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cream-200 py-3 space-y-1 animate-fadeIn pb-safe">
            <button
              onClick={() => {
                onResetToHome();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-forest-950 hover:bg-cream-100 transition-colors"
            >
              <Home className="w-4 h-4 text-leaf-600" />
              <span>Home</span>
            </button>

            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal-700 hover:bg-cream-100 transition-colors"
            >
              <Info className="w-4 h-4 text-leaf-600" />
              <span>How It Works</span>
            </a>

            <a
              href="#why-cropsathi"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal-700 hover:bg-cream-100 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-leaf-600" />
              <span>Why Verification?</span>
            </a>

            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-charcoal-700 hover:bg-cream-100 transition-colors"
            >
              <Cpu className="w-4 h-4 text-leaf-600" />
              <span>Architecture</span>
            </a>

            {/* Mobile Judge Mode toggle & backend status */}
            <div className="pt-2 border-t border-cream-200 flex items-center justify-between px-4">
              <button
                onClick={() => {
                  onToggleJudgeMode();
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  judgeMode
                    ? 'bg-forest-900 text-leaf-300 border-forest-950'
                    : 'bg-white text-charcoal-700 border-cream-300'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Judge Mode {judgeMode ? '(ON)' : '(OFF)'}</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-charcoal-600">
                <span className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                <span>{backendOnline ? 'Backend Online' : 'Demo Mode'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
