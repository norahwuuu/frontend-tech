/**
 * 数据校验统一入口
 * 所有数据来源（mock / Markdown / AI / API）必须先过 Zod 校验
 */

import { z } from 'zod'
import {
  SceneSchema,
  SolutionSchema,
  KeyPointSchema,
  ProjectSchema,
  BlogArticleSchema,
  type Scene,
  type Solution,
  type KeyPoint,
  type Project,
  type BlogArticle,
} from '@/schemas'

/**
 * 校验错误信息
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodError,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ValidationError'
  }

  /**
   * 获取格式化的错误信息
   */
  getFormattedErrors(): string {
    return this.errors.issues
      .map((err) => {
        const path = err.path.join('.')
        return `${path}: ${err.message}`
      })
      .join('\n')
  }
}

/**
 * 安全解析数据，失败时抛出 ValidationError
 */
function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: string
): T {
  const result = schema.safeParse(data)
  
  if (!result.success) {
    const error = new ValidationError(
      `Validation failed for ${context}`,
      result.error,
      data
    )
    console.error(`[Validation Error] ${context}:`, error.getFormattedErrors())
    throw error
  }
  
  return result.data
}

/**
 * 解析场景数据
 */
export function parseScene(data: unknown): Scene {
  return safeParse(SceneSchema, data, 'Scene')
}

/**
 * 解析多个场景数据
 */
export function parseScenes(data: unknown): Scene[] {
  const arraySchema = z.array(SceneSchema)
  return safeParse(arraySchema, data, 'Scenes')
}

/**
 * 解析解决方案数据
 */
export function parseSolution(data: unknown): Solution {
  return safeParse(SolutionSchema, data, 'Solution')
}

/**
 * 解析技术要点数据
 */
export function parseKeyPoint(data: unknown): KeyPoint {
  return safeParse(KeyPointSchema, data, 'KeyPoint')
}

/**
 * 解析项目数据
 */
export function parseProject(data: unknown): Project {
  return safeParse(ProjectSchema, data, 'Project')
}

/**
 * 解析多个项目数据
 */
export function parseProjects(data: unknown): Project[] {
  const arraySchema = z.array(ProjectSchema)
  return safeParse(arraySchema, data, 'Projects')
}

/**
 * 解析博客文章数据
 */
export function parseBlogArticle(data: unknown): BlogArticle {
  return safeParse(BlogArticleSchema, data, 'BlogArticle')
}

/**
 * 解析多个博客文章数据
 */
export function parseBlogArticles(data: unknown): BlogArticle[] {
  const arraySchema = z.array(BlogArticleSchema)
  return safeParse(arraySchema, data, 'BlogArticles')
}

/**
 * 批量校验并过滤无效数据
 */
export function validateAndFilter<T>(
  schema: z.ZodSchema<T>,
  items: unknown[],
  context: string
): { valid: T[]; invalid: Array<{ index: number; error: string; data: unknown }> } {
  const valid: T[] = []
  const invalid: Array<{ index: number; error: string; data: unknown }> = []

  items.forEach((item, index) => {
    const result = schema.safeParse(item)
    if (result.success) {
      valid.push(result.data)
    } else {
      const error = new ValidationError(
        `Validation failed for ${context}[${index}]`,
        result.error,
        item
      )
      invalid.push({
        index,
        error: error.getFormattedErrors(),
        data: item,
      })
    }
  })

  if (invalid.length > 0) {
    console.warn(`[Validation] ${invalid.length} invalid items in ${context}:`, invalid)
  }

  return { valid, invalid }
}
