import React from 'react'
import { Box, Typography, IconButton, Paper, Link as MuiLink } from '@mui/material'
import {
  Email,
  GitHub,
  LinkedIn,
  Language,
  Twitter,
  GetApp,
  Phone,
} from '@mui/icons-material'
import type { Contact } from '@/data/aboutData'
import { useLanguage } from '@/hooks/useLanguage'

interface ContactCardProps {
  contacts: Contact[]
  resumeUrl?: string
}

const iconMap: Record<Contact['type'], React.ComponentType> = {
  Email,
  GitHub,
  LinkedIn,
  Phone,
  Blog: Language,
  Twitter,
  Other: Language,
}

export const ContactCard: React.FC<ContactCardProps> = ({ contacts, resumeUrl }) => {
  const { t } = useLanguage()
  
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        fontWeight={600}
        sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
      >
        {t.about.contact}
      </Typography>
      <Box sx={{ mt: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {contacts.map((contact, index) => {
          const Icon = iconMap[contact.type]
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              <IconButton
                component={contact.link ? MuiLink : 'div'}
                href={contact.link}
                target={contact.link?.startsWith('http') ? '_blank' : undefined}
                rel={contact.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                sx={{ bgcolor: 'primary.main', color: 'white' }}
              >
                <Icon />
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {contact.type}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {contact.value}
                </Typography>
              </Box>
            </Box>
          )
        })}
        {resumeUrl ? (
          resumeUrl.startsWith('http') ? (
            // External link (Google Drive, Dropbox, etc.)
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  bgcolor: 'primary.main',
                },
              }}
              component="a"
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GetApp />
              <Typography variant="body1" fontWeight={600}>
                {t.about.viewResume}
              </Typography>
            </Box>
          ) : (
            // Local file download
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 1,
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  bgcolor: 'primary.main',
                },
              }}
              component="a"
              href={resumeUrl}
              download
            >
              <GetApp />
              <Typography variant="body1" fontWeight={600}>
                Download Resume (PDF)
              </Typography>
            </Box>
          )
        ) : (
          // Fallback: Request via email
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderRadius: 1,
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              cursor: 'pointer',
              textDecoration: 'none',
              '&:hover': {
                bgcolor: 'primary.main',
              },
            }}
            component="a"
            href="mailto:norah.wuuu@gmail.com?subject=Resume Request&body=Hi, I would like to request your resume."
          >
            <GetApp />
            <Typography variant="body1" fontWeight={600}>
              {t.about.requestResume}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
