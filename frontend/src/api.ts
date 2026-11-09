export async function fetchSample(sampleId: string) {
  const response = await fetch(`/api/sample/${encodeURIComponent(sampleId)}`)
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? 'Unable to look up sample')
  }
  return response.json()
}

export async function submitSample(sampleId: string, collectionDate: string, notes?: string) {
  const response = await fetch('/api/sample/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sample_id: sampleId,
      collection_date: collectionDate,
      notes: notes || undefined,
    }),
  })
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? 'Unable to submit sample')
  }
}
