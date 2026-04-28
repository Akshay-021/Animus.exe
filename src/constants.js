export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
]

export const INTENTS = {
  DISEASE: 'disease_detection',
  CROP: 'crop_recommendation',
  SOIL: 'soil_advice',
  SCHEME: 'scheme_help',
  GENERAL: 'general_farming',
}

export const INTENT_META = {
  [INTENTS.DISEASE]: {
    label: 'Disease Detection',
    icon: '🔬',
    color: 'clay',
    description: 'Detect crop diseases from images or symptoms',
  },
  [INTENTS.CROP]: {
    label: 'Crop Advice',
    icon: '🌱',
    color: 'forest',
    description: 'Get recommendations for crops and cultivation',
  },
  [INTENTS.SOIL]: {
    label: 'Soil Analysis',
    icon: '🧪',
    color: 'earth',
    description: 'Understand your soil and get fertilizer advice',
  },
  [INTENTS.SCHEME]: {
    label: 'Govt Schemes',
    icon: '📋',
    color: 'sky',
    description: 'Find government schemes and subsidies',
  },
  [INTENTS.GENERAL]: {
    label: 'Farming Advice',
    icon: '🌾',
    color: 'stone',
    description: 'General farming tips and guidance',
  },
}

export const SUGGESTION_CHIPS = [
  { text: 'My tomato leaves have yellow spots', intent: INTENTS.DISEASE },
  { text: 'Best crop for kharif season', intent: INTENTS.CROP },
  { text: 'Soil test shows low nitrogen', intent: INTENTS.SOIL },
  { text: 'PM Kisan scheme eligibility', intent: INTENTS.SCHEME },
  { text: 'When to irrigate wheat crop', intent: INTENTS.GENERAL },
  { text: 'Pest control for cotton', intent: INTENTS.DISEASE },
]
