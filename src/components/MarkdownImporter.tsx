/**
 * MarkdownImporter - Markdown 导入组件
 * 支持将 Markdown 文件导入为 Scene
 */

import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Upload, FileUpload } from '@mui/icons-material'
import { parseMarkdownToScene, MarkdownParseError } from '@/utils/markdown'
import { type Scene } from '@/schemas'
import { useLanguage } from '@/hooks/useLanguage'

interface MarkdownImporterProps {
  onImport: (scene: Scene) => void
  onCancel?: () => void
}

export const MarkdownImporter: React.FC<MarkdownImporterProps> = ({ onImport, onCancel }) => {
  const { t, language } = useLanguage()
  const [markdown, setMarkdown] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setMarkdown(content)
    }
    reader.readAsText(file)
  }

  const handleImport = () => {
    try {
      setError(null)
      const scene = parseMarkdownToScene(markdown)
      onImport(scene)
      setMarkdown('')
      setOpen(false)
    } catch (err) {
      if (err instanceof MarkdownParseError) {
        setError(language === 'zh' 
          ? `解析错误 (第 ${err.line} 行): ${err.message}`
          : `Parse error (line ${err.line}): ${err.message}`)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(t.validation.unknownError)
      }
    }
  }

  const handleCancel = () => {
    setMarkdown('')
    setError(null)
    setOpen(false)
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Upload />}
        onClick={() => setOpen(true)}
      >
        {t.markdown.importMarkdown}
      </Button>

      <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>{t.markdown.importMarkdownScene}</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <input
              accept=".md,.markdown"
              style={{ display: 'none' }}
              id="markdown-file-upload"
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="markdown-file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<FileUpload />}
                fullWidth
              >
                {t.markdown.selectMarkdownFile}
              </Button>
            </label>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={15}
            label={t.markdown.markdownContent}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder={language === 'zh' ? `# Scene: 场景标题

## Context
场景背景描述...

## Solution: 方案名称
### Problem
问题描述...

### Approach
解决思路...

### Key Points
- 要点1: 描述
- 要点2: 描述

### Code Demo
\`\`\`tsx
// 代码示例
\`\`\`` : `# Scene: Scene Title

## Context
Scene context description...

## Solution: Solution Name
### Problem
Problem description...

### Approach
Approach description...

### Key Points
- Point 1: Description
- Point 2: Description

### Code Demo
\`\`\`tsx
// Code example
\`\`\``}
            sx={{ mb: 2 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {t.markdown.importError}:
              </Typography>
              <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {error}
              </Typography>
            </Alert>
          )}

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="caption" component="div">
              <strong>{t.markdown.supportedFormat}:</strong>
              <br />
              # Scene: [Title]
              <br />
              ---
              <br />
              category: [Category]
              <br />
              tags: ["tag1", "tag2"]
              <br />
              ---
              <br />
              ## Context
              <br />
              [Context description]
              <br />
              <br />
              ## Solution: [Name]
              <br />
              ### Problem
              <br />
              [Problem description]
              <br />
              <br />
              ### Approach
              <br />
              [Approach description]
              <br />
              <br />
              ### Key Points
              <br />
              - [Point 1]: [Description]
              <br />
              - [Point 2]: [Description]
              <br />
              <br />
              ### Code Demo
              <br />
              ```tsx
              <br />
              [Code example]
              <br />
              ```
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t.markdown.cancel}</Button>
          <Button
            onClick={handleImport}
            variant="contained"
            disabled={!markdown.trim()}
          >
            {t.markdown.import}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
