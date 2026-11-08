from flask import Flask, jsonify, request
import db
from uuid import UUID
from pydantic import BaseModel, ValidationError, UUID4
from datetime import date

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify({"status": "ok"})

@app.get("/api/sample/<sample_id>")
def get_sample(sample_id):
    # Validate request
    try:
        data = GetSampleRequest.model_validate({"sample_id": sample_id})
    except ValidationError as e:
        return jsonify({"error": "sample_id is invalid", "validation_errors": [err["msg"] for err in e.errors()]}), 400

    # Get sample
    try:
        s = db.get_sample(data.sample_id)
    except db.SampleNotFoundError:
        return jsonify({"error": f"Sample {data.sample_id} not found"}), 404

    # Return Sample data
    return jsonify({
        "name": s.name,
        "date_of_birth": s.date_of_birth.isoformat()
    }), 200

# Notes to self
# - This could be simplified to "POST /api/sample/reading" for clarity
# - We're creating a reading rather than creating/"submitting" a new sample

@app.post("/api/sample/submit")
def submit_sample():
    # Validate Request
    if not request.data:
        return jsonify({"error": "Missing payload"}), 400
    
    payload = request.get_json(silent=True)
    if payload is None:
        return jsonify({"error": "Invalid JSON"}), 400
    
    try:
        data = SubmitSampleRequest.model_validate(payload)
    except ValidationError as e:
        return jsonify({"error": "Invalid data in payload", "validation_errors": [err["msg"] for err in e.errors()]}), 400

    # Save data, if sample exists
    sample = db.Sample(
        id=data.sample_id,
        name=data.name,
        date_of_birth=data.date_of_birth,
        collection_date=data.collection_date,
        notes=data.notes
    )
    try:
        db.update_sample(sample)
    except db.SampleNotFoundError:
        return jsonify({"error": f"Sample {data.sample_id} not found"}), 404
    
    return jsonify({}),200

class GetSampleRequest(BaseModel):
    sample_id: UUID4

class SubmitSampleRequest(BaseModel):
    sample_id: UUID
    name: str
    date_of_birth: date
    collection_date: date
    notes: str | None = None # "= None" makes it omitable
