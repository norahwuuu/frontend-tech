import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  IconButton,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { CodeBlock } from './CodeBlock'
import type { KnowledgeScene } from '@/data/knowledgeData'

interface SceneDetailProps {
  scene: KnowledgeScene | null
}

export const SceneDetail: React.FC<SceneDetailProps> = ({ scene }) => {
  const [keyPointsExpanded, setKeyPointsExpanded] = useState(true)

  if (!scene) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'text.secondary',
        }}
      >
        <Typography variant="h6">Select a scene to view details</Typography>
      </Box>
    )
  }

  const handleToggleKeyPoints = () => {
    setKeyPointsExpanded(!keyPointsExpanded)
  }

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        {scene.title}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
        <Chip label={scene.category} color="primary" size="small" />
        {scene.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" variant="outlined" />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        Solution
      </Typography>
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            whiteSpace: 'pre-line',
            lineHeight: 1.8,
          }}
        >
          {scene.solution}
        </Typography>
      </Paper>

      <Typography variant="h6" component="h2" gutterBottom fontWeight={600}>
        Code Example
      </Typography>
      <Box sx={{ mb: 4 }}>
        <CodeBlock code={scene.codeExample.code} language={scene.codeExample.language} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" component="h2" fontWeight={600}>
          Key Points
        </Typography>
        <IconButton onClick={handleToggleKeyPoints} size="small" aria-label="toggle key points">
          {keyPointsExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={keyPointsExpanded} timeout="auto" unmountOnExit>
        <List>
          {scene.keyPoints.map((point, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={600}>
                      {point.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {point.description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < scene.keyPoints.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Box>
  )
}
