import type { TriageResponse } from '../types/triage';
import { TrustedResultCard } from './TrustedResultCard';
import { UncertainResultCard } from './UncertainResultCard';
import { RetakeQualityCard } from './RetakeQualityCard';
import { PreliminaryCard } from './PreliminaryCard';
import { ModelUnavailableCard } from './ModelUnavailableCard';

interface ResultViewProps {
  data: TriageResponse;
  previewUrl?: string;
  onRetake: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  data,
  previewUrl,
  onRetake,
}) => {
  // 1. Model unavailable check
  if (!data.model_available) {
    return <ModelUnavailableCard onRetake={onRetake} />;
  }

  // 2. Photo quality check failure (Retake required)
  if (data.status === 'retake' || (data.quality && !data.quality.passed)) {
    return (
      <RetakeQualityCard
        data={data}
        previewUrl={previewUrl}
        onRetake={onRetake}
      />
    );
  }

  // 3. Independent vision verifier unavailable check
  if (data.verification && !data.verification.verification_available) {
    return (
      <PreliminaryCard
        data={data}
        previewUrl={previewUrl}
        onRetake={onRetake}
      />
    );
  }

  // 4. Uncertainty / Conflicting visual evidence check
  if (data.status === 'uncertain') {
    return (
      <UncertainResultCard
        data={data}
        previewUrl={previewUrl}
        onRetake={onRetake}
      />
    );
  }

  // 5. Normal Trusted Consensus result
  return (
    <TrustedResultCard
      data={data}
      previewUrl={previewUrl}
      onRetake={onRetake}
    />
  );
};
