import { useState } from 'react'
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import type { StepProps } from '../types'
import { submitSample } from '../api'

const DATE_PATTERN = '\\d{4}-\\d{2}-\\d{2}'

function SubmitData({ sampleId }: StepProps) {
  const [collectionDate, setCollectionDate] = useState('')
  const [notes, setNotes] = useState('')

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: () => {
      if (!sampleId) throw new Error('No sample selected')
      return submitSample(sampleId, collectionDate, notes)
    },
  })

  return (
    <Paper elevation={3} sx={{ p: 4, width: 500, maxWidth: '100%' }}>
      <Stack
        spacing={2}
        component="form"
        onSubmit={(event) => { event.preventDefault(); mutate() }}
      >
        <Typography variant="h5">Submit Sample Data</Typography>
        <TextField
          label="Collection date"
          size="small"
          required
          fullWidth
          placeholder="YYYY-MM-DD"
          helperText="Format: YYYY-MM-DD"
          value={collectionDate}
          onChange={(event) => setCollectionDate(event.target.value)}
          slotProps={{ htmlInput: { pattern: DATE_PATTERN, title: 'Format: YYYY-MM-DD' } }}
        />
        <TextField
          label="Notes"
          size="small"
          fullWidth
          multiline
          minRows={3}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          slotProps={{ htmlInput: { style: { resize: 'vertical' } } }}
        />
        {isError && <Alert severity="error">{error.message}</Alert>}
        {isSuccess && <Alert severity="success">Sample data submitted.</Alert>}
        <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" disabled={isPending}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default SubmitData
