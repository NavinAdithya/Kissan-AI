export type TriageStatus = 'trusted' | 'uncertain' | 'retake' | 'needs_review';

export type SupportLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

export interface QualityGateResult {
  passed: boolean;
  sharpness: number;
  brightness: number;
  leaf_visibility: number;
  issues: string[];
  quality_label?: 'GOOD' | 'FAIR' | 'POOR';
}

export interface VerificationResult {
  supports_prediction: boolean;
  support_level: SupportLevel;
  verification_confidence: number;
  observed_symptoms: string[];
  alternative_disease?: string | null;
  contradictions: string[];
  verification_available: boolean;
  reasoning: string;
}

export interface RetakeInstructions {
  required: boolean;
  reasons: string[];
  instructions: string[];
}

export interface TreatmentRecommendations {
  what_to_do: string[];
  prevention: string[];
}

export interface TriageResponse {
  status: TriageStatus;
  predicted_disease: string;
  model_confidence: number;
  model_available: boolean;
  quality: QualityGateResult;
  verification: VerificationResult;
  trust_score?: 'HIGH' | 'MEDIUM' | 'LOW';
  trust_explanation: string[];
  retake: RetakeInstructions;
  recommendations: TreatmentRecommendations;
  timestamp?: string;
  image_id?: string;
  processing_time_ms?: number;
}

export type PipelineStageId = 
  | 'quality'
  | 'preprocess'
  | 'classifier'
  | 'confidence_gate'
  | 'verification'
  | 'guidance';

export type PipelineStageStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface PipelineStage {
  id: PipelineStageId;
  label: string;
  sublabel: string;
  status: PipelineStageStatus;
}

export type DemoScenarioId = 
  | 'scenario_a' // Clear Leaf -> PASS -> High Conf -> Verify SUPPORTS -> TRUSTED
  | 'scenario_b' // Blurry Image -> FAIL -> RETAKE
  | 'scenario_c' // Clear but Ambiguous -> Disease A vs Disease B -> UNCERTAIN
  | 'scenario_d' // Low Model Confidence -> UNCERTAIN
  | 'scenario_e'; // Groq Vision Offline -> PRELIMINARY PREDICTION
