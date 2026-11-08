from datetime import date
from uuid import UUID, uuid4

import pytest

import db
from app import app

ALICE_ID = UUID("3f6f3d21-9b9c-4b1a-a4d6-2a1f0e9c8b7a")

# Use flask's built-in test client for extra debugging information
@pytest.fixture
def client():
    app.config["TESTING"] = True
    return app.test_client()

# Reset the samples after each test, to avoid state leaking
@pytest.fixture(autouse=True)
def restore_samples():
    original = db.samples[:]
    yield
    db.samples[:] = original


# ============================================================
# Tests for GET /health endpoint
# ============================================================

def test_health(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.get_json() == {"status": "ok"}


# ============================================================
# Tests for GET /api/sample/<sample_id> endpoint
# ============================================================

def test_get_sample(client):
    res = client.get(f"/api/sample/{ALICE_ID}")
    assert res.status_code == 200
    assert res.get_json() == {"name": "Alice Johnson", "date_of_birth": "1990-04-01"}


def test_get_sample_invalid_id(client):
    res = client.get("/api/sample/not-a-uuid")
    assert res.status_code == 400
    assert res.get_json()["error"] == "sample_id is invalid"


def test_get_sample_not_found(client):
    missing = uuid4()
    res = client.get(f"/api/sample/{missing}")
    assert res.status_code == 404
    assert res.get_json() == {"error": f"Sample {missing} not found"}


# ============================================================
# Tests for POST /api/sample/submit endpoint
# ============================================================

def test_submit_sample_updates_record(client):
    res = client.post("/api/sample/submit", json={
        "sample_id": str(ALICE_ID),
        "collection_date": "2024-03-01",
        "notes": "updated notes",
    })
    assert res.status_code == 200

    s = db.get_sample(ALICE_ID)
    assert s.name == "Alice Johnson"
    assert s.collection_date == date(2024, 3, 1)
    assert s.notes == "updated notes"

def test_submit_sample_missing_payload(client):
    res = client.post("/api/sample/submit")
    assert res.status_code == 400
    assert res.get_json() == {"error": "Missing payload"}


def test_submit_sample_invalid_json(client):
    res = client.post("/api/sample/submit", data="{not json", content_type="application/json")
    assert res.status_code == 400
    assert res.get_json() == {"error": "Invalid JSON"}


def test_submit_sample_missing_collection_date(client):
    res = client.post("/api/sample/submit", json={"sample_id": str(ALICE_ID)})
    assert res.status_code == 400
    assert res.get_json()["error"] == "Invalid data in payload"


def test_submit_sample_not_found(client):
    missing = uuid4()
    res = client.post("/api/sample/submit", json={
        "sample_id": str(missing),
        "collection_date": "2024-03-01",
        "notes": "updated notes",
    })
    assert res.status_code == 404
    assert res.get_json() == {"error": f"Sample {missing} not found"}
