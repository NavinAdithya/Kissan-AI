import React from 'react';

export const TechCredibilitySection: React.FC = () => {
  const stack = [
    {
      layer: 'FRONTEND CLIENT',
      tech: 'React 18 · TypeScript · Vite · Tailwind CSS',
      purpose: 'Mobile-first responsive farmer interface with camera framing viewfinder and live pipeline animations.',
      accent: 'border-leaf-300 bg-white'
    },
    {
      layer: 'API GATEWAY',
      tech: 'FastAPI (Python 3.14) · Async Uvicorn',
      purpose: 'High-throughput async server coordinating pipeline stages, health checks, and multipart image streaming.',
      accent: 'border-cream-300 bg-white'
    },
    {
      layer: 'STAGE 01: QUALITY GATE',
      tech: 'OpenCV / NumPy Laplacian Edge Variance',
      purpose: 'Validates sharpness (variance > 100), brightness histogram balance, and leaf centering before inference.',
      accent: 'border-cream-300 bg-white'
    },
    {
      layer: 'STAGE 02: PATHOLOGY CLASSIFIER',
      tech: 'Deep CNN Foliar Feature Classifier',
      purpose: 'Identifies foliar pathology signatures across 38 crop disease classes with calibrated statistical confidence.',
      accent: 'border-cream-300 bg-white'
    },
    {
      layer: 'STAGE 03: INDEPENDENT VISION VERIFICATION',
      tech: 'Groq Cloud Llama-3.2-Vision / Vision Heuristic',
      purpose: 'Zero-shot physical symptom inspection evaluating lesion margin, chlorotic halos, and concentric ring patterns.',
      accent: 'border-cream-300 bg-white'
    },
    {
      layer: 'STAGE 04: CONSENSUS ENGINE',
      tech: 'Deterministic Multi-Factor Resolver',
      purpose: 'Rules engine evaluating confidence gates, visual agreement, and contradiction detection into Trusted / Uncertain.',
      accent: 'border-forest-800 bg-forest-900 text-white'
    },
    {
      layer: 'STAGE 05: KNOWLEDGE BASE',
      tech: 'Structured Plant Pathology Repository',
      purpose: 'Curated agricultural extension remedies, biological interventions, and preventative biosecurity measures.',
      accent: 'border-cream-300 bg-white'
    },
  ];

  return (
    <section id="architecture" className="py-16 sm:py-24 bg-cream-100/60 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-forest-900 bg-forest-100 px-3 py-1 rounded-full border border-forest-200">
            Technical Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-outfit">
            Engineered for Production Rigor
          </h2>
          <p className="text-base text-charcoal-700">
            A modular multi-stage micro-architecture ensuring resilience, speed, and uncompromising diagnostic fidelity.
          </p>
        </div>

        {/* Vertical Pipeline Flow */}
        <div className="max-w-4xl mx-auto space-y-3">
          {stack.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:scale-[1.01] ${item.accent}`}
            >
              <div className="space-y-1">
                <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest block ${
                  item.accent.includes('text-white') ? 'text-leaf-300' : 'text-leaf-700'
                }`}>
                  {item.layer}
                </span>
                <h3 className={`text-base font-extrabold font-outfit ${
                  item.accent.includes('text-white') ? 'text-white' : 'text-forest-950'
                }`}>
                  {item.tech}
                </h3>
                <p className={`text-xs max-w-xl ${
                  item.accent.includes('text-white') ? 'text-leaf-100/90' : 'text-charcoal-600'
                }`}>
                  {item.purpose}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                  item.accent.includes('text-white') 
                    ? 'bg-leaf-500 text-forest-950' 
                    : 'bg-cream-100 text-charcoal-600 border border-cream-300'
                }`}>
                  Stage 0{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
