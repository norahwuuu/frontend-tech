/**
 * MarkdownViewer - Markdown 查看器组件
 * 不依赖业务逻辑，只依赖 Markdown 渲染库
 */

import React from 'react'
import { Box, Typography } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './CodeBlock'

export interface MarkdownViewerProps {
  /**
   * Markdown 内容
   */
  content: string
  /**
   * 是否显示代码块
   * @default true
   */
  showCodeBlocks?: boolean
  /**
   * 自定义样式
   */
  sx?: React.CSSProperties
}

/**
 * Markdown 查看器组件
 * 支持 GitHub Flavored Markdown
 * 
 * @example
 * ```tsx
 * <MarkdownViewer content="# Hello World" />
 * ```
 */
export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  showCodeBlocks = true,
  sx,
}) => {
  return (
    <Box sx={{ ...sx }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            const codeString = String(children).replace(/\n$/, '')
            const isInline = !className || !match

            return !isInline && language && showCodeBlocks ? (
              <CodeBlock code={codeString} language={language} />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          h1: ({ children }) => (
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
              {children}
            </Typography>
          ),
          h2: ({ children }) => (
            <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
              {children}
            </Typography>
          ),
          h3: ({ children }) => (
            <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
              {children}
            </Typography>
          ),
          p: ({ children }) => (
            <Typography variant="body1" paragraph>
              {children}
            </Typography>
          ),
          ul: ({ children }) => (
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Box>
          ),
          ol: ({ children }) => (
            <Box component="ol" sx={{ pl: 3, mb: 2 }}>
              {children}
            </Box>
          ),
          li: ({ children }) => (
            <Box component="li" sx={{ mb: 1 }}>
              <Typography variant="body1">{children}</Typography>
            </Box>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  )
}
