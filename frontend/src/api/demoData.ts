import type { TriageResponse, DemoScenarioId } from '../types/triage';

export const DEMO_SCENARIOS: Record<DemoScenarioId, { title: string; subtitle: string; response: TriageResponse; previewImage: string }> = {
  scenario_a: {
    title: 'Scenario A: Trusted Consensus',
    subtitle: 'Clear Leaf · High Model Conf · Visual Verification Matched',
    previewImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
    response: {
      status: 'trusted',
      predicted_disease: 'Tomato Early Blight',
      model_confidence: 91,
      model_available: true,
      quality: {
        passed: true,
        sharpness: 94,
        brightness: 88,
        leaf_visibility: 96,
        issues: [],
        quality_label: 'GOOD'
      },
      verification: {
        supports_prediction: true,
        support_level: 'HIGH',
        verification_confidence: 93,
        observed_symptoms: [
          'Brown circular lesions',
          'Yellowing halo around lesions',
          'Concentric target-board patterns',
          'Localized necrotic tissue on mature leaves'
        ],
        alternative_disease: null,
        contradictions: [],
        verification_available: true,
        reasoning: 'Visual inspection confirms distinct dark brown circular spots with characteristic concentric rings (target pattern) bordered by chlorotic tissue. Features strictly align with Alternaria solani pathology.'
      },
      trust_score: 'HIGH',
      trust_explanation: [
        'Photo passed OpenCV multi-metric quality and sharpness checks (94/100).',
        'Classifier confidence (91%) comfortably exceeded the 75% confidence gate.',
        'Independent visual verification independently confirmed pathognomonic visual signs.',
        'Observed concentric lesions and chlorosis match primary diagnostic markers.',
        'Zero pathological contradictions or conflicting lesions detected.',
        'Structured agronomic knowledge base provided validated regional remedies.'
      ],
      retake: {
        required: false,
        reasons: [],
        instructions: []
      },
      recommendations: {
        what_to_do: [
          'Prune severely infected lower leaves immediately to restrict spore dispersal.',
          'Avoid overhead spray irrigation; transition to ground drip lines to keep foliage dry.',
          'Sterilize pruning shears with 70% isopropyl alcohol between plants to prevent transmission.',
          'Apply copper-based or chlorothalonil fungicidal spray following morning dew evaporation.'
        ],
        prevention: [
          'Thoroughly remove and burn or deeply bury infected solanaceous crop debris post-harvest.',
          'Maintain minimum 45cm inter-plant spacing to maximize canopy ventilation.',
          'Enforce strict 3-year crop rotation away from tomatoes, potatoes, and eggplants.'
        ]
      },
      processing_time_ms: 1240,
      timestamp: new Date().toISOString()
    }
  },

  scenario_b: {
    title: 'Scenario B: Photo Quality Failure',
    subtitle: 'Excessive Motion Blur · Sub-threshold Sharpness · Retake Required',
    previewImage: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    response: {
      status: 'retake',
      predicted_disease: 'Undetermined (Quality Gate Failed)',
      model_confidence: 0,
      model_available: true,
      quality: {
        passed: false,
        sharpness: 32,
        brightness: 44,
        leaf_visibility: 51,
        issues: [
          'Severe motion blur (Laplacian variance 38.4 < 100 threshold)',
          'Low lighting conditions (mean pixel luminance 44/255)',
          'Leaf target off-center with background soil occlusion'
        ],
        quality_label: 'POOR'
      },
      verification: {
        supports_prediction: false,
        support_level: 'NONE',
        verification_confidence: 0,
        observed_symptoms: [],
        alternative_disease: null,
        contradictions: ['Image resolution and sharpness insufficient to resolve cellular foliar margins.'],
        verification_available: false,
        reasoning: 'Image failed quality gate. Visual verification aborted to prevent inaccurate diagnostic hallucinations.'
      },
      trust_explanation: [
        'Analysis terminated early at Stage 01 (OpenCV Quality Gate).',
        'Model inference withheld to protect farmer decision-making safety.'
      ],
      retake: {
        required: true,
        reasons: [
          'Excessive blur prevents lesion margin inspection',
          'Leaf is too far away or off-center',
          'Low ambient light distorts symptom coloration'
        ],
        instructions: [
          'Move phone camera closer (15 to 25 cm from symptomatic leaf)',
          'Ensure bright, indirect natural daylight (avoid heavy shadows or night flash)',
          'Keep the single symptomatic leaf centered within the on-screen corner markers',
          'Hold the phone steady with both hands for 2 seconds before tapping capture'
        ]
      },
      recommendations: {
        what_to_do: [
          'Retake photo following the 4 photo guidelines above.',
          'Do not apply treatments until clear diagnostic verification is confirmed.'
        ],
        prevention: []
      },
      processing_time_ms: 380,
      timestamp: new Date().toISOString()
    }
  },

  scenario_c: {
    title: 'Scenario C: Conflicting Visual Evidence',
    subtitle: 'Classifier Predicts Early Blight · Vision Discovers Late Blight Features · UNCERTAIN',
    previewImage: 'https://images.unsplash.com/photo-1599818816942-88229b4e06d9?auto=format&fit=crop&w=600&q=80',
    response: {
      status: 'uncertain',
      predicted_disease: 'Tomato Early Blight',
      model_confidence: 89,
      model_available: true,
      quality: {
        passed: true,
        sharpness: 91,
        brightness: 84,
        leaf_visibility: 95,
        issues: [],
        quality_label: 'GOOD'
      },
      verification: {
        supports_prediction: false,
        support_level: 'LOW',
        verification_confidence: 84,
        observed_symptoms: [
          'Irregular water-soaked lesion borders',
          'Pale green border fading into healthy tissue',
          'Faint grayish downy sporulation on abaxial surface',
          'Absence of target-like concentric rings'
        ],
        alternative_disease: 'Tomato Late Blight (Phytophthora infestans)',
        contradictions: [
          'Expected dry concentric necrotic rings of Early Blight were NOT observed.',
          'Lesions exhibit rapid water-soaked translucent margins characteristic of Phytophthora oomycete infection rather than Alternaria fungus.'
        ],
        verification_available: true,
        reasoning: 'Classifier assigned high statistical weight to necrotic leaf tip, but high-resolution visual analysis detected water-soaked margins and active sporulation typical of Late Blight. The consensus engine flagged a critical contradiction.'
      },
      trust_score: 'LOW',
      trust_explanation: [
        'Image passed quality gate successfully.',
        'Primary disease classifier predicted Early Blight with 89% confidence.',
        'Independent vision verification detected strong visual contradiction: lesions are water-soaked with downy mildew signs.',
        'Deterministic consensus engine halted triage because a false negative on Late Blight can devastate an entire field in 48 hours.',
        'Uncertainty state triggered as an active agronomic safety protocol.'
      ],
      retake: {
        required: true,
        reasons: [
          'Visual features conflict directly with statistical classifier',
          'Stem or underside inspection required to differentiate Late Blight'
        ],
        instructions: [
          'Turn leaf over and photograph the underside to check for white mold growth',
          'Photograph the main plant stem for dark brown greasy lesions',
          'Consult local agricultural extension officer before spraying'
        ]
      },
      recommendations: {
        what_to_do: [
          'Do NOT spray standard broad-spectrum chemicals until contradiction is resolved.',
          'Inspect surrounding plants immediately for rapid water-soaked wilting.',
          'Isolate affected plants if feasible to mitigate potential Late Blight outbreak.'
        ],
        prevention: [
          'Avoid handling foliage during humid mornings.',
          'Ensure rapid drainage in field furrows.'
        ]
      },
      processing_time_ms: 1480,
      timestamp: new Date().toISOString()
    }
  },

  scenario_d: {
    title: 'Scenario D: Low Classifier Confidence',
    subtitle: 'Confidence Gate Triggered (48% < 75%) · Inconclusive Morphology · UNCERTAIN',
    previewImage: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=600&q=80',
    response: {
      status: 'uncertain',
      predicted_disease: 'Suspected Tomato Septoria / Nutrient Chlorosis',
      model_confidence: 48,
      model_available: true,
      quality: {
        passed: true,
        sharpness: 86,
        brightness: 78,
        leaf_visibility: 82,
        issues: [],
        quality_label: 'GOOD'
      },
      verification: {
        supports_prediction: false,
        support_level: 'LOW',
        verification_confidence: 52,
        observed_symptoms: [
          'Diffuse interveinal leaf yellowing',
          'Minor scattered pinpoint specks without distinct halo',
          'Mild leaf curling along outer margins'
        ],
        alternative_disease: 'Nitrogen/Magnesium Deficiency or Early Viral Vector',
        contradictions: [
          'Symptom distribution is systemic across leaf veins rather than focal fungal lesions.',
          'Pathological indicators are too non-specific for single-disease attribution.'
        ],
        verification_available: true,
        reasoning: 'Model confidence (48%) is below safety threshold (75%). Foliar pattern displays general chlorosis which may stem from nutritional stress rather than fungal infection.'
      },
      trust_score: 'LOW',
      trust_explanation: [
        'Quality gate passed.',
        'Model confidence (48%) failed the 75% minimum reliability gate.',
        'Visual verification found non-specific symptoms consistent with physiological stress.',
        'System refuses to fabricate a confident diagnosis when visual evidence is weak.'
      ],
      retake: {
        required: true,
        reasons: [
          'Classifier confidence insufficient for reliable triage',
          'Foliar symptoms may be nutritional rather than infectious'
        ],
        instructions: [
          'Take a wider photo showing both older bottom leaves and young top shoots',
          'Inspect under the leaves for aphids or whitefly vectors',
          'Check soil moisture levels around root crown'
        ]
      },
      recommendations: {
        what_to_do: [
          'Verify soil moisture and fertilizer application schedule before chemical intervention.',
          'Monitor leaf symptoms over the next 48 hours for developing fungal spots.'
        ],
        prevention: [
          'Conduct routine soil fertility testing for balanced N-P-K and micronutrients.'
        ]
      },
      processing_time_ms: 1120,
      timestamp: new Date().toISOString()
    }
  },

  scenario_e: {
    title: 'Scenario E: Vision Verifier Offline',
    subtitle: 'Preliminary Classifier Only · Verification Gracefully Degraded',
    previewImage: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
    response: {
      status: 'needs_review',
      predicted_disease: 'Tomato Septoria Leaf Spot',
      model_confidence: 87,
      model_available: true,
      quality: {
        passed: true,
        sharpness: 90,
        brightness: 82,
        leaf_visibility: 91,
        issues: [],
        quality_label: 'GOOD'
      },
      verification: {
        supports_prediction: false,
        support_level: 'NONE',
        verification_confidence: 0,
        observed_symptoms: [],
        alternative_disease: null,
        contradictions: [],
        verification_available: false,
        reasoning: 'Independent vision verification upstream service is temporarily unreachable or offline. Preliminary classification provided with diagnostic warning.'
      },
      trust_score: 'MEDIUM',
      trust_explanation: [
        'Photo passed quality checks.',
        'Disease classifier evaluated 87% confidence for Septoria Leaf Spot.',
        'Independent vision verification was UNAVAILABLE — dual-model consensus could not be verified.',
        'Result is flagged as preliminary; farmer should verify physical lesions manually.'
      ],
      retake: {
        required: false,
        reasons: [],
        instructions: []
      },
      recommendations: {
        what_to_do: [
          'Visually inspect leaf for small circular spots with gray centers and black specks.',
          'Re-run triage once connectivity or verification service is restored.',
          'Avoid wetting leaves during evening watering.'
        ],
        prevention: [
          'Maintain clean weed-free garden beds around solanaceous crops.'
        ]
      },
      processing_time_ms: 890,
      timestamp: new Date().toISOString()
    }
  }
};
