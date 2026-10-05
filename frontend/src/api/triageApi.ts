import type { TriageResponse, DemoScenarioId } from '../types/triage';
import { DEMO_SCENARIOS } from './demoData';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'offline';
  classifier_ready: boolean;
  verifier_ready: boolean;
  version: string;
}

export class TriageApiError extends Error {
  statusCode?: number;
  isNetworkError: boolean;

  constructor(message: string, statusCode?: number, isNetworkError: boolean = false) {
    super(message);
    this.name = 'TriageApiError';
    this.statusCode = statusCode;
    this.isNetworkError = isNetworkError;
  }
}

/**
 * Checks backend health
 */
export async function checkBackendHealth(): Promise<HealthCheckResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${API_BASE}/api/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      return { status: 'offline', classifier_ready: false, verifier_ready: false, version: '0.0.0' };
    }
    const data = await res.json();
    return {
      status: data.status || 'ok',
      classifier_ready: !!data.classifier_ready,
      verifier_ready: !!data.verifier_ready,
      version: data.version || '1.0.0'
    };
  } catch {
    return { status: 'offline', classifier_ready: false, verifier_ready: false, version: '0.0.0' };
  }
}

/**
 * Real API triage call to backend: POST /api/triage
 */
export async function triageImage(file: File): Promise<TriageResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    const response = await fetch(`${API_BASE}/api/triage`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `Server error (${response.status})`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) errorMessage = errorJson.detail;
      } catch {
        // use default message
      }
      throw new TriageApiError(errorMessage, response.status);
    }

    const data: TriageResponse = await response.json();
    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof TriageApiError) {
      throw err;
    }
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new TriageApiError('Analysis is taking longer than expected. Please try again or check connection.', 408, true);
    }
    throw new TriageApiError('Unable to connect to CropSathi server. Please ensure the backend is running.', 503, true);
  }
}

/**
 * Demo scenario runner for judges & presentation reliability
 */
export async function fetchDemoScenario(scenarioId: DemoScenarioId): Promise<TriageResponse> {
  // Simulate honest network roundtrip delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  const scenario = DEMO_SCENARIOS[scenarioId];
  if (!scenario) {
    throw new TriageApiError(`Scenario ${scenarioId} not found`);
  }
  return {
    ...scenario.response,
    timestamp: new Date().toISOString()
  };
}
