import React from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { Tag } from './Tag'
import { useLanguage } from '@/hooks/useLanguage'

interface BlogSidebarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  categories: string[]
  tags: string[]
  sortBy: 'latest' | 'oldest' | 'readingTime'
  onSortChange: (sort: 'latest' | 'oldest' | 'readingTime') => void
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  selectedTags,
  onTagToggle,
  categories,
  tags,
  sortBy,
  onSortChange,
}) => {
  const { t } = useLanguage()
  const handleClearTags = () => {
    selectedTags.forEach(tag => onTagToggle(tag))
  }

  return (
    <Box
      sx={{
        width: { xs: '100%', md: 280 },
        flexShrink: 0,
        borderRight: { xs: 0, md: 1 },
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {/* Search */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          fullWidth
          placeholder={t.blog.searchArticles}
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

      {/* Sort */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          {t.blog.sortBy}
        </Typography>
        <List dense>
          <ListItemButton
            selected={sortBy === 'latest'}
            onClick={() => onSortChange('latest')}
          >
            <ListItemText primary={t.blog.latest} />
          </ListItemButton>
          <ListItemButton
            selected={sortBy === 'oldest'}
            onClick={() => onSortChange('oldest')}
          >
            <ListItemText primary={t.blog.oldest} />
          </ListItemButton>
          <ListItemButton
            selected={sortBy === 'readingTime'}
            onClick={() => onSortChange('readingTime')}
          >
            <ListItemText primary={t.blog.readingTime} />
          </ListItemButton>
        </List>
      </Box>

      {/* Categories */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
          {t.blog.categories}
        </Typography>
        <List dense>
          <ListItemButton
            selected={selectedCategory === null}
            onClick={() => onCategorySelect(null)}
          >
            <ListItemText primary={t.blog.allCategories} />
          </ListItemButton>
          {categories.map((category) => (
            <ListItemButton
              key={category}
              selected={selectedCategory === category}
              onClick={() => onCategorySelect(category)}
            >
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Tags */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {t.blog.tags} {selectedTags.length > 0 && `(${selectedTags.length})`}
          </Typography>
          {selectedTags.length > 0 && (
            <Typography
              variant="caption"
              onClick={handleClearTags}
              sx={{
                cursor: 'pointer',
                color: 'primary.main',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {t.blog.clear}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.slice(0, 20).map((tag) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <Tag
                key={tag}
                label={tag}
                onClick={() => onTagToggle(tag)}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                size="small"
              />
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
