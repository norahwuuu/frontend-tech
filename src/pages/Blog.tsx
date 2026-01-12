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
import { BlogCard } from '@/components/BlogCard'
import { BlogDetail } from '@/components/BlogDetail'
import { BlogSidebar } from '@/components/BlogSidebar'
import { Footer } from '@/components/Footer'
import { blogArticles, blogCategories, blogTags } from '@/data/blogArticles'
import type { BlogArticle } from '@/schemas'
import { useLanguage } from '@/hooks/useLanguage'

type SortOption = 'latest' | 'oldest' | 'readingTime'

export const Blog: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useLanguage()
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [detailOpen, setDetailOpen] = useState(false)

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = blogArticles.filter((article) => {
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || article.category === selectedCategory

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => article.tags.includes(tag))

      return matchesSearch && matchesCategory && matchesTags
    })

    // Sort articles
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'readingTime':
          return b.readingTime - a.readingTime
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedTags, sortBy])

  const handleArticleClick = (article: BlogArticle) => {
    setSelectedArticle(article)
    if (isMobile) {
      setDetailOpen(true)
    }
  }

  const handleCloseDetail = () => {
    setDetailOpen(false)
  }

  const handleRelatedArticleClick = (articleId: string) => {
    const article = blogArticles.find((a) => a.id === articleId)
    if (article) {
      setSelectedArticle(article)
      if (isMobile) {
        setDetailOpen(true)
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar */}
        {!isMobile && (
          <BlogSidebar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            selectedTags={selectedTags}
            onTagToggle={(tag) => {
              setSelectedTags((prev) =>
                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
              )
            }}
            categories={blogCategories}
            tags={blogTags}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        )}

        <Container
          maxWidth="xl"
          sx={{
            py: { xs: 2, md: 4 },
            px: { xs: 2, sm: 3 },
            flex: 1,
            mr: !isMobile && selectedArticle ? '600px' : 0,
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
            {t.blog.title}
          </Typography>

          {/* Mobile Search - Collapsible */}
          {isMobile && (
            <Box sx={{ mb: 2 }}>
              <BlogSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                selectedTags={selectedTags}
                onTagToggle={(tag) => {
                  setSelectedTags((prev) =>
                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                  )
                }}
                categories={blogCategories}
                tags={blogTags}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </Box>
          )}

          {/* Articles Grid */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {filteredArticles.length} {filteredArticles.length === 1 ? t.blog.articleFound : t.blog.articlesFound}
            </Typography>

            {filteredArticles.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {t.blog.noArticles}
                </Typography>
                <Typography variant="body2">
                  {t.blog.noArticlesDesc}
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
                {filteredArticles.map((article) => (
                  <BlogCard
                    key={article.id}
                    article={article}
                    onClick={() => handleArticleClick(article)}
                    selected={selectedArticle?.id === article.id}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Container>

        {/* Desktop: Side Detail Panel */}
        {!isMobile && selectedArticle && (
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
                  {t.blog.articleDetails}
                </Typography>
                <IconButton onClick={() => setSelectedArticle(null)} size="small">
                  <Close />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <BlogDetail
                article={selectedArticle}
                onRelatedArticleClick={handleRelatedArticleClick}
              />
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
                  {t.blog.articleDetails}
                </Typography>
                <IconButton onClick={handleCloseDetail} size="small">
                  <Close />
                </IconButton>
              </Box>
            </Box>
            {selectedArticle && (
              <Box sx={{ overflow: 'auto', height: '100%' }}>
                <BlogDetail
                  article={selectedArticle}
                  onRelatedArticleClick={handleRelatedArticleClick}
                />
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
