import React from 'react';
import { Camera, Scan, Cpu, Eye, Scale, BookOpen } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: 'STEP 01',
      title: 'SEE',
      subtitle: 'Capture a clear image',
      desc: 'The farmer captures a single photo of the symptomatic leaf using on-screen corner framing guides and natural-light optimization cues.',
      icon: <Camera className="w-5 h-5" />,
    },
    {
      num: 'STEP 02',
      title: 'CHECK',
      subtitle: 'Quality Pre-Check',
      desc: 'OpenCV runs Laplacian edge variance and luminance histograms to verify sharpness, exposure, and centering before AI inference begins.',
      icon: <Scan className="w-5 h-5" />,
    },
    {
      num: 'STEP 03',
      title: 'PREDICT',
      subtitle: 'Disease Classifier',
      desc: 'The primary foliar disease classifier extracts pathological lesion features, outputting predicted pathogen and statistical confidence.',
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      num: 'STEP 04',
      title: 'VERIFY',
      subtitle: 'Independent Visual Verification',
      desc: 'A decoupled Vision Intelligence model inspects fine-grained foliar details (margins, halos, concentric rings) without bias toward the classifier.',
      icon: <Eye className="w-5 h-5" />,
    },
    {
      num: 'STEP 05',
      title: 'DECIDE',
      subtitle: 'Consensus Engine',
      desc: 'A deterministic rules engine evaluates confidence thresholds and cross-checks for conflicting symptoms, issuing Trusted, Uncertain, or Retake.',
      icon: <Scale className="w-5 h-5" />,
    },
    {
      num: 'STEP 06',
      title: 'ADVISE',
      subtitle: 'Structured Guidance',
      desc: 'Curated agricultural pathology protocols provide verified curative actions, biosecurity measures, and long-term prevention guidelines.',
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-cream-100/70 border-t border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-leaf-700 bg-leaf-100 px-3 py-1 rounded-full border border-leaf-300">
            Systematic Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 font-outfit">
            How CropSathi Verifies Every Leaf
          </h2>
          <p className="text-base text-charcoal-700">
            Standard AI classifiers give a blind guess. CropSathi subjects every foliar photo to a 6-step rigorous verification protocol.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-cream-300 p-6 sm:p-7 shadow-sm hover:shadow-premium transition-all space-y-4 group flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-charcoal-400 bg-cream-100 px-2.5 py-1 rounded-md border border-cream-200">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-forest-900/5 group-hover:bg-forest-900 group-hover:text-leaf-300 text-forest-900 transition-colors flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-forest-950 font-outfit">
                    {step.title}
                  </h3>
                  <p className="text-xs font-bold text-leaf-700 uppercase tracking-wide mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed pt-2 border-t border-cream-100">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
