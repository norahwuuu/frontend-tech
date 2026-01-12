import React from 'react'
import { Box, Paper, Typography, Alert, Button } from '@mui/material'
import { Launch } from '@mui/icons-material'

interface LivePreviewProps {
  files: Record<string, string>
  entry: string
  template?: 'react' | 'react-ts' | 'vanilla' | 'vanilla-ts'
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  files,
  entry,
  template = 'react-ts',
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        overflow: 'hidden',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1,
          bgcolor: 'grey.100',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Live Preview
        </Typography>
        <Button
          size="small"
          startIcon={<Launch />}
          href={`https://codesandbox.io/s/new?template=${template}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in CodeSandbox
        </Button>
      </Box>
      <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: 300 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Interactive preview is available. Click "Open in CodeSandbox" to run the demo.
        </Alert>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            <strong>Entry file:</strong>{' '}
            <Box component="code" sx={{ bgcolor: 'grey.200', px: 0.5, borderRadius: 0.5 }}>
              {entry}
            </Box>
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            <strong>Files:</strong> {Object.keys(files).join(', ')}
          </Typography>
        </Box>
        {files[entry] && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Preview of {entry}:
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'grey.50',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                overflow: 'auto',
                maxHeight: 200,
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {files[entry].substring(0, 500)}
                {files[entry].length > 500 && '...'}
              </pre>
            </Paper>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
