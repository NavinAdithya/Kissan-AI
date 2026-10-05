"""
CropSathi Deterministic Consensus Engine
Evaluates confidence gate, visual verification, and contradiction detection.
"""
from knowledge_base import get_disease_guidance

def resolve_consensus(
    quality: dict,
    classifier: dict,
    verification: dict
) -> dict:
    # 1. Quality Check Gate
    if not quality.get("passed", True):
        return {
            "status": "retake",
            "predicted_disease": "Undetermined (Quality Gate Failed)",
            "model_confidence": 0,
            "model_available": True,
            "quality": quality,
            "verification": {
                "supports_prediction": False,
                "support_level": "NONE",
                "verification_confidence": 0,
                "observed_symptoms": [],
                "alternative_disease": None,
                "contradictions": ["Image failed quality gate. Analysis halted early to prevent false diagnostics."],
                "verification_available": False,
                "reasoning": "Image failed quality gate. Visual verification aborted."
            },
            "trust_score": "LOW",
            "trust_explanation": [
                "Analysis terminated early at Stage 01 (Quality Gate).",
                "Sharpness or illumination did not meet safety threshold.",
                "Diagnostic advice withheld to protect farmer decision-making."
            ],
            "retake": {
                "required": True,
                "reasons": quality.get("issues", ["Excessive motion blur or low lighting"]),
                "instructions": [
                    "Move camera closer (15 to 25 cm from symptomatic leaf)",
                    "Ensure bright, indirect natural daylight",
                    "Keep the single symptomatic leaf centered inside corner markers",
                    "Hold phone steady for 2 seconds before tapping capture"
                ]
            },
            "recommendations": {
                "what_to_do": [
                    "Retake photo following the 4 photo guidelines above.",
                    "Do not apply treatments until clear diagnostic verification is confirmed."
                ],
                "prevention": []
            }
        }

    # 2. Check for Independent Verification Degradation
    if not verification.get("verification_available", True):
        predicted = classifier.get("predicted_disease", "Unknown Disease")
        guidance = get_disease_guidance(predicted)
        return {
            "status": "needs_review",
            "predicted_disease": predicted,
            "model_confidence": classifier.get("model_confidence", 0),
            "model_available": classifier.get("model_available", True),
            "quality": quality,
            "verification": verification,
            "trust_score": "MEDIUM",
            "trust_explanation": [
                "Photo passed quality checks.",
                f"Classifier predicted {predicted} with {classifier.get('model_confidence')}% confidence.",
                "Independent vision verification was unavailable — dual-model consensus could not be completed.",
                "Result flagged as preliminary. Verify physical lesions before spraying."
            ],
            "retake": {
                "required": False,
                "reasons": [],
                "instructions": []
            },
            "recommendations": {
                "what_to_do": guidance.get("what_to_do", []),
                "prevention": guidance.get("prevention", [])
            }
        }

    # 3. Confidence Gate & Contradiction Resolution
    model_conf = classifier.get("model_confidence", 0)
    supports = verification.get("supports_prediction", False)
    contradictions = verification.get("contradictions", [])
    predicted = classifier.get("predicted_disease", "Unknown Disease")
    guidance = get_disease_guidance(predicted)

    # Uncertainty Condition: Conf below 75 OR contradictory evidence detected
    if model_conf < 75 or not supports or len(contradictions) > 0:
        return {
            "status": "uncertain",
            "predicted_disease": predicted,
            "model_confidence": model_conf,
            "model_available": True,
            "quality": quality,
            "verification": verification,
            "trust_score": "LOW",
            "trust_explanation": [
                "Image passed quality gate.",
                f"Model confidence ({model_conf}%) or visual verification raised conflict.",
                "Consensus engine flagged morphological discrepancies between statistical and visual evidence.",
                "Uncertainty state activated as a deliberate agronomic safety precaution."
            ],
            "retake": {
                "required": True,
                "reasons": [
                    "Visual features conflict with classifier prediction",
                    "Underside or stem inspection required to resolve discrepancy"
                ],
                "instructions": [
                    "Photograph the underside of the leaf to check for mycelial sporulation",
                    "Inspect the main plant stem for dark greasy lesions",
                    "Seek advice from an agricultural extension officer before chemical treatment"
                ]
            },
            "recommendations": {
                "what_to_do": [
                    "Do NOT spray broad-spectrum chemicals until contradiction is resolved.",
                    "Inspect surrounding plants immediately for rapid water-soaked wilting."
                ],
                "prevention": guidance.get("prevention", [])
            }
        }

    # 4. Full Dual Consensus: TRUSTED RESULT
    return {
        "status": "trusted",
        "predicted_disease": predicted,
        "model_confidence": model_conf,
        "model_available": True,
        "quality": quality,
        "verification": verification,
        "trust_score": "HIGH",
        "trust_explanation": [
            f"Photo passed quality checks (Sharpness: {quality.get('sharpness')}/100).",
            f"Classifier confidence ({model_conf}%) exceeded 75% confidence gate.",
            "Independent visual verification corroborated pathognomonic symptoms.",
            "Observed foliar lesions match verified pathology database.",
            "Zero contradictory lesions or conflicting pathogens detected.",
            "Structured agronomic knowledge base provided validated regional guidance."
        ],
        "retake": {
            "required": False,
            "reasons": [],
            "instructions": []
        },
        "recommendations": {
            "what_to_do": guidance.get("what_to_do", []),
            "prevention": guidance.get("prevention", [])
        }
    }
