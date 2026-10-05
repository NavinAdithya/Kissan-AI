"""
CropSathi Agronomic Knowledge Base
Structured plant pathology symptoms, curative actions, and prevention guidelines.
"""

DISEASE_KNOWLEDGE = {
    "Tomato Early Blight": {
        "scientific_name": "Alternaria solani",
        "observed_symptoms": [
            "Brown circular lesions with concentric target rings",
            "Yellow chlorotic halo surrounding necrotic spots",
            "Lower older foliage affected first",
            "Premature defoliation and stem collar rot"
        ],
        "what_to_do": [
            "Prune and discard severely infected lower foliage to reduce secondary spore dispersal.",
            "Switch to drip or ground furrow irrigation to maintain dry foliage.",
            "Apply copper oxychloride (2.5g/L) or chlorothalonil fungicide at early symptom onset.",
            "Sterilize garden shears with 70% isopropyl alcohol between consecutive plants."
        ],
        "prevention": [
            "Maintain minimum 45-60cm plant spacing to ensure rapid morning dew evaporation.",
            "Enforce a 3-year crop rotation schedule away from solanaceous plants (potatoes, eggplants).",
            "Mulch bed surface with clean organic straw to prevent soil-splash inoculation.",
            "Remove and burn all infected crop residue immediately following final harvest."
        ]
    },
    "Tomato Late Blight": {
        "scientific_name": "Phytophthora infestans",
        "observed_symptoms": [
            "Irregular water-soaked pale green or dark brown lesions",
            "White velvety sporulation on the underside of leaves during humid mornings",
            "Rapid collapse of leaf petiole and main stem tissue",
            "Dark brown greasy rot on tomato fruit"
        ],
        "what_to_do": [
            "Immediately destroy and bag heavily blighted plants to protect remaining crops.",
            "Apply metalaxyl + mancozeb or dimethomorph systemic fungicide within 24 hours.",
            "Halt all overhead spraying and restrict field entry while foliage remains wet."
        ],
        "prevention": [
            "Plant certified disease-free transplants and certified resistant varieties.",
            "Eliminate volunteer tomato and potato plants within a 500m radius.",
            "Monitor localized agricultural weather bulletins for late blight risk warnings."
        ]
    },
    "Tomato Septoria Leaf Spot": {
        "scientific_name": "Septoria lycopersici",
        "observed_symptoms": [
            "Numerous small circular spots (1-3mm) with dark margins and gray centers",
            "Tiny black pycnidia specks visible within lesion centers under magnification",
            "Severe yellowing of affected leaves leading to early leaf drop"
        ],
        "what_to_do": [
            "Prune infected bottom leaves up to 12 inches from ground level.",
            "Apply broad-spectrum copper fungicide or azoxystrobin spray every 7-10 days."
        ],
        "prevention": [
            "Practice continuous 2-year crop rotation.",
            "Keep soil covered with organic mulch to block spore splash."
        ]
    },
    "Tomato Bacterial Spot": {
        "scientific_name": "Xanthomonas perforans",
        "observed_symptoms": [
            "Small angular dark brown water-soaked specks",
            "Lesions bordered by faint yellow halos without concentric rings",
            "Scabby blister-like spots on green tomato fruit"
        ],
        "what_to_do": [
            "Apply fixed copper mixed with mancozeb for synergistic bactericidal efficacy.",
            "Avoid handling foliage while wet to halt bacterial dissemination."
        ],
        "prevention": [
            "Use certified hot-water-treated pathogen-free seed.",
            "Sanitize trellising stakes and greenhouse benches before replanting."
        ]
    },
    "Healthy Foliage": {
        "scientific_name": "Solanum lycopersicum",
        "observed_symptoms": [
            "Vibrant uniform green coloration across lamina",
            "Smooth leaf margins without necrotic spots or chlorosis",
            "Turgid vascular veins and vigorous shoot apical growth"
        ],
        "what_to_do": [
            "Continue standard watering and balanced fertilizer schedule.",
            "Inspect weekly for early aphid or whitefly vector activity."
        ],
        "prevention": [
            "Maintain consistent soil moisture to prevent blossom end rot.",
            "Apply balanced compost to preserve beneficial mycorrhizal rhizosphere."
        ]
    }
}

def get_disease_guidance(disease_name: str) -> dict:
    if disease_name in DISEASE_KNOWLEDGE:
        return DISEASE_KNOWLEDGE[disease_name]
    # Return default generic guidance
    return {
        "scientific_name": "Foliar Plant Pathology",
        "observed_symptoms": [
            "Foliar necrotic lesions",
            "Tissue chlorosis or discoloration"
        ],
        "what_to_do": [
            "Isolate symptomatic foliage and prevent overhead moisture.",
            "Consult local agricultural university or extension officer for field verification."
        ],
        "prevention": [
            "Ensure proper crop rotation and well-drained soil conditions."
        ]
    }
