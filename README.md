# JanVaani AI

JanVaani AI is a full-stack agricultural assistance project focused on helping farmers get simple, practical recommendations for government schemes, crop issues, soil health, translation, and voice-based access.

The project currently has a FastAPI backend, a React + Vite frontend, local data files for scheme recommendations, and an Ollama-powered LLM service for generating farmer-friendly advice.

## Current Features

- Scheme recommendation API using farmer details such as location, income, land size, gender, and need.
- Local agricultural scheme data stored in `data/schemes/processed_schemes.json`.
- Ollama integration through the local endpoint `http://localhost:11434/api/generate`.
- Prompt templates for scheme, crop, and soil guidance.
- JSON cleanup helper to parse LLM responses safely.
- React frontend scaffold with routing.
- Basic frontend page for fetching and displaying scheme recommendations.
- Placeholder backend routes for crop, soil, translation, and voice features.
- Placeholder frontend folders for assistant, input, result cards, voice, context, hooks, and services.

## Tech Stack

### Backend

- Python
- FastAPI
- Pydantic
- Requests
- Ollama with the `llama3` model

### Frontend

- React
- Vite
- React Router DOM

### Data

- JSON-based scheme data
- Sample crop image folder for future crop analysis work

## Project Structure

```text
JanVaani AI/
├── README.md
├── progress.md
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── test_llm.py
│   └── test_scheme.py
├── data/
│   ├── samples/
│   └── schemes/
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        ├── routes/
        ├── services/
        └── utils/
```

## Backend Overview

The backend starts from `backend/app/main.py`. It creates a FastAPI app, enables CORS, and registers these routers:

- `/scheme/` - implemented scheme recommendation endpoint.
- `/crop/` - placeholder endpoint for crop feature.
- `/soil/` - placeholder endpoint for soil feature.
- `/translate/` - placeholder endpoint for translation feature.
- `/voice/` - placeholder endpoint for voice feature.

### Scheme Recommendation Flow

1. Frontend sends farmer details to `POST /scheme/`.
2. `SchemeRequest` validates the request body.
3. `scheme_service.py` loads `processed_schemes.json`.
4. Schemes are filtered by farmer location.
5. The first matching schemes are sent to Ollama with a structured prompt.
6. The LLM response is parsed as JSON and returned to the frontend.

Expected request body:

```json
{
  "location": "Karnataka",
  "income": "low",
  "land": "small",
  "gender": "male",
  "need": "financial support"
}
```

Expected response shape:

```json
{
  "schemes": [
    {
      "name": "",
      "reason": "",
      "benefits": "",
      "steps": ""
    }
  ]
}
```

## Frontend Overview

The frontend is a Vite React app.

- `src/main.jsx` mounts the React app.
- `src/App.jsx` loads the route configuration.
- `src/routes/AppRoutes.jsx` maps `/` to `SchemeResult`.
- `src/pages/SchemeResult.jsx` contains a simple test UI for fetching scheme recommendations.
- `src/services/api.js` contains the `fetchSchemes` API call to the FastAPI backend.

Many frontend files are currently placeholders and are ready for future implementation.

## Setup

### 1. Backend

From the project root:

```powershell
cd backend
..\lol\Scripts\activate
uvicorn app.main:app --reload
```

The API should run at:

```text
http://127.0.0.1:8000
```

FastAPI docs should be available at:

```text
http://127.0.0.1:8000/docs
```

### 2. Ollama

Make sure Ollama is installed, running locally, and has the `llama3` model available:

```powershell
ollama run llama3
```

The backend expects Ollama at:

```text
http://localhost:11434/api/generate
```

### 3. Frontend

From the project root:

```powershell
cd frontend
npm install
npm run dev
```

The frontend should run on the Vite development server, usually:

```text
http://localhost:5173
```

## Test Scripts

The backend has simple manual test scripts:

- `backend/test_llm.py` checks the Ollama service.
- `backend/test_scheme.py` checks the scheme recommendation flow with dummy farmer data.

Run them from the `backend` directory after activating the Python environment.

## Notes

- `README.md` was previously empty and is now filled with project documentation.
- The scheme feature is the most complete feature at this stage.
- Crop, soil, translation, and voice routes exist but still need full request models, service integration, and frontend UI.
- The frontend currently uses hardcoded sample farmer data in `SchemeResult.jsx`.
- There is no formal test suite yet; current tests are manual scripts.
