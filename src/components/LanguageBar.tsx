import React from 'react'
import { Box, Typography, LinearProgress, Paper } from '@mui/material'
import type { Language } from '@/data/aboutData'
import { useLanguage } from '@/hooks/useLanguage'

interface LanguageBarProps {
  languages: Language[]
}

export const LanguageBar: React.FC<LanguageBarProps> = ({ languages }) => {
  const { t } = useLanguage()
  const getColor = (proficiency?: number) => {
    if (!proficiency) return 'primary'
    if (proficiency >= 9) return 'success'
    if (proficiency >= 7) return 'primary'
    if (proficiency >= 5) return 'warning'
    return 'error'
  }

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        fontWeight={600}
        sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
      >
        {t.about.languages}
      </Typography>
      <Box
        sx={{
          mt: { xs: 2, md: 3 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
        }}
      >
        {languages.map((lang, index) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" fontWeight={500}>
                {lang.language}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {lang.level}
              </Typography>
            </Box>
            {lang.proficiency && (
              <LinearProgress
                variant="determinate"
                value={(lang.proficiency / 10) * 100}
                color={getColor(lang.proficiency)}
                sx={{ height: 8, borderRadius: 1 }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  )
}
