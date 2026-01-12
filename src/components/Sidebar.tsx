import React from 'react'
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Chip,
  Divider,
  Collapse,
} from '@mui/material'
import { ExpandLess, ExpandMore, Category, Tag } from '@mui/icons-material'
import { useLanguage } from '@/hooks/useLanguage'

interface SidebarProps {
  categories: string[]
  tags: string[]
  selectedCategory: string | null
  selectedTag: string | null
  onCategorySelect: (category: string | null) => void
  onTagSelect: (tag: string | null) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  onCategorySelect,
  onTagSelect,
}) => {
  const { t } = useLanguage()
  const [categoriesOpen, setCategoriesOpen] = React.useState(true)
  const [tagsOpen, setTagsOpen] = React.useState(true)

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t.knowledge.filters}
        </Typography>
      </Box>

      <Divider />

      {/* Categories */}
      <Box>
        <ListItemButton onClick={() => setCategoriesOpen(!categoriesOpen)}>
          <Category sx={{ mr: 1 }} />
          <ListItemText primary={t.knowledge.categories} />
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={categoriesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              selected={selectedCategory === null}
              onClick={() => onCategorySelect(null)}
              sx={{ pl: 4 }}
            >
              <ListItemText primary={t.knowledge.allCategories} />
            </ListItemButton>
            {categories.map((category) => (
              <ListItemButton
                key={category}
                selected={selectedCategory === category}
                onClick={() => onCategorySelect(category)}
                sx={{ pl: 4 }}
              >
                <ListItemText primary={category} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </Box>

      <Divider />

      {/* Tags */}
      <Box>
        <ListItemButton onClick={() => setTagsOpen(!tagsOpen)}>
          <Tag sx={{ mr: 1 }} />
          <ListItemText primary={t.knowledge.tags} />
          {tagsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={tagsOpen} timeout="auto" unmountOnExit>
          <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label={t.knowledge.allTags}
              size="small"
              onClick={() => onTagSelect(null)}
              color={selectedTag === null ? 'primary' : 'default'}
              variant={selectedTag === null ? 'filled' : 'outlined'}
            />
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onClick={() => onTagSelect(tag)}
                color={selectedTag === tag ? 'primary' : 'default'}
                variant={selectedTag === tag ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}
