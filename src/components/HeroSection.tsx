import React from 'react'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/hooks/useLanguage'

export const HeroSection: React.FC = () => {
  const { t } = useLanguage()

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: 400,
          height: 400,
          bgcolor: 'primary.main',
          opacity: 0.1,
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: '25%',
          width: 400,
          height: 400,
          bgcolor: 'secondary.main',
          opacity: 0.1,
          borderRadius: '50%',
          filter: 'blur(80px)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
            fontWeight: 700,
            mb: { xs: 2, md: 3 },
            background: 'linear-gradient(45deg, #1976d2, #dc004e)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t.home.title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: { xs: 3, md: 4 },
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            px: { xs: 1, sm: 0 },
          }}
        >
          {t.home.subtitle}
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ px: { xs: 2, sm: 0 } }}
        >
          <Button
            component={Link}
            to="/knowledge"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{ px: { xs: 3, md: 4 }, py: { xs: 1, md: 1.5 }, width: { xs: '100%', sm: 'auto' } }}
          >
            {t.home.browseKnowledge}
          </Button>
          <Button
            component={Link}
            to="/project"
            variant="outlined"
            size="large"
            sx={{ px: { xs: 3, md: 4 }, py: { xs: 1, md: 1.5 }, width: { xs: '100%', sm: 'auto' } }}
          >
            {t.home.viewProjects}
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
