/**
 * Markdown 导入/导出功能
 * 支持 Scene ↔ Markdown 双向转换
 */

import type { Scene, Solution, KeyPoint } from '@/schemas'
import { parseScene } from './validation'

/**
 * Markdown 解析错误
 */
export class MarkdownParseError extends Error {
  constructor(message: string, public line?: number) {
    super(message)
    this.name = 'MarkdownParseError'
  }
}

/**
 * 解析 Markdown 为 Scene
 * 
 * 支持的格式：
 * # Scene: [标题]
 * 
 * ## Context
 * [场景背景]
 * 
 * ## Solution: [方案名称]
 * ### Problem
 * [问题描述]
 * 
 * ### Approach
 * [解决思路]
 * 
 * ### Key Points
 * - [要点1]
 * - [要点2]
 * 
 * ### Code Demo
 * ```tsx
 * [代码示例]
 * ```
 */
export function parseMarkdownToScene(markdown: string): Scene {
  const lines = markdown.split('\n')
  let currentLine = 0

  // 解析标题
  const titleMatch = lines[0]?.match(/^#\s*Scene:\s*(.+)$/i)
  if (!titleMatch) {
    throw new MarkdownParseError('Missing or invalid Scene title', 1)
  }
  const title = titleMatch[1].trim()
  currentLine = 1

  // 解析 Context
  let context = ''
  let contextStart = -1
  for (let i = currentLine; i < lines.length; i++) {
    if (lines[i]?.match(/^##\s*Context/i)) {
      contextStart = i + 1
      break
    }
  }

  if (contextStart === -1) {
    throw new MarkdownParseError('Missing Context section')
  }

  // 提取 Context 内容（直到下一个 ## 标题）
  for (let i = contextStart; i < lines.length; i++) {
    if (lines[i]?.match(/^##\s+/)) {
      break
    }
    if (lines[i]?.trim()) {
      context += lines[i] + '\n'
    }
  }
  context = context.trim()

  // 解析 Solutions
  const solutions: Solution[] = []
  let i = contextStart
  while (i < lines.length) {
    const solutionMatch = lines[i]?.match(/^##\s*Solution(?::\s*(.+))?$/i)
    if (solutionMatch) {
      const solutionTitle = solutionMatch[1]?.trim() || 'Solution'
      const solution = parseSolutionFromMarkdown(lines, i + 1, solutionTitle)
      solutions.push(solution)
      i = solution.endLine
    } else {
      i++
    }
  }

  if (solutions.length === 0) {
    throw new MarkdownParseError('At least one Solution is required')
  }

  // 尝试提取 category 和 tags（从 frontmatter 或标题）
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/)
  let category = 'General'
  let tags: string[] = []

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    const categoryMatch = frontmatter.match(/category:\s*(.+)/i)
    const tagsMatch = frontmatter.match(/tags:\s*\[(.+)\]/i)
    
    if (categoryMatch) {
      category = categoryMatch[1].trim()
    }
    if (tagsMatch) {
      tags = tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''))
    }
  }

  // 构建 Scene 对象
  const scene: Scene = {
    id: `scene-${Date.now()}`,
    title,
    context,
    category,
    tags,
    solutions,
    createdAt: new Date().toISOString(),
  }

  // 验证并返回
  return parseScene(scene)
}

/**
 * 从 Markdown 解析单个 Solution
 */
