import time
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from quality_gate import evaluate_image_quality
from classifier import classify_leaf_disease
from vision_verifier import verify_visual_evidence
from consensus_engine import resolve_consensus

app = FastAPI(
    title="CropSathi API",
    description="Multi-Stage Agricultural Crop Disease Triage Engine",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint returning system status and subsystem readiness.
    """
    return {
        "status": "ok",
        "classifier_ready": True,
        "verifier_ready": True,
        "version": "1.0.0"
    }

@app.post("/api/triage")
async def triage_leaf_photo(file: UploadFile = File(...)):
    """
    Triage leaf image through the 6-stage verification pipeline:
    Photo -> Quality Check -> Disease Classifier -> Confidence Gate -> Independent Vision Verification -> Consensus Engine -> Guidance.
    """
    start_time = time.time()

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a valid image (JPEG, PNG, WEBP).")

    try:
        image_bytes = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read image stream: {str(e)}")

    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # STAGE 01: OpenCV / PIL Quality Gate
    quality_result = evaluate_image_quality(image_bytes)

    # If photo failed quality checks, short-circuit directly to protect against false inference
    if not quality_result.get("passed", False):
        result = resolve_consensus(
            quality=quality_result,
            classifier={"predicted_disease": "Undetermined", "model_confidence": 0, "model_available": True},
            verification={"supports_prediction": False, "support_level": "NONE", "verification_confidence": 0, "observed_symptoms": [], "contradictions": [], "verification_available": False, "reasoning": "Quality gate failed."}
        )
        result["processing_time_ms"] = int((time.time() - start_time) * 1000)
        return result

    # STAGE 02 & 03: Primary Disease Classifier
    classifier_result = classify_leaf_disease(image_bytes)

    # STAGE 04 & 05: Independent Vision Verification
    verification_result = verify_visual_evidence(
        image_bytes=image_bytes,
        predicted_disease=classifier_result["predicted_disease"],
        model_confidence=classifier_result["model_confidence"]
    )

    # STAGE 06: Deterministic Consensus Engine & Knowledge Base
    consensus_result = resolve_consensus(
        quality=quality_result,
        classifier=classifier_result,
        verification=verification_result
    )

    consensus_result["processing_time_ms"] = int((time.time() - start_time) * 1000)
    consensus_result["timestamp"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    return consensus_result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
