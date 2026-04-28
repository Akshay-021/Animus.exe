# JanVaani AI - File Structure

```
JanVaani AI/
├── README.md
├── file struct.md
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── models/
│   │   │   ├── request_models.py
│   │   │   └── response_models.py
│   │   ├── routes/
│   │   │   ├── crop.py
│   │   │   ├── scheme.py
│   │   │   ├── soil.py
│   │   │   ├── translate.py
│   │   │   └── voice.py
│   │   ├── services/
│   │   │   ├── crop_service.py
│   │   │   ├── iamge_service.py
│   │   │   ├── ollama_service.py
│   │   │   ├── scheme_service.py
│   │   │   ├── soil_service.py
│   │   │   ├── translation_service.py
│   │   │   └── weather_service.py
│   │   └── utils/
│   │       ├── helpers.py
│   │       └── logger.py
│   └── cache/
├── data/
│   ├── samples/
│   │   └── crop_images/
│   └── schemes/
│       ├── processed_schemes.json
│       └── raw_schemes.json
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── assistant/
        │   │   ├── ChatWindow.jsx
        │   │   ├── MessageBubble.jsx
        │   │   └── SuggestionChips.jsx
        │   ├── common/
        │   │   ├── LanguageSelector.jsx
        │   │   ├── Loader.jsx
        │   │   └── NavBar.jsx
        │   ├── input/
        │   │   ├── ImageUpload.jsx
        │   │   └── TextInput.jsx
        │   ├── results/
        │   │   ├── CropCard.jsx
        │   │   ├── SchemeCard.jsx
        │   │   └── SoilCard.jsx
        │   └── voice/
        │       ├── AudioPlayer.jsx
        │       └── VoiceButton.jsx
        ├── context/
        │   ├── AppContext.jsx
        │   └── AssistantContext.jsx
        ├── hooks/
        │   ├── useAssistant.js
        │   └── useVoice.js
        ├── pages/
        │   ├── Assistant.jsx
        │   ├── CropResult.jsx
        │   ├── Home.jsx
        │   ├── SchemeResult.jsx
        │   └── SoilResult.jsx
        ├── routes/
        │   └── AppRoutes.jsx
        ├── services/
        │   ├── api.js
        │   ├── assistant.js
        │   ├── translate.js
        │   └── voice.js
        └── utils/
            ├── constants.js
            └── helpers.js
```

## Project Overview

**JanVaani AI** is a full-stack agricultural AI application with the following structure:

### Backend (Python)
- **app/**: Application entry point
- **core/**: Configuration settings
- **models/**: Request and response data models
- **routes/**: API endpoints for crop, soil, schemes, translation, and voice
- **services/**: Business logic for crop detection, Ollama integration, schemes, soil analysis, translation, and weather
- **utils/**: Helper functions and logging

### Data
- **samples/**: Sample crop images for training/testing
- **schemes/**: JSON files containing agricultural schemes data

### Frontend (React + Vite)
- **components/**: Reusable UI components organized by feature (assistant, common, input, results, voice)
- **context/**: React context for global state management
- **hooks/**: Custom React hooks for assistant and voice functionality
- **pages/**: Page-level components
- **routes/**: Routing configuration
- **services/**: API calls, assistant logic, translation, and voice services
- **utils/**: Constants and helper utilities
