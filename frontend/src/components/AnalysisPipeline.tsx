import React from 'react';
import { 
  CheckCircle2, 
  CircleDashed, 
  Clock, 
  XCircle, 
  ShieldCheck, 
  Scan, 
  Cpu, 
  Eye, 
  BookOpen, 
  SlidersHorizontal 
} from 'lucide-react';
import type { PipelineStage, PipelineStageId, PipelineStageStatus } from '../types/triage';

interface AnalysisPipelineProps {
  stages: PipelineStage[];
  currentStageIndex: number;
  previewUrl?: string;
  error?: string | null;
}

export const AnalysisPipeline: React.FC<AnalysisPipelineProps> = ({
  stages,
  currentStageIndex,
  previewUrl,
  error
}) => {
  const getStageIcon = (id: PipelineStageId) => {
    switch (id) {
      case 'quality':
        return <Scan className="w-4 h-4" />;
      case 'preprocess':
        return <SlidersHorizontal className="w-4 h-4" />;
      case 'classifier':
        return <Cpu className="w-4 h-4" />;
      case 'confidence_gate':
        return <ShieldCheck className="w-4 h-4" />;
      case 'verification':
        return <Eye className="w-4 h-4" />;
      case 'guidance':
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: PipelineStageStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Passed</span>
          </span>
        );
      case 'processing':
        return (
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-forest-900 bg-leaf-100 px-2.5 py-0.5 rounded-full border border-leaf-300 animate-pulse">
            <CircleDashed className="w-3.5 h-3.5 animate-spin text-leaf-600" />
            <span>Analyzing...</span>
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300">
            <XCircle className="w-3.5 h-3.5" />
            <span>Failed</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-medium text-charcoal-500 bg-cream-200/60 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-cream-300 shadow-premium p-6 sm:p-8 space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-200 pb-5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-leaf-700 bg-leaf-100/70 px-2.5 py-1 rounded-md border border-leaf-200">
            Multi-Stage Triage Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-forest-950 mt-1">
            Analyzing Leaf Evidence...
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600">
            Subjecting image to dual-model verification and deterministic consensus.
          </p>
        </div>

        {/* Small thumbnail of image being analyzed */}
        {previewUrl && (
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-charcoal-900 border-2 border-forest-800 shrink-0 shadow-sm">
            <img
              src={previewUrl}
              alt="Analyzing thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest-900/10 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-leaf-400 animate-scan" />
          </div>
        )}
      </div>

      {/* Error notification if pipeline was interrupted */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Pipeline Error: </span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* 6 Sequential Stages Timeline */}
      <div className="space-y-3">
        {stages.map((stage, idx) => {
          const isCurrent = idx === currentStageIndex && stage.status === 'processing';
          const isDone = stage.status === 'completed';
          const isFailed = stage.status === 'failed';

          return (
            <div
              key={stage.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-leaf-50/50 border-leaf-400/80 shadow-md ring-2 ring-leaf-500/10'
                  : isDone
                  ? 'bg-white border-cream-300'
                  : isFailed
                  ? 'bg-rose-50/50 border-rose-300'
                  : 'bg-cream-50/50 border-cream-200 opacity-60'
              }`}
            >
              {/* Left Stage Icon + Description */}
              <div className="flex items-center gap-3.5 min-w-0">
                
                {/* Circle Icon Badge */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : isCurrent
                      ? 'bg-forest-900 text-leaf-300 shadow-sm animate-pulse'
                      : isFailed
                      ? 'bg-rose-100 text-rose-700 border border-rose-300'
                      : 'bg-cream-200 text-charcoal-500'
                  }`}
                >
                  {getStageIcon(stage.id)}
                </div>

                {/* Stage Title and Description */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-charcoal-400">
                      STEP 0{idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-forest-950 truncate">
                      {stage.label}
                    </h3>
                  </div>
                  <p className="text-xs text-charcoal-600 truncate">
                    {stage.sublabel}
                  </p>
                </div>

              </div>

              {/* Right Status Badge */}
              <div className="shrink-0">
                {getStatusBadge(stage.status)}
              </div>

            </div>
          );
        })}
      </div>

      {/* Honest Diagnostic Notice */}
      <div className="p-3 bg-cream-100/70 rounded-xl border border-cream-300/80 text-[11px] text-charcoal-600 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-leaf-600" />
          <span>Active Dual Verification Protocol</span>
        </span>
        <span className="font-mono text-charcoal-500">Live Stage Execution</span>
      </div>

    </div>
  );
};
