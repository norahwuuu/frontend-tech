/**
 * CodeBlock - 代码块组件
 * 不依赖业务逻辑，只依赖代码高亮库
 */

import React, { useEffect, useState } from 'react'
import { Box, IconButton, Tooltip, Paper } from '@mui/material'
import { ContentCopy, Check } from '@mui/icons-material'
import { createHighlighter, type Highlighter } from 'shiki'

export interface CodeBlockProps {
  /**
   * 代码内容
   */
  code: string
  /**
   * 编程语言
   * @default 'typescript'
   */
  language?: string
  /**
   * 是否显示复制按钮
   * @default true
   */
  showCopy?: boolean
  /**
   * 自定义样式
   */
  sx?: React.CSSProperties
}

/**
 * 代码块组件
 * 支持语法高亮和代码复制
 * 
 * @example
 * ```tsx
 * <CodeBlock
 *   code="const x = 1;"
 *   language="typescript"
 *   showCopy={true}
 * />
 * ```
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  showCopy = true,
  sx,
}) => {
  const [highlightedCode, setHighlightedCode] = useState<string>('')
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let mounted = true

    const initHighlighter = async () => {
      try {
        const h = await createHighlighter({
          themes: ['github-light', 'github-dark'],
          langs: [language as any],
        })
        if (mounted) {
          setHighlighter(h)
        }
      } catch (error) {
        console.error('Failed to initialize highlighter:', error)
      }
    }

    initHighlighter()

    return () => {
      mounted = false
    }
  }, [language])

  useEffect(() => {
    if (highlighter && code) {
      try {
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-light',
        })
        setHighlightedCode(html)
      } catch (error) {
        console.error('Failed to highlight code:', error)
        setHighlightedCode(code)
      }
    } else {
      setHighlightedCode(code)
    }
  }, [highlighter, code, language])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        bgcolor: 'grey.50',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {showCopy && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={{
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          fontFamily: 'monospace',
          '& code': {
            fontFamily: 'inherit',
          },
        }}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </Paper>
  )
}
