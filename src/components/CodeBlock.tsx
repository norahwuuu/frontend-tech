import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography, Paper } from '@mui/material'
import { ContentCopy, Check } from '@mui/icons-material'
import { createHighlighter } from 'shiki'

interface CodeBlockProps {
  code: string
  language: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const highlight = async () => {
      try {
        const highlighter = await createHighlighter({
          themes: ['github-light'],
          langs: [language as any],
        })
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-light',
        })
        setHighlightedCode(html)
      } catch (error) {
        // Fallback to plain code if highlighting fails
        setHighlightedCode(`<pre><code>${code}</code></pre>`)
      }
    }

    highlight()
  }, [code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          bgcolor: 'grey.100',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {language}
        </Typography>
        <IconButton size="small" onClick={handleCopy} aria-label="Copy code">
          {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
        </IconButton>
      </Box>
      <Box
        sx={{
          overflow: 'auto',
          p: 2,
          bgcolor: '#f6f8fa',
          '& pre': {
            margin: 0,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: '#24292e',
          },
          '& code': {
            fontFamily: 'monospace',
          },
        }}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </Paper>
  )
}
