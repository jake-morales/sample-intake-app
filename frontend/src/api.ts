export async function fetchSample(sampleId: string) {
  const response = await fetch(`/api/sample/${encodeURIComponent(sampleId)}`)
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? 'Unable to look up sample')
  }
  return response.json()
}
