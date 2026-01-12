/**
 * MarkdownExporter - Markdown 导出组件
 * 支持单个或多个 Scene 导出为 Markdown 文件
 */

import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Alert,
} from '@mui/material'
import { Download, FileDownload } from '@mui/icons-material'
import { exportScenesToMarkdown, downloadMarkdown } from '@/utils/markdown'
import { type Scene } from '@/schemas'

interface MarkdownExporterProps {
  /**
   * 要导出的场景
   */
  scenes: Scene[]
  /**
   * 是否显示导出按钮
   * @default true
   */
  showButton?: boolean
  /**
   * 按钮文本
   * @default "Export Markdown"
   */
  buttonText?: string
}

/**
 * Markdown 导出组件
 * 
 * @example
 * ```tsx
 * <MarkdownExporter
 *   scenes={[scene1, scene2]}
 *   showButton={true}
 * />
 * ```
 */
export const MarkdownExporter: React.FC<MarkdownExporterProps> = ({
  scenes,
  showButton = true,
  buttonText = 'Export Markdown',
}) => {
  const [open, setOpen] = useState(false)
  const [filename, setFilename] = useState('')
  const [exportAll, setExportAll] = useState(false)
  const [selectedScenes, setSelectedScenes] = useState<Set<string>>(new Set())

  const handleOpen = () => {
    setOpen(true)
    if (scenes.length === 1) {
      setFilename(scenes[0].id)
      setSelectedScenes(new Set([scenes[0].id]))
    } else {
      setFilename('scenes')
      setSelectedScenes(new Set())
    }
  }

  const handleClose = () => {
    setOpen(false)
    setFilename('')
    setSelectedScenes(new Set())
  }

  const handleExport = () => {
    let content = ''
    let finalFilename = filename || 'scene'

    if (exportAll || scenes.length === 1) {
      // 导出所有场景
      content = exportScenesToMarkdown(scenes)
      finalFilename = filename || 'scenes'
    } else {
      // 导出选中的场景
      const scenesToExport = scenes.filter(s => selectedScenes.has(s.id))
      if (scenesToExport.length === 0) {
        return
      }
      content = exportScenesToMarkdown(scenesToExport)
      finalFilename = filename || `scenes-${scenesToExport.length}`
    }

    // 确保文件名以 .md 结尾
    if (!finalFilename.endsWith('.md')) {
      finalFilename += '.md'
    }

    downloadMarkdown(content, finalFilename)
    handleClose()
  }

  const toggleScene = (sceneId: string) => {
    const newSelected = new Set(selectedScenes)
    if (newSelected.has(sceneId)) {
      newSelected.delete(sceneId)
    } else {
      newSelected.add(sceneId)
    }
    setSelectedScenes(newSelected)
  }

  if (!showButton) {
    return null
  }

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Download />}
        onClick={handleOpen}
      >
        {buttonText}
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Export to Markdown</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Filename */}
            <TextField
              fullWidth
              label="Filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="scene"
              helperText="File will be saved as [filename].md"
            />

            {/* Multiple scenes selection */}
            {scenes.length > 1 && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportAll}
                      onChange={(e) => {
                        setExportAll(e.target.checked)
                        if (e.target.checked) {
                          setSelectedScenes(new Set(scenes.map(s => s.id)))
                        } else {
                          setSelectedScenes(new Set())
                        }
                      }}
                    />
                  }
                  label="Export all scenes"
                />

                {!exportAll && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Select scenes to export:
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 1, maxHeight: 200, overflow: 'auto' }}>
                      {scenes.map((scene) => (
                        <FormControlLabel
                          key={scene.id}
                          control={
                            <Checkbox
                              checked={selectedScenes.has(scene.id)}
                              onChange={() => toggleScene(scene.id)}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2">{scene.title}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {scene.category} • {scene.solutions.length} solution(s)
                              </Typography>
                            </Box>
                          }
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </>
            )}

            {/* Single scene info */}
            {scenes.length === 1 && (
              <Alert severity="info">
                <Typography variant="body2">
                  Exporting: <strong>{scenes[0].title}</strong>
                </Typography>
              </Alert>
            )}

            {/* Export info */}
            <Alert severity="success">
              <Typography variant="body2">
                The exported Markdown file can be:
                <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                  <li>Committed to Git for version control</li>
                  <li>Shared with others</li>
                  <li>Imported back into the system</li>
                </ul>
              </Typography>
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExport}
            disabled={!exportAll && selectedScenes.size === 0}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
