import React from 'react'
import { Box, Typography, Avatar, Paper } from '@mui/material'
import type { AboutData } from '@/data/aboutData'

interface ProfileSectionProps {
  data: AboutData
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ data }) => {

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{
          width: { xs: 100, sm: 120, md: 150 },
          height: { xs: 100, sm: 120, md: 150 },
          mx: 'auto',
          mb: { xs: 2, md: 3 },
          bgcolor: 'primary.main',
          fontSize: { xs: '2rem', md: '3rem' },
        }}
      >
        {data.name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </Avatar>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        fontWeight={700}
        sx={{ fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' } }}
      >
        {data.name}
      </Typography>
      <Typography
        variant="h6"
        color="primary"
        gutterBottom
        sx={{ fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' } }}
      >
        {data.title}
      </Typography>
      {data.location && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}
        >
          {data.location}
        </Typography>
      )}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 800,
          mx: 'auto',
          mt: { xs: 1, md: 2 },
          px: { xs: 1, sm: 0 },
          fontSize: { xs: '0.875rem', md: '1rem' },
        }}
      >
        {data.bio}
      </Typography>
      {data.motto && (
        <Box
          sx={{
            mt: 3,
            pt: 3,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="text.secondary" fontStyle="italic">
            "{data.motto}"
          </Typography>
        </Box>
      )}
    </Paper>
  )
}
