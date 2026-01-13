import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Stack,
} from '@mui/material'
import { AccessTime, CalendarToday } from '@mui/icons-material'
import { Tag } from './Tag'
import type { BlogArticle } from '@/schemas'
import { useLanguage } from '@/hooks/useLanguage'

interface BlogCardProps {
  article: BlogArticle
  onClick: () => void
  selected?: boolean
}

export const BlogCard: React.FC<BlogCardProps> = ({
  article,
  onClick,
  selected = false,
}) => {
  const { t, language } = useLanguage()
  
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: selected ? 2 : 1,
        borderColor: selected ? 'primary.main' : 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" component="h3" fontWeight={600}>
            {article.title}
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarToday sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {new Date(article.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="caption" color="text.secondary">
                {article.readingTime} {t.blog.minRead}
              </Typography>
            </Box>
          </Box>
        }
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            minHeight: 60,
            mb: 2,
          }}
        >
          {article.summary}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {article.tags.slice(0, 4).map((tag) => (
              <Tag key={tag} label={tag} size="small" />
            ))}
            {article.tags.length > 4 && (
              <Tag label={`+${article.tags.length - 4}`} size="small" />
            )}
          </Stack>
        </Box>

        <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            {t.blog.by} {article.author}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
