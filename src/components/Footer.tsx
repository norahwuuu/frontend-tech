import React from 'react'
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
  IconButton,
} from '@mui/material'
import { GitHub, LinkedIn, Email } from '@mui/icons-material'
import { useLanguage } from '@/hooks/useLanguage'

export const Footer: React.FC = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GitHub,
      href: 'https://github.com/norahwuuu',
      external: true,
    },
    {
      name: 'LinkedIn',
      icon: LinkedIn,
      href: 'https://www.linkedin.com/in/haonan-wu-890639344',
      external: true,
    },
    {
      name: 'Email',
      icon: Email,
      href: 'mailto:norah.wuuu@gmail.com',
      external: false,
    },
  ]

  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mb: 4,
          }}
        >
          {/* About */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t.footer.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t.footer.description}
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t.footer.quickLinks}
            </Typography>
            <Stack spacing={1}>
              <Link href="/knowledge" color="text.secondary" underline="hover">
                {t.footer.knowledgeBase}
              </Link>
              <Link href="/project" color="text.secondary" underline="hover">
                {t.footer.projects}
              </Link>
              <Link href="/about" color="text.secondary" underline="hover">
                {t.footer.aboutMe}
              </Link>
            </Stack>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {t.footer.getInTouch}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <IconButton
                    key={link.name}
                    component="a"
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    color="inherit"
                    aria-label={link.name}
                  >
                    <Icon />
                  </IconButton>
                )
              })}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              norah.wuuu@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              +49 17660876657
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Essen, Germany
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} {t.footer.title}. {t.footer.allRightsReserved}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t.footer.builtWith}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
