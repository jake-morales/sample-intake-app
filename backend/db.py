from dataclasses import dataclass, field
from uuid import UUID, uuid4
from datetime import date

@dataclass
class Sample:
    name: str
    date_of_birth: date
    collection_date: date
    notes: str | None = None
    id: UUID = field(default_factory=uuid4)


samples: list[Sample] = [
    Sample(name="Alice Johnson", date_of_birth=date(1990, 4, 1), collection_date=date(2024, 1, 15), id=UUID("3f6f3d21-9b9c-4b1a-a4d6-2a1f0e9c8b7a")),
    Sample(name="Bob Smith", date_of_birth=date(1985, 11, 23), collection_date=date(2024, 2, 3), id=UUID("8c2b5e94-1d4e-4f70-9c3b-5d6e7f8091a2")),
]

class SampleNotFoundError(Exception):
    pass

def get_sample(sample_id: UUID) -> Sample:
    for s in samples:
        if s.id == sample_id:
            return s
    raise SampleNotFoundError(f"Sample {sample_id} not found")

def add_sample(sample: Sample) -> Sample:
    samples.append(sample)
    return sample

def update_sample(sample: Sample) -> Sample:
    for i, s in enumerate(samples):
        if s.id == sample.id:
            samples[i] = sample
            return sample
    raise SampleNotFoundError(f"Sample {sample.id} not found")

