import React from 'react'
import { Box, Paper, Typography, Button, Alert } from '@mui/material'
import { Launch, Code } from '@mui/icons-material'

interface LiveDemoProps {
  demoUrl?: string
  title?: string
  description?: string
}

export const LiveDemo: React.FC<LiveDemoProps> = ({
  demoUrl,
  title = 'Live Demo',
  description,
}) => {
  if (!demoUrl) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="info">
          Demo is not available for this project.
        </Alert>
      </Paper>
    )
  }

  // Static stage: Embed iframe for pre-built demos
  // In advanced stage, this could use Sandpack for dynamic demos
  const isExternalUrl = demoUrl.startsWith('http')

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
          py: 1.5,
          bgcolor: 'grey.100',
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {title}
          </Typography>
          {description && (
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
        {isExternalUrl && (
          <Button
            size="small"
            startIcon={<Launch />}
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
          >
            Open Demo
          </Button>
        )}
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: 400,
          bgcolor: 'background.default',
        }}
      >
        {isExternalUrl ? (
          <Box
            component="iframe"
            src={demoUrl}
            sx={{
              width: '100%',
              height: 500,
              border: 'none',
            }}
            title={title}
          />
        ) : (
          <Box
            sx={{
              p: 4,
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            <Code sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
            <Typography variant="body1" gutterBottom>
              Demo Preview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {demoUrl}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Launch />}
              href={demoUrl}
              target="_blank"
              sx={{ mt: 2 }}
            >
              Open Demo
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
