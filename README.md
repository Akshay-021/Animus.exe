# JanVaani AI

JanVaani AI is an AI-powered agricultural assistant designed to simplify decision-making for farmers by providing localized, practical, and easy-to-understand guidance.

It bridges the gap between complex government schemes, crop issues, and real-world farmer needs through a unified, multilingual platform powered by large language models.

---

## Key Features

* AI-based scheme recommendations tailored to farmer profiles (location, income, land size, etc.)
* LLM-powered explanations in simple, farmer-friendly language
* Crop assistance system (in progress) for disease detection using image and parameters
* Soil health analysis module (in progress)
* Multi-language support (planned across the application)
* Voice-based interaction (planned for accessibility)

---

## Implemented Features

* End-to-end scheme recommendation system
* FastAPI backend with structured routing and services
* Ollama integration using the llama3 model
* JSON parsing and response cleanup utilities
* Basic React frontend for displaying scheme results

---

## In Progress

* Crop disease detection module
* Soil health recommendation system
* Translation and voice interaction features
* Improved frontend UI and user input flows

---

## Tech Stack

### Backend

* Python
* FastAPI
* Pydantic
* Requests
* Ollama (llama3 model)

### Frontend

* React
* Vite
* React Router DOM

### Data

* JSON-based government scheme dataset
* Sample crop data for future model integration

---

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

---

## Backend Overview

The backend is built using FastAPI and starts from `backend/app/main.py`. It enables CORS and registers the following routes:

* `/scheme/` — implemented scheme recommendation endpoint
* `/crop/` — placeholder for crop assistance
* `/soil/` — placeholder for soil analysis
* `/translate/` — placeholder for translation
* `/voice/` — placeholder for voice interaction

### Scheme Recommendation Flow

1. The frontend sends farmer details to `POST /scheme/`
2. Request is validated using a structured schema
3. Scheme data is loaded from a local dataset
4. Schemes are filtered based on farmer location
5. Filtered data is sent to the LLM via Ollama
6. Response is parsed and returned in structured JSON

---

## Frontend Overview

The frontend is a React application built with Vite.

* Routing is handled using React Router
* A basic UI exists for fetching and displaying scheme recommendations
* API calls are managed through a centralized service layer
* Several components and modules are scaffolded for future features

---

## Setup Instructions

### Backend Setup

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

### Ollama Setup

Ensure Ollama is installed and running locally with the required model:

```powershell
ollama run llama3
```

Expected endpoint:

```
http://localhost:11434/api/generate
```

---

### Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## Testing

* `backend/test_llm.py` — tests LLM connectivity
* `backend/test_scheme.py` — tests scheme recommendation flow

Run tests from the backend directory after activating the virtual environment.

---

## Notes

* The scheme recommendation feature is currently the most complete
* Other modules are scaffolded and under development
* Frontend currently uses sample data for testing
* No formal automated testing suite has been implemented yet

---

## Vision

JanVaani AI aims to evolve into a comprehensive digital assistant for farmers, combining AI, local datasets, and multilingual interaction to provide accessible agricultural intelligence at scale.
