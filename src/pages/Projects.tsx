import React, { useState, useMemo } from 'react'
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectDetail } from '@/components/ProjectDetail'
import { FiltersBar } from '@/components/FiltersBar'
import { Footer } from '@/components/Footer'
import { projects, allTechStack } from '@/data/projectsData'
import type { Project, ProjectType } from '@/data/projectsData'
import { useLanguage } from '@/hooks/useLanguage'

export const Projects: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<ProjectType | 'all'>('all')
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [detailOpen, setDetailOpen] = useState(false)

  // Filter projects based on search, type, and tech stack
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )

      const matchesType = selectedType === 'all' || project.type === selectedType

      const matchesTech = selectedTechs.length === 0 || selectedTechs.some(tech => project.techStack.includes(tech))

      return matchesSearch && matchesType && matchesTech
    })
  }, [searchQuery, selectedType, selectedTechs])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    if (isMobile) {
      setDetailOpen(true)
    }
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2, md: 4 },
            px: { xs: 2, sm: 3 },
            flex: 1,
            mr: !isMobile && selectedProject ? '600px' : 0,
            transition: 'margin-right 0.3s ease',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight={700}
            sx={{ mb: 3, fontSize: { xs: '1.75rem', md: '2.125rem' } }}
          >
            {t.projects.title}
          </Typography>

      {/* Filters Bar */}
      <FiltersBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedTechs={selectedTechs}
        onTechToggle={(tech) => {
          setSelectedTechs(prev =>
            prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
          )
        }}
        availableTechStack={allTechStack}
      />

          {/* Projects Grid */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {filteredProjects.length} {filteredProjects.length === 1 ? t.projects.projectsFound : t.projects.projectsFoundPlural}
            </Typography>

            {filteredProjects.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {t.projects.noProjects}
                </Typography>
                <Typography variant="body2">
                  {t.projects.noProjectsDesc}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
                    selected={selectedProject?.id === project.id}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Container>

        {/* Desktop: Side Detail Panel */}
        {!isMobile && selectedProject && (
          <Box
            sx={{
              position: 'fixed',
              right: 0,
              top: 64,
              width: 600,
              height: 'calc(100vh - 64px)',
              bgcolor: 'background.paper',
              borderLeft: 1,
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              boxShadow: -2,
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  {t.projects.projectDetails}
                </Typography>
                <IconButton onClick={() => setSelectedProject(null)} size="small">
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <ProjectDetail project={selectedProject} />
            </Box>
          </Box>
        )}

        {/* Mobile: Modal Drawer */}
        {isMobile && (
          <Drawer
            anchor="bottom"
            open={detailOpen}
            onClose={handleCloseDetail}
            PaperProps={{
              sx: {
                height: '90vh',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              },
            }}
          >
            <Box sx={{ position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1, p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  {t.projects.projectDetails}
                </Typography>
                <IconButton onClick={handleCloseDetail} size="small">
                  <Close />
                </IconButton>
              </Box>
            </Box>
            {selectedProject && (
              <Box sx={{ overflow: 'auto', height: '100%' }}>
                <ProjectDetail project={selectedProject} />
              </Box>
            )}
          </Drawer>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  )
}
