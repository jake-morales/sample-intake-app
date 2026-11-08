import { useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function checkHealth() {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/')
      if (!response.ok) throw new Error(`Request failed (${response.status})`)
      const data: { status: string } = await response.json()
      setStatus(`Backend status: ${data.status}`)
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app">
      <button type="button" onClick={checkHealth} disabled={loading}>
        {loading ? 'Checking...' : 'Check backend health'}
      </button>
      {status && <p role="status">{status}</p>}
    </main>
  )
}

export default App
