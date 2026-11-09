
import { useState } from 'react'
import './App.css'
import { Box } from '@mui/material'
import LookupSample from './components/LookupSample'
import SubmitData from './components/SubmitData'

const steps = {
  0: LookupSample,
  1: SubmitData
}

function App() {
  const [step, setStep] = useState(0)
  const [sampleId, setSampleId] = useState<string>()
  const StepComponent = steps[step as keyof typeof steps]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'grey.200',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <StepComponent sampleId={sampleId} onNext={(id) => { setSampleId(id); setStep(step+1) }} /> 
    </Box>
  )
}

export default App
