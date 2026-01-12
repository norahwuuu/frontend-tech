import React from 'react'
import {
  Box,
  Typography,
  Paper,
  Chip,
} from '@mui/material'
import { School, Work } from '@mui/icons-material'

interface TimelineItemProps {
  type: 'education' | 'work'
  title: string
  subtitle: string
  startDate: string
  endDate: string | 'Present'
  description?: string[]
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  type,
  title,
  subtitle,
  startDate,
  endDate,
  description,
}) => {
  const Icon = type === 'education' ? School : Work
  const isPresent = endDate === 'Present'

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 2,
        position: 'relative',
        borderLeft: { xs: 2, md: 3 },
        borderColor: 'primary.main',
        '&:hover': {
          boxShadow: 4,
          transform: { xs: 'none', md: 'translateX(4px)' },
          transition: 'all 0.2s',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 40,
            height: 40,
          }}
        >
          <Icon />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Typography variant="h6" component="h3" fontWeight={600}>
              {title}
            </Typography>
            <Chip
              label={isPresent ? 'Present' : endDate}
              size="small"
              color={isPresent ? 'success' : 'default'}
            />
          </Box>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            {subtitle}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {startDate} - {endDate}
          </Typography>
          {description && description.length > 0 && (
            <Box component="ul" sx={{ mt: 2, pl: 2 }}>
              {description.map((item, index) => (
                <Typography
                  key={index}
                  component="li"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  )
}
