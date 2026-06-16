# ScribeMind

ScribeMind is a document-to-chat app in progress.
The goal is to let users upload files, process and index their content, and then ask natural-language questions against that content.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI + CORS
- Planned AI/RAG stack: OpenAI, ChromaDB, Hugging Face embeddings

## Current Status

- Frontend is set up with a minimal React + TypeScript starter.
- Backend is set up with FastAPI and a health endpoint.
- Health endpoint: `GET /api/health`

## Project Structure

```text
scribemind/
	backend/
		app/
			main.py
		requirements.txt
	frontend/
		src/
		package.json
```

## Prerequisites

- Node.js 20+ and npm
- Python 3.10+

## Backend Setup And Run

From the repo root:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend will be available at:

- API: `http://localhost:8000`
- Health check: `http://localhost:8000/api/health`

## Frontend Setup And Run

Open a second terminal from the repo root:

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at:

- App: `http://localhost:5173`

## Build Commands

- Frontend production build:

```bash
cd frontend
npm run build
```

- Backend currently runs directly via Uvicorn for development.

## Notes

- CORS is configured in the backend to allow requests from `http://localhost:5173`.
- Keep backend and frontend running in separate terminals during development.
