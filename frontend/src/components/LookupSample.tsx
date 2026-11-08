import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import type { StepProps } from '../types'
import { useQuery } from '@tanstack/react-query'

const fetchAlice = async () => {
  const response = await fetch('/api/sample/3f6f3d21-9b9c-4b1a-a4d6-2a1f0e9c8b7a')
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function LookupSample({ onNext }: StepProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['health'],
    queryFn: fetchAlice,
  });

  return (
    <Paper elevation={3} sx={{ p: 4, width: 400 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Sample Intake</Typography>
        <TextField label="Sample ID" />
        <Button variant="contained" onClick={onNext}>Submit</Button>
        <Typography variant="h5">Response</Typography>
        {isLoading && <Typography>Loading…</Typography>}
        {isError && <Typography color="error">{error.message}</Typography>}
        {data && <Typography>{JSON.stringify(data)}</Typography>}
      </Stack>
    </Paper>
  )
}

export default LookupSample
