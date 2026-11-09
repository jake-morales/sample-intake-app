import { alpha, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutlineOutlined'
import ErrorOutline from '@mui/icons-material/ErrorOutlineOutlined'
import type { StepProps } from '../types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchSample } from '../api'

function LookupSample({ onNext }: StepProps) {
  const [sampleId, setSampleId] = useState('')
  const [submittedId, setSubmittedId] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['sample', submittedId],
    queryFn: () => fetchSample(submittedId),
    enabled: Boolean(submittedId), // To avoid running on page load
    retry: 0,
  });

  return (
    <Paper elevation={3} sx={{ p: 4, width: 500, maxWidth: '100%' }}>
      <Stack spacing={2}>
        <Typography variant="h5">Search Samples</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            label="Sample ID"
            size="small"
            fullWidth
            value={sampleId}
            onChange={(event) => setSampleId(event.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ flexShrink: 0 }}
            onClick={() => setSubmittedId(sampleId.trim())}>
              Search
          </Button>
        </Stack>
        {isLoading && <Typography>Loading…</Typography>}
        {isError && (
          <Box sx={{ bgcolor: (theme) => alpha(theme.palette.error.main, 0.08), borderRadius: 2, p: 2 }}>
            <Typography variant="overline" color="error">Error</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <ErrorOutline color="error" fontSize="small" />
              <Typography variant="body2">{error.message}</Typography>
            </Stack>
          </Box>
        )}
        {data && (
          <Box sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06), borderRadius: 2, p: 2 }}>
            <Typography variant="overline" color="text.secondary">Result</Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <CheckCircleOutline color="success" fontSize="small" />
              <Typography variant="h6">{data.name}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'baseline' }}>
              <Typography variant="body2" color="text.secondary">Date of birth: </Typography>
              <Typography variant="body2">{data.date_of_birth}</Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={onNext}>
                Confirm
              </Button>
            </Stack>
          </Box>
        )}
      </Stack>
    </Paper>
  )
}

export default LookupSample
