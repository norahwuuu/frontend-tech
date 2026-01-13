import React from 'react'
import { Container, Box, Typography, Divider } from '@mui/material'
import { ProfileSection } from '@/components/ProfileSection'
import { TimelineItem } from '@/components/TimelineItem'
import { SkillsSection } from '@/components/SkillsSection'
import { ContactCard } from '@/components/ContactCard'
import { LanguageBar } from '@/components/LanguageBar'
import { Footer } from '@/components/Footer'
import { aboutData } from '@/data/aboutData'
import { useLanguage } from '@/hooks/useLanguage'

export const About: React.FC = () => {
  const { t } = useLanguage()
  
  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 }, flex: 1, px: { xs: 2, sm: 3 } }}>
        {/* Profile Section */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <ProfileSection data={aboutData} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Left Column */}
          <Box sx={{ order: { xs: 1, md: 0 } }}>
            {/* Education */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                fontWeight={700}
                sx={{ mb: 3, fontSize: { xs: '1.5rem', md: '2.125rem' } }}
              >
                {t.about.education}
              </Typography>
              {aboutData.education.map((edu, index) => (
                <TimelineItem
                  key={index}
                  type="education"
                  title={edu.degree}
                  subtitle={edu.school}
                  startDate={edu.startDate}
                  endDate={edu.endDate}
                  description={edu.description}
                />
              ))}
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Work Experience */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                fontWeight={700}
                sx={{ mb: 3, fontSize: { xs: '1.5rem', md: '2.125rem' } }}
              >
                {t.about.workExperience}
              </Typography>
              {aboutData.workExperience.map((work, index) => (
                <TimelineItem
                  key={index}
                  type="work"
                  title={work.position}
                  subtitle={work.company}
                  location={work.location}
                  startDate={work.startDate}
                  endDate={work.endDate}
                  description={work.description}
                />
              ))}
            </Box>

            <Divider sx={{ my: { xs: 3, md: 4 } }} />

            {/* Skills */}
            <Box sx={{ mb: 4 }}>
              <SkillsSection skills={aboutData.skills} />
            </Box>
          </Box>

          {/* Right Column */}
          <Box sx={{ order: { xs: 0, md: 1 } }}>
            <Box sx={{ position: { xs: 'static', md: 'sticky' }, top: { md: 80 } }}>
              {/* Contact */}
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <ContactCard contacts={aboutData.contacts} resumeUrl={aboutData.resumeUrl} />
              </Box>

              {/* Languages */}
              <Box>
                <LanguageBar languages={aboutData.languages} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  )
}
