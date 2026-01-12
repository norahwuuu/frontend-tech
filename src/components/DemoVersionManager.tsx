/**
 * DemoVersionManager - Demo 版本管理和对比组件
 * 支持查看历史版本、对比不同版本
 */

import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Divider,
} from '@mui/material'
import { Compare, Delete, Restore } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import { type GeneratedDemo } from '@/utils/demoGenerator'
import { CodeBlock } from './CodeBlock'

interface DemoVersionManagerProps {
  versions: GeneratedDemo[]
  currentVersion: GeneratedDemo
  onSelectVersion: (version: GeneratedDemo) => void
  onDeleteVersion?: (versionId: string) => void
  onRestoreVersion?: (version: GeneratedDemo) => void
}

/**
 * Demo 版本管理器
 */
export const DemoVersionManager: React.FC<DemoVersionManagerProps> = ({
  versions,
  currentVersion,
  onSelectVersion,
  onDeleteVersion,
  onRestoreVersion,
}) => {
  const [compareDialogOpen, setCompareDialogOpen] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<GeneratedDemo | null>(null)

  const handleCompare = (version: GeneratedDemo) => {
    setSelectedVersion(version)
    setCompareDialogOpen(true)
  }

  const sortedVersions = [...versions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Version History
        </Typography>
        <Chip label={`${versions.length} versions`} size="small" />
      </Box>

      <List>
        {sortedVersions.map((version, index) => (
          <React.Fragment key={version.id}>
            <ListItem
              secondaryAction={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {version.id !== currentVersion.id && (
                    <>
                      <Tooltip title="Compare">
                        <IconButton
                          size="small"
                          onClick={() => handleCompare(version)}
                        >
                          <Compare fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {onRestoreVersion && (
                        <Tooltip title="Restore">
                          <IconButton
                            size="small"
                            onClick={() => onRestoreVersion(version)}
                          >
                            <Restore fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </>
                  )}
                  {onDeleteVersion && version.id !== currentVersion.id && (
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => onDeleteVersion(version.id)}
                        color="error"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              }
            >
              <ListItemButton
                selected={version.id === currentVersion.id}
                onClick={() => onSelectVersion(version)}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" fontWeight={version.id === currentVersion.id ? 600 : 400}>
                        Version {version.version}
                        {version.id === currentVersion.id && (
                          <Chip label="Current" size="small" color="primary" sx={{ ml: 1 }} />
                        )}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(version.createdAt).toLocaleString()}
                      </Typography>
                      <Chip
                        label={version.generator}
                        size="small"
                        variant="outlined"
                        sx={{ ml: 1, mt: 0.5 }}
                      />
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
            {index < sortedVersions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      {/* Compare Dialog */}
      <Dialog
        open={compareDialogOpen}
        onClose={() => setCompareDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Compare Versions</DialogTitle>
        <DialogContent>
          {selectedVersion && (
            <Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Current Version (v{currentVersion.version})
                  </Typography>
                  <CodeBlock code={currentVersion.code} language="tsx" />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Selected Version (v{selectedVersion.version})
                  </Typography>
                  <CodeBlock code={selectedVersion.code} language="tsx" />
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompareDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

