# Installing

Requires [uv](https://docs.astral.sh/uv/). From the `backend/` directory:

```
uv sync
```

This creates a virtual environment and installs all dependencies from `uv.lock`.

# Running locally

Starts the flask built-in dev server

```
uv run flask --app app run \
  --debug \
  --host localhost \
  --port 8000
```

Use port 8000 instead of 5000 by default because conflicts with MacOS port 5000 already in use.

# Running in Production

```
uv run gunicorn app:app \
  --bind 0.0.0.0:8000 \
  --workers 1
```

Only use 1 worker, as db.py is in-memory. any changes would be isolated to the 1 worker.

# Running unit tests

```
cd backend
uv run pytest
```

# Database seed data

Users
- Alice Johnson `3f6f3d21-9b9c-4b1a-a4d6-2a1f0e9c8b7a`
- Bob Smith `8c2b5e94-1d4e-4f70-9c3b-5d6e7f8091a2`

# Example curl requests

## GET /api/sample/<sample_id>

```bash
curl http://localhost:8000/api/sample/3f6f3d21-9b9c-4b1a-a4d6-2a1f0e9c8b7a
```

## POST /api/sample/submit

```bash
curl -X POST http://localhost:8000/api/sample/submit \
  -H "Content-Type: application/json" \
  -d '{"sample_id": "3f6f3d21-9b9c-4b1a-a4d6-2a1f0e9c8b7a", "collection_date": "2024-03-01", "notes": "example note"}'
```

# Notes

- Initialized git
- initialize project with `uv init`, `uv add flask`
- Project used 3.14, since it was the latest installed python version by uv
- Added gunicorn for production runs, if needed
 