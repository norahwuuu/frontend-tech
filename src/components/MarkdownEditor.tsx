/**
 * MarkdownEditor - Markdown 编辑组件
 * 支持实时预览和保存前 Zod 校验
 */

import React, { useState, useCallback } from 'react'
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
  Tabs,
  Tab,
  Stack,
  Tooltip,
} from '@mui/material'
import { Save, Preview, Code, CheckCircle, Error as ErrorIcon } from '@mui/icons-material'
import { MarkdownViewer } from '@/ui/blocks/MarkdownViewer'
import { parseMarkdownToScene, validateMarkdownFormat, MarkdownParseError } from '@/utils/markdown'
import { type Scene } from '@/schemas'

interface MarkdownEditorProps {
  /**
   * 初始 Markdown 内容
   */
  initialContent?: string
  /**
   * 保存回调
   */
  onSave?: (scene: Scene) => void
  /**
   * 取消回调
   */
  onCancel?: () => void
  /**
   * 是否显示保存按钮
   * @default true
   */
  showSave?: boolean
}

/**
 * Markdown 编辑器组件
 * 支持编辑、实时预览、保存前校验
 * 
 * @example
 * ```tsx
 * <MarkdownEditor
 *   initialContent="# Scene: My Scene\n## Context\n..."
 *   onSave={(scene) => {
 *     // Save scene
 *   }}
 * />
 * ```
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialContent = '',
  onSave,
  onCancel,
  showSave = true,
}) => {
  const [content, setContent] = useState(initialContent)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [parseError, setParseError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)

  // 实时验证
  const validateContent = useCallback((markdown: string) => {
    // 格式验证
    const formatValidation = validateMarkdownFormat(markdown)
    setValidationErrors(formatValidation.errors)

    // 尝试解析验证
    if (formatValidation.valid) {
      try {
        parseMarkdownToScene(markdown)
        setParseError(null)
        setIsValid(true)
      } catch (error) {
        if (error instanceof MarkdownParseError) {
          setParseError(error.message)
          setIsValid(false)
        } else {
          setParseError(error instanceof Error ? error.message : 'Unknown error')
          setIsValid(false)
        }
      }
    } else {
      setIsValid(false)
      setParseError(null)
    }
  }, [])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    validateContent(newContent)
  }

  const handleSave = () => {
    if (!isValid || !onSave) return

    try {
      const scene = parseMarkdownToScene(content)
      onSave(scene)
    } catch (error) {
      console.error('Failed to save scene:', error)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Markdown Editor
        </Typography>
        <Stack direction="row" spacing={1}>
          {isValid && (
            <Tooltip title="Valid Markdown">
              <CheckCircle color="success" />
            </Tooltip>
          )}
          {parseError && (
            <Tooltip title={parseError}>
              <ErrorIcon color="error" />
            </Tooltip>
          )}
          {showSave && (
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              disabled={!isValid}
            >
              Save
            </Button>
          )}
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Stack>
      </Box>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Format Validation Errors:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {validationErrors.map((error, index) => (
              <li key={index}>
                <Typography variant="body2">{error}</Typography>
              </li>
            ))}
          </ul>
        </Alert>
      )}

      {/* Parse Error */}
      {parseError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Parse Error:
          </Typography>
          <Typography variant="body2">{parseError}</Typography>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
        <Tab
          label="Edit"
          value="edit"
          icon={<Code />}
          iconPosition="start"
        />
        <Tab
          label="Preview"
          value="preview"
          icon={<Preview />}
          iconPosition="start"
        />
      </Tabs>

      {/* Content */}
      {activeTab === 'edit' ? (
        <TextField
          fullWidth
          multiline
          rows={20}
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={`# Scene: Scene Title

---
category: Category
tags: ["tag1", "tag2"]
---

## Context
Scene context description...

## Solution: Solution Name
### Problem
Problem description...

### Approach
Solution approach...

### Key Points
- Point 1: Description
- Point 2: Description

### Code Demo
\`\`\`tsx
// Code example
\`\`\``}
          sx={{
            '& .MuiInputBase-root': {
              fontFamily: 'monospace',
              fontSize: '0.875rem',
            },
          }}
        />
      ) : (
        <Box sx={{ minHeight: 400, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
          {content ? (
            <MarkdownViewer content={content} />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No content to preview
            </Typography>
          )}
        </Box>
      )}

      {/* Help Text */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          💡 Tip: The editor validates Markdown format in real-time. Save is only enabled when the content is valid.
        </Typography>
      </Box>
    </Paper>
  )
}
