# Project Progress

Last updated: 28 April 2026

## Completed So Far

### Project Setup

- Created a full-stack project structure for JanVaani AI.
- Added separate `backend`, `frontend`, and `data` directories.
- Created a Python virtual environment in `lol`.
- Installed frontend dependencies for a React + Vite app.
- Added documentation support files such as `file struct.md` and `non_code_files.md`.

### Backend

- Created the FastAPI application entry point in `backend/app/main.py`.
- Enabled CORS for frontend-backend communication.
- Registered route modules for:
  - Scheme recommendations
  - Crop feature
  - Soil feature
  - Translation
  - Voice
- Added configuration in `backend/app/core/config.py` for resolving project and data paths.
- Added request model support for scheme requests using Pydantic.
- Implemented the `/scheme/` API route.
- Implemented scheme loading from `data/schemes/processed_schemes.json`.
- Added scheme filtering by state/location.
- Connected the scheme recommendation flow to a local Ollama model.
- Added prompt templates for:
  - Scheme recommendations
  - Crop analysis
  - Soil analysis
- Added helper logic for extracting and safely loading JSON from LLM responses.
- Added placeholder routes for crop, soil, translation, and voice features.
- Added early crop and soil service functions that prepare prompts and call the LLM.
- Added simple manual backend test scripts:
  - `test_llm.py`
  - `test_scheme.py`

### Data

- Added `data/schemes/processed_schemes.json` for scheme recommendation data.
- Added `data/schemes/raw_schemes.json` as a raw-data placeholder.
- Added `data/samples/crop_images/` for future crop image samples.

### Frontend

- Created a Vite + React app in the `frontend` directory.
- Added React Router setup.
- Added the main React entry files:
  - `src/main.jsx`
  - `src/App.jsx`
  - `src/routes/AppRoutes.jsx`
- Built a basic `SchemeResult.jsx` page.
- Connected the frontend to the backend scheme API through `src/services/api.js`.
- Added basic loading, error, and result rendering states for scheme recommendations.
- Created placeholder frontend folders and files for future features:
  - Assistant UI
  - Common UI components
  - Text and image input
  - Crop, soil, and scheme result cards
  - Voice controls
  - App context
  - Custom hooks
  - Translation and voice services
  - Utility helpers

### Documentation

- Filled the main `README.md` with:
  - Project overview
  - Current features
  - Tech stack
  - Project structure
  - Backend overview
  - Frontend overview
  - Setup instructions
  - API details
  - Current notes
- Created this `progress.md` file to track what has been completed and what is pending.

## Current Working State

- The scheme recommendation flow is the main working feature.
- The frontend can call `POST /scheme/` and display returned schemes.
- The backend expects Ollama to be running locally with the `llama3` model.
- Crop, soil, translation, and voice features are scaffolded but not fully implemented.
- Many frontend components are intentionally empty placeholders for future UI work.

## Pending Work

- Add a proper farmer input form instead of hardcoded scheme request data.
- Improve the scheme result UI and move display logic into reusable cards.
- Add request and response models for crop, soil, translation, and voice APIs.
- Wire crop and soil routes to their existing service functions.
- Implement image upload and image analysis flow for crop/soil features.
- Implement translation service logic.
- Implement voice input/output support.
- Add environment-based configuration for backend URL, Ollama URL, and model name.
- Add proper error handling for cases where Ollama is not running.
- Add backend dependencies file such as `requirements.txt`.
- Add automated tests for API routes and service functions.
- Add frontend styling and complete the placeholder components.
- Add production build and deployment instructions.

## Suggested Next Step

Build the farmer input form for scheme recommendations and replace the hardcoded payload in `SchemeResult.jsx`.
