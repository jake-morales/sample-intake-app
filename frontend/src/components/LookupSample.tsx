import { useState } from 'react'
import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import type { StepProps } from '../types'

function LookupSample({ onNext }: StepProps) {
  const [error, setError] = useState("")

  return (
    <Paper elevation={3} sx={{ p: 4, width: 400 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Sample Intake</Typography>
        <TextField label="Sample ID" />
        <Button variant="contained" onClick={onNext}>Submit</Button>
      </Stack>
    </Paper>
  )
}

export default LookupSample
