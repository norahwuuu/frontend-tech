import React from 'react'
import { Box, Typography, LinearProgress, Paper } from '@mui/material'
import type { Skill } from '@/data/aboutData'
import { useLanguage } from '@/hooks/useLanguage'

interface SkillsSectionProps {
  skills: Skill[]
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const { t } = useLanguage()
  // Define category display order
  const categoryOrder = [
    'Frontend',
    'Backend',
    'DevOps & Tooling',
    'Practices',
    'State Management',
    'Mobile',
    'Framework',
    'Advanced',
    'Language',
    'Fundamental',
    'Build Tools',
    'Tools',
    'DevOps',
  ]
  
  const categories = Array.from(new Set(skills.map((s) => s.category).filter(Boolean)))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a || '')
      const indexB = categoryOrder.indexOf(b || '')
      // If category is in order list, sort by index; otherwise, sort alphabetically
      if (indexA !== -1 && indexB !== -1) return indexA - indexB
      if (indexA !== -1) return -1
      if (indexB !== -1) return 1
      return (a || '').localeCompare(b || '')
    })

  const getColor = (level: number) => {
    if (level >= 9) return 'success'
    if (level >= 7) return 'primary'
    if (level >= 5) return 'warning'
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
        {t.about.skills}
      </Typography>
      <Box sx={{ mt: { xs: 2, md: 3 } }}>
        {categories.length > 0 ? (
          categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            return (
              <Box key={category} sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'text.secondary' }}>
                  {category}
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                    gap: 2,
                  }}
                >
                  {categorySkills.map((skill) => (
                    <Box key={skill.tech}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" fontWeight={500}>
                          {skill.tech}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {skill.level}/10
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(skill.level / 10) * 100}
                        color={getColor(skill.level)}
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )
          })
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {skills.map((skill) => (
              <Box key={skill.tech}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={500}>
                    {skill.tech}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {skill.level}/10
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(skill.level / 10) * 100}
                  color={getColor(skill.level)}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  )
}
