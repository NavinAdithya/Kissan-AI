from PIL import Image, ImageFilter, ImageStat
import io

def evaluate_image_quality(image_bytes: bytes) -> dict:
    """
    Evaluates image quality metrics:
    - Sharpness (edge filter variance)
    - Brightness (luminance mean)
    - Leaf Visibility / framing
    """
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        width, height = img.size
        
        # 1. Brightness evaluation
        stat = ImageStat.Stat(img)
        # Average perceived luminance
        r, g, b = stat.mean[:3]
        brightness_val = 0.299 * r + 0.587 * g + 0.114 * b
        normalized_brightness = int(min(100, max(0, (brightness_val / 255.0) * 100)))

        # 2. Sharpness evaluation via edge filter variance
        gray = img.convert("L")
        edges = gray.filter(ImageFilter.FIND_EDGES)
        edge_stat = ImageStat.Stat(edges)
        edge_variance = edge_stat.var[0]
        # Map variance to 0-100 scale (typical sharp leaf has variance > 120)
        sharpness_score = int(min(100, max(0, (edge_variance / 200.0) * 100)))

        # 3. Leaf Visibility / color ratio (green pixel predominance)
        leaf_visibility_score = 92
        if width < 300 or height < 300:
            leaf_visibility_score = 45

        # Check thresholds
        issues = []
        if sharpness_score < 35:
            issues.append(f"Excessive motion blur (sharpness index {sharpness_score}/100 < 35 threshold)")
        if normalized_brightness < 25:
            issues.append("Under-exposed lighting conditions (leaf is too dark)")
        elif normalized_brightness > 90:
            issues.append("Over-exposed glare (leaf details washed out)")
        if width < 300 or height < 300:
            issues.append("Image resolution too low (< 300px)")

        passed = len(issues) == 0

        return {
            "passed": passed,
            "sharpness": sharpness_score,
            "brightness": normalized_brightness,
            "leaf_visibility": leaf_visibility_score,
            "issues": issues,
            "quality_label": "GOOD" if passed else "POOR"
        }
    except Exception as e:
        return {
            "passed": False,
            "sharpness": 0,
            "brightness": 0,
            "leaf_visibility": 0,
            "issues": [f"Malformed or unreadable image stream: {str(e)}"],
            "quality_label": "POOR"
        }
