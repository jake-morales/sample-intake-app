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
  --workers 4
```

4 workers as an arbitrary starting point.

# Running unit tests

```
cd backend
uv run pytest
```

# Notes

- Initialized git
- initialize project with `uv init`, `uv add flask`
- Project used 3.14, since it was the latest installed python version by uv
- Added gunicorn for production runs, if needed
 