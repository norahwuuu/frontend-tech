/**
 * Markdown 导入/导出功能
 * 支持 Scene ↔ Markdown 双向转换
 * 确保知识可 Git 化、可迁移、可版本管理
 */

import type { Scene, Solution, KeyPoint } from '@/schemas'
import { parseScene, ValidationError } from './validation'

/**
 * Markdown 解析错误
 */
export class MarkdownParseError extends Error {
  constructor(message: string, public line?: number, public section?: string) {
    super(message)
    this.name = 'MarkdownParseError'
  }
}

/**
 * 解析 Markdown 为 Scene
 * 
 * 支持的格式：
 * ```markdown
 * # Scene: [标题]
 * 
 * ---
 * category: [分类]
 * tags: ["tag1", "tag2"]
 * ---
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
 * - [要点1标题]: [要点1描述]
 * - [要点2标题]: [要点2描述]
 * 
 * ### Code Demo
 * ```tsx
 * [代码示例]
 * ```
 * ```
 */
export function parseMarkdownToScene(markdown: string): Scene {
  const lines = markdown.split('\n')
  let currentLine = 0

  // 解析标题
  const titleMatch = lines[0]?.match(/^#\s*Scene:\s*(.+)$/i)
  if (!titleMatch) {
    throw new MarkdownParseError(
      'Missing or invalid Scene title. Expected format: "# Scene: [Title]"',
      1,
      'title'
    )
  }
  const title = titleMatch[1].trim()
  currentLine = 1

  // 解析 Frontmatter（可选）
  let category = 'General'
  let tags: string[] = []
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---\n/)
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1]
    const categoryMatch = frontmatter.match(/category:\s*(.+)/i)
    const tagsMatch = frontmatter.match(/tags:\s*\[(.+?)\]/i)
    
    if (categoryMatch) {
      category = categoryMatch[1].trim()
    }
    if (tagsMatch) {
      tags = tagsMatch[1]
        .split(',')
        .map(t => t.trim().replace(/['"]/g, ''))
        .filter(Boolean)
    }
    currentLine = markdown.substring(0, frontmatterMatch.index).split('\n').length + 2
  }

  // 解析 Context
  let contextStart = -1
  for (let i = currentLine; i < lines.length; i++) {
    if (lines[i]?.match(/^##\s+Context/i)) {
      contextStart = i + 1
      break
    }
  }

  if (contextStart === -1) {
    throw new MarkdownParseError(
      'Missing Context section. Expected "## Context"',
      currentLine,
      'context'
    )
  }

  // 提取 Context 内容（直到下一个 ## 标题）
  let context = ''
  for (let i = contextStart; i < lines.length; i++) {
    if (lines[i]?.match(/^##\s+/)) {
      break
    }
    if (lines[i]?.trim()) {
      context += lines[i] + '\n'
    }
  }
  context = context.trim()

  if (!context) {
    throw new MarkdownParseError(
      'Context section is empty',
      contextStart,
      'context'
    )
  }

  // 解析 Solutions
  const solutions: Solution[] = []
  let i = contextStart
  while (i < lines.length) {
    const solutionMatch = lines[i]?.match(/^##\s+Solution(?::\s*(.+))?$/i)
    if (solutionMatch) {
      const solutionTitle = solutionMatch[1]?.trim() || `Solution ${solutions.length + 1}`
      try {
        const solution = parseSolutionFromMarkdown(lines, i + 1, solutionTitle, i)
        solutions.push(solution.solution)
        i = solution.endLine
      } catch (error) {
        if (error instanceof MarkdownParseError) {
          throw error
        }
        throw new MarkdownParseError(
          `Failed to parse solution: ${error instanceof Error ? error.message : 'Unknown error'}`,
          i + 1,
          'solution'
        )
      }
    } else {
      i++
    }
  }

  if (solutions.length === 0) {
    throw new MarkdownParseError(
      'At least one Solution is required. Expected "## Solution"',
      contextStart,
      'solution'
    )
  }

  // 构建 Scene 对象
  const scene: Scene = {
    id: `scene-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title,
    context,
    category,
    tags,
    solutions,
    createdAt: new Date().toISOString(),
  }

  // 验证并返回
  try {
    return parseScene(scene)
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new MarkdownParseError(
        `Validation failed: ${error.getFormattedErrors()}`,
        undefined,
        'validation'
      )
    }
    throw error
  }
}

/**
 * 从 Markdown 解析单个 Solution
 */
function parseSolutionFromMarkdown(
  lines: string[],
  startLine: number,
  title: string,
  solutionStartLine: number
): { solution: Solution; endLine: number } {
  let i = startLine
  let problem = ''
  let approach = ''
  let codeDemo = ''
  const keyPoints: KeyPoint[] = []

  let currentSection = ''
  let inCodeBlock = false

  while (i < lines.length) {
    const line = lines[i] || ''
    
    // 遇到下一个 Solution 或 Scene 结束
    if (line.match(/^##\s+Solution/i) || line.match(/^#\s+/)) {
      break
    }

    // 处理代码块
    if (line.match(/^```/)) {
      if (!inCodeBlock) {
        // 开始代码块
        inCodeBlock = true
        if (currentSection === 'codedemo') {
          codeDemo = '' // 重置代码内容
        }
      } else {
        // 结束代码块
        inCodeBlock = false
        if (currentSection === 'codedemo') {
          codeDemo = codeDemo.trim()
        }
      }
      i++
      continue
    }

    if (inCodeBlock && currentSection === 'codedemo') {
      codeDemo += line + '\n'
      i++
      continue
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
        const colonIndex = pointText.indexOf(':')
        let pointTitle: string
        let pointDescription: string

        if (colonIndex > 0) {
          pointTitle = pointText.substring(0, colonIndex).trim()
          pointDescription = pointText.substring(colonIndex + 1).trim()
        } else {
          pointTitle = pointText
          pointDescription = pointText
        }

        keyPoints.push({
          id: `kp-${keyPoints.length + 1}`,
          title: pointTitle,
          description: pointDescription,
          tags: [],
        })
      }
    }

    i++
  }

  // 验证必需字段
  if (!problem.trim()) {
    throw new MarkdownParseError(
      `Solution "${title}" missing Problem section. Expected "### Problem"`,
      solutionStartLine,
      'problem'
    )
  }
  if (!approach.trim()) {
    throw new MarkdownParseError(
      `Solution "${title}" missing Approach section. Expected "### Approach"`,
      solutionStartLine,
      'approach'
    )
  }
  if (keyPoints.length === 0) {
    throw new MarkdownParseError(
      `Solution "${title}" requires at least one Key Point. Expected "### Key Points" with list items`,
      solutionStartLine,
      'keypoints'
    )
  }

  return {
    solution: {
      id: `solution-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      problem: problem.trim(),
      approach: approach.trim(),
      codeDemo: codeDemo || undefined,
      keyPoints,
      autoGenerated: false,
    },
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
  if (scene.createdAt) {
    markdown += `createdAt: ${scene.createdAt}\n`
  }
  markdown += `---\n\n`

  // Context
  markdown += `## Context\n\n${scene.context}\n\n`

  // Solutions
  scene.solutions.forEach((solution, index) => {
    const solutionTitle = solution.problem.split('\n')[0].substring(0, 50)
    markdown += `## Solution: ${solutionTitle}\n\n`
    
    markdown += `### Problem\n\n${solution.problem}\n\n`
    
    markdown += `### Approach\n\n${solution.approach}\n\n`
    
    if (solution.keyPoints.length > 0) {
      markdown += `### Key Points\n\n`
      solution.keyPoints.forEach((kp) => {
        markdown += `- ${kp.title}: ${kp.description}\n`
        if (kp.tags.length > 0) {
          markdown += `  - Tags: ${kp.tags.join(', ')}\n`
        }
        if (kp.tradeOffs) {
          const tradeOffs = Object.entries(kp.tradeOffs)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ')
          if (tradeOffs) {
            markdown += `  - Trade-offs: ${tradeOffs}\n`
          }
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

    if (index < scene.solutions.length - 1) {
      markdown += `---\n\n`
    }
  })

  return markdown
}

/**
 * 批量导出多个 Scene 为 Markdown
 */
export function exportScenesToMarkdown(scenes: Scene[]): string {
  return scenes.map((scene, index) => {
    const markdown = exportSceneToMarkdown(scene)
    return index < scenes.length - 1 ? `${markdown}\n\n---\n\n` : markdown
  }).join('\n\n')
}

/**
 * 下载 Markdown 文件
 */
export function downloadMarkdown(content: string, filename: string = 'scene.md'): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 验证 Markdown 格式
 */
export function validateMarkdownFormat(markdown: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // 检查标题
  if (!markdown.match(/^#\s*Scene:/i)) {
    errors.push('Missing Scene title. Expected "# Scene: [Title]"')
  }

  // 检查 Context
  if (!markdown.match(/^##\s+Context/i)) {
    errors.push('Missing Context section. Expected "## Context"')
  }

  // 检查至少一个 Solution
  const solutionMatches = markdown.match(/^##\s+Solution/gi)
  if (!solutionMatches || solutionMatches.length === 0) {
    errors.push('Missing Solution section. Expected at least one "## Solution"')
  }

  // 检查每个 Solution 的必需部分
  const solutions = markdown.split(/^##\s+Solution/gi).slice(1)
  solutions.forEach((solution, index) => {
    if (!solution.match(/^###\s+Problem/i)) {
      errors.push(`Solution ${index + 1} missing Problem section`)
    }
    if (!solution.match(/^###\s+Approach/i)) {
      errors.push(`Solution ${index + 1} missing Approach section`)
    }
    if (!solution.match(/^###\s+Key\s+Points/i)) {
      errors.push(`Solution ${index + 1} missing Key Points section`)
    }
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}