function parseSolutionFromMarkdown(
  lines: string[],
  startLine: number,
  title: string
): Solution & { endLine: number } {
  let i = startLine
  let problem = ''
  let approach = ''
  let codeDemo = ''
  const keyPoints: KeyPoint[] = []

  let currentSection = ''

  while (i < lines.length) {
    const line = lines[i] || ''
    
    // 遇到下一个 Solution 或 Scene 结束
    if (line.match(/^##\s+Solution/i) || line.match(/^#\s+/)) {
      break
    }

    // 解析 Problem
    if (line.match(/^###\s+Problem/i)) {
      currentSection = 'problem'
      i++
      continue
    }

    // 解析 Approach
    if (line.match(/^###\s+Approach/i)) {
      currentSection = 'approach'
      i++
      continue
    }

    // 解析 Key Points
    if (line.match(/^###\s+Key\s+Points/i)) {
      currentSection = 'keypoints'
      i++
      continue
    }

    // 解析 Code Demo
    if (line.match(/^###\s+Code\s+Demo/i)) {
      currentSection = 'codedemo'
      i++
      continue
    }

    // 收集内容
    if (currentSection === 'problem') {
      if (line.trim()) {
        problem += line + '\n'
      }
    } else if (currentSection === 'approach') {
      if (line.trim()) {
        approach += line + '\n'
      }
    } else if (currentSection === 'keypoints') {
      const pointMatch = line.match(/^[-*]\s+(.+)$/)
      if (pointMatch) {
        const pointText = pointMatch[1].trim()
        const [title, ...descParts] = pointText.split(':')
        keyPoints.push({
          id: `kp-${keyPoints.length + 1}`,
          title: title.trim(),
          description: descParts.join(':').trim() || title.trim(),
          tags: [],
        })
      }
    } else if (currentSection === 'codedemo') {
      codeDemo += line + '\n'
    }

    i++
  }

  // 清理代码块标记
  codeDemo = codeDemo.replace(/^```[\w]*\n?/gm, '').replace(/```$/gm, '').trim()

  if (!problem.trim()) {
    throw new MarkdownParseError(`Solution "${title}" missing Problem section`, startLine)
  }
  if (!approach.trim()) {
    throw new MarkdownParseError(`Solution "${title}" missing Approach section`, startLine)
  }
  if (keyPoints.length === 0) {
    throw new MarkdownParseError(`Solution "${title}" requires at least one Key Point`, startLine)
  }

  return {
    id: `solution-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    problem: problem.trim(),
    approach: approach.trim(),
    codeDemo: codeDemo || undefined,
    keyPoints,
    autoGenerated: false,
    endLine: i,
  }
}

/**
 * 将 Scene 导出为 Markdown
 */
export function exportSceneToMarkdown(scene: Scene): string {
  let markdown = `# Scene: ${scene.title}\n\n`

  // Frontmatter
  markdown += `---\n`
  markdown += `category: ${scene.category}\n`
  if (scene.tags.length > 0) {
    markdown += `tags: [${scene.tags.map(t => `"${t}"`).join(', ')}]\n`
  }
  markdown += `---\n\n`

  // Context
  markdown += `## Context\n\n${scene.context}\n\n`

  // Solutions
  scene.solutions.forEach((solution) => {
    markdown += `## Solution: ${solution.problem.split('\n')[0]}\n\n`
    
    markdown += `### Problem\n\n${solution.problem}\n\n`
    
    markdown += `### Approach\n\n${solution.approach}\n\n`
    
    if (solution.keyPoints.length > 0) {
      markdown += `### Key Points\n\n`
      solution.keyPoints.forEach((kp) => {
        markdown += `- ${kp.title}: ${kp.description}\n`
        if (kp.tags.length > 0) {
          markdown += `  - Tags: ${kp.tags.join(', ')}\n`
        }
      })
      markdown += `\n`
    }
    
    if (solution.codeDemo) {
      markdown += `### Code Demo\n\n`
      markdown += `\`\`\`tsx\n${solution.codeDemo}\n\`\`\`\n\n`
    }

    if (solution.autoGenerated) {
      markdown += `> ⚠️ Auto-generated by ${solution.generator || 'unknown'}\n\n`
    }
  })

  return markdown
}

/**
 * 批量导出多个 Scene 为 Markdown
 */
export function exportScenesToMarkdown(scenes: Scene[]): string {
  return scenes.map(exportSceneToMarkdown).join('\n---\n\n')
}

/**
 * 下载 Markdown 文件
 */
export function downloadMarkdown(content: string, filename: string = 'scene.md'): void {
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
