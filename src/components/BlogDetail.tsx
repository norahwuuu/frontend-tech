import React, { useState } from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  IconButton,
  Paper,
  Chip,
  Stack,
} from '@mui/material'
import { ExpandLess, ExpandMore, CalendarToday, AccessTime, Person } from '@mui/icons-material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './CodeBlock'
import { Tag } from './Tag'
import type { BlogArticle } from '@/schemas'
import { useLanguage } from '@/hooks/useLanguage'

interface BlogDetailProps {
  article: BlogArticle | null
  onRelatedArticleClick?: (articleId: string) => void // Reserved for future use
}

// Custom code block component
const CodeBlockComponent = ({ node, inline, className, children, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || '')
  const language = match ? match[1] : 'text'
  const code = String(children).replace(/\n$/, '')

  if (inline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  return <CodeBlock code={code} language={language} />
}

export const BlogDetail: React.FC<BlogDetailProps> = ({
  article,
  onRelatedArticleClick: _onRelatedArticleClick, // Reserved for future related articles feature
}) => {
  const { t, language } = useLanguage()
  const [keyPointsExpanded, setKeyPointsExpanded] = useState(true)

  if (!article) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'text.secondary',
        }}
      >
        <Typography variant="h6">{t.blog.selectArticle}</Typography>
      </Box>
    )
  }

  const handleToggleKeyPoints = () => {
    setKeyPointsExpanded(!keyPointsExpanded)
  }

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
          {article.title}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {article.author}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {new Date(article.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {article.readingTime} {t.blog.minRead}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {article.category && (
            <Chip label={article.category} color="primary" size="small" />
          )}
          {article.tags.map((tag) => (
            <Tag key={tag} label={tag} size="small" />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Content */}
      <Box
        sx={{
          '& h1, & h2, & h3': {
            mt: 3,
            mb: 2,
            fontWeight: 600,
          },
          '& h1': {
            fontSize: '2rem',
          },
          '& h2': {
            fontSize: '1.5rem',
          },
          '& h3': {
            fontSize: '1.25rem',
          },
          '& p': {
            mb: 2,
            lineHeight: 1.8,
          },
          '& ul, & ol': {
            mb: 2,
            pl: 3,
          },
          '& li': {
            mb: 1,
          },
          '& code': {
            bgcolor: 'grey.100',
            px: 0.5,
            py: 0.25,
            borderRadius: 0.5,
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          },
          '& pre': {
            mb: 2,
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 1,
            my: 2,
          },
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlockComponent,
          }}
        >
          {article.content}
        </ReactMarkdown>
      </Box>

      {/* Key Points */}
      {article.keyPoints && article.keyPoints.length > 0 && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
              mt: 4,
            }}
          >
            <Typography variant="h6" component="h2" fontWeight={600}>
              {t.blog.keyPoints}
            </Typography>
            <IconButton
              onClick={handleToggleKeyPoints}
              size="small"
              aria-label="toggle key points"
            >
              {keyPointsExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Box>
          <Collapse in={keyPointsExpanded} timeout="auto" unmountOnExit>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50', mb: 4 }}>
              <List>
                {article.keyPoints.map((point, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="body1">
                            • {point}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < article.keyPoints!.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Collapse>
        </>
      )}
    </Box>
  )
}
