import { RefreshCw, ServerCrash } from 'lucide-react';

interface ModelUnavailableCardProps {
  onRetake: () => void;
}

export const ModelUnavailableCard: React.FC<ModelUnavailableCardProps> = ({ onRetake }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fadeIn pb-12">
      <div className="bg-cream-100 rounded-3xl border border-cream-300 p-8 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-charcoal-900 text-leaf-300 flex items-center justify-center mx-auto shadow-md">
          <ServerCrash className="w-7 h-7" />
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cream-200 text-charcoal-700 font-mono">
          SERVICE STATUS
        </span>

        <h2 className="text-2xl font-extrabold text-forest-950 font-outfit">
          Disease Model Unavailable
        </h2>

        <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
          The disease model is currently unavailable or initializing. We do not display fabricated confidence estimates when inference servers are offline.
        </p>

        <div className="pt-2">
          <button
            onClick={onRetake}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-bold text-sm shadow-md transition-all"
          >
            <RefreshCw className="w-4 h-4 text-leaf-400" />
            <span>TRY AGAIN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
