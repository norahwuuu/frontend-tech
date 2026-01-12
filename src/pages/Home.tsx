import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Chip,
  Stack,
  Divider,
  Button,
} from '@mui/material'
import {
  ArrowForward,
  Code,
  MenuBook,
  Rocket,
  Lightbulb,
  Storage,
  Bolt,
} from '@mui/icons-material'
import { HeroSection } from '@/components/HeroSection'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/hooks/useLanguage'

export const Home: React.FC = () => {
  const { t } = useLanguage()

  // Featured knowledge scenarios / projects
  const featuredItems = [
    {
      id: 1,
      title: 'React Performance Optimization',
      description: 'Advanced techniques for optimizing React applications, including memoization, code splitting, and lazy loading.',
      tags: ['React', 'Performance', 'Optimization'],
      icon: Bolt,
      color: '#ff9800',
      link: '/knowledge/react-optimization',
    },
    {
      id: 2,
      title: 'TypeScript Best Practices',
      description: 'Comprehensive guide to writing maintainable and type-safe TypeScript code with advanced patterns.',
      tags: ['TypeScript', 'Best Practices', 'Patterns'],
      icon: Code,
      color: '#2196f3',
      link: '/knowledge/typescript-practices',
    },
    {
      id: 3,
      title: 'Modern CSS Architecture',
      description: 'Building scalable CSS architectures using Tailwind CSS, CSS Modules, and design systems.',
      tags: ['CSS', 'Tailwind', 'Architecture'],
      icon: MenuBook,
      color: '#9c27b0',
      link: '/knowledge/css-architecture',
    },
    {
      id: 4,
      title: 'Full-Stack Project: Task Manager',
      description: 'A complete task management application built with React, Node.js, and PostgreSQL.',
      tags: ['Full-Stack', 'React', 'Node.js'],
      icon: Rocket,
      color: '#4caf50',
      link: '/project/task-manager',
    },
    {
      id: 5,
      title: 'UI Component Library',
      description: 'A comprehensive component library built with React and Storybook for rapid prototyping.',
      tags: ['Components', 'Design System', 'Storybook'],
      icon: Lightbulb,
      color: '#673ab7',
      link: '/project/component-library',
    },
    {
      id: 6,
      title: 'Database Design Patterns',
      description: 'Exploring modern database design patterns and optimization strategies for web applications.',
      tags: ['Database', 'Design Patterns', 'SQL'],
      icon: Storage,
      color: '#f44336',
      link: '/knowledge/database-patterns',
    },
  ]

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <HeroSection />

      {/* Personal Info Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Card elevation={3}>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                  }}
                >
                  FD
                </Avatar>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
                  <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
                    {t.home.aboutMeTitle}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" paragraph>
                    {t.home.aboutMeSubtitle}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }} flexWrap="wrap" useFlexGap>
                    <Chip label="React" size="small" />
                    <Chip label="TypeScript" size="small" />
                    <Chip label="Tailwind CSS" size="small" />
                    <Chip label="Vite" size="small" />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Featured Section */}
      <Box sx={{ py: { xs: 4, md: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight={700}
              sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}
            >
              {t.home.featured}
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              {t.home.featuredDesc}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: { xs: 2, md: 3 },
            }}
          >
            {featuredItems.map((item) => {
              const Icon = item.icon
              return (
                <Box key={item.id}>
                  <Card
                    component={Link}
                    to={item.link}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: item.color,
                            width: 56,
                            height: 56,
                          }}
                        >
                          <Icon />
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" component="h3" fontWeight={600}>
                          {item.title}
                        </Typography>
                      }
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {item.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap" useFlexGap>
                        {item.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" />
                        ))}
                      </Stack>
                      <Button
                        endIcon={<ArrowForward />}
                        color="primary"
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        {t.home.learnMore}
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              )
            })}
          </Box>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Card elevation={3}>
            <CardHeader
              title={
                <Typography variant="h4" component="h2" fontWeight={700}>
                  {t.home.aboutMe}
                </Typography>
              }
              subheader={t.home.aboutMeDesc}
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary" paragraph>
                {t.home.aboutMeDesc2}
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {t.home.technicalFocus}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {t.home.technicalFocusDesc}
                </Typography>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                  {t.home.currentInterests}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label="React 19" />
                  <Chip label="Next.js" />
                  <Chip label="Server Components" />
                  <Chip label="Web Performance" />
                  <Chip label="Design Systems" />
                  <Chip label="Accessibility" />
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}
