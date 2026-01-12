import React from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  Paper,
  Typography,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { Tag } from './Tag'
import type { ProjectType } from '@/schemas/projects'
import { useLanguage } from '@/hooks/useLanguage'

interface FiltersBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedType: ProjectType | 'all'
  onTypeChange: (type: ProjectType | 'all') => void
  selectedTechs: string[]
  onTechToggle: (tech: string) => void
  availableTechStack: string[]
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedTechs,
  onTechToggle,
  availableTechStack,
}) => {
  const { t } = useLanguage()
  const handleTypeChange = (_event: React.SyntheticEvent, newValue: ProjectType | 'all') => {
    onTypeChange(newValue)
  }

  const handleClearTechs = () => {
    selectedTechs.forEach(tech => onTechToggle(tech))
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 1.5, md: 2 },
        mb: { xs: 2, md: 3 },
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          placeholder={t.projects.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          {t.projects.projectType}
        </Typography>
        <Tabs
          value={selectedType}
          onChange={handleTypeChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ minHeight: 40 }}
        >
          <Tab label={t.projects.allTypes} value="all" />
          <Tab label={t.projects.tool} value="Tool" />
          <Tab label={t.projects.experiment} value="Experiment" />
          <Tab label={t.projects.fullStack} value="FullStack" />
        </Tabs>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {t.projects.techStack} {selectedTechs.length > 0 && `(${selectedTechs.length} ${t.projects.selected})`}
          </Typography>
          {selectedTechs.length > 0 && (
            <Chip
              label={t.projects.clearAll}
              size="small"
              onClick={handleClearTechs}
              color="secondary"
              variant="outlined"
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {availableTechStack.slice(0, 15).map((tech) => {
            const isSelected = selectedTechs.includes(tech)
            return (
              <Tag
                key={tech}
                label={tech}
                onClick={() => onTechToggle(tech)}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
              />
            )
          })}
        </Box>
      </Box>
    </Paper>
  )
}
