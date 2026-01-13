import React, { useState } from 'react'
import { Card, CardContent, CardHeader, Typography, Chip, Box, Tooltip } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import type { Scene } from '@/schemas'
import { useLanguage } from '@/hooks/useLanguage'

interface SceneCardProps {
  scene: Scene
  onClick: () => void
  selected?: boolean
}

export const SceneCard: React.FC<SceneCardProps> = ({
  scene,
  onClick,
  selected = false,
}) => {
  const { t } = useLanguage()
  const [showDescription, setShowDescription] = useState(false)
  const description = scene.context
  const solutionsCount = scene.solutions.length

  return (
    <Tooltip
      title={description}
      arrow
      placement="right"
      open={showDescription}
      onOpen={() => setShowDescription(true)}
      onClose={() => setShowDescription(false)}
    >
      <Card
        onClick={onClick}
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.2s',
          border: selected ? 2 : 1,
          borderColor: selected ? 'primary.main' : 'divider',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 4,
            borderColor: 'primary.main',
          },
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" component="h3" fontWeight={600}>
              {scene.title}
            </Typography>
          }
          subheader={`${scene.category} • ${solutionsCount} ${solutionsCount === 1 ? t.knowledge.solution : t.knowledge.solutions}`}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            paragraph
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {scene.tags.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {t.knowledge.viewDetails}
            </Typography>
            <ArrowForward sx={{ ml: 1, fontSize: 16 }} />
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  )
}
