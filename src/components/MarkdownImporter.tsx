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

interface MarkdownImporterProps {
  onImport: (scene: Scene) => void
  onCancel?: () => void
}

export const MarkdownImporter: React.FC<MarkdownImporterProps> = ({ onImport, onCancel }) => {
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
        setError(`解析错误 (第 ${err.line} 行): ${err.message}`)
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('未知错误')
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
        导入 Markdown
      </Button>

      <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
        <DialogTitle>导入 Markdown 场景</DialogTitle>
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
                选择 Markdown 文件
              </Button>
            </label>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={15}
            label="Markdown 内容"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder={`# Scene: 场景标题

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
\`\`\``}
            sx={{ mb: 2 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Typography variant="caption" color="text.secondary">
            支持的格式：Scene 标题、Context、Solution（Problem/Approach/Key Points/Code Demo）
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>取消</Button>
          <Button
            onClick={handleImport}
            variant="contained"
            disabled={!markdown.trim()}
          >
            导入
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
