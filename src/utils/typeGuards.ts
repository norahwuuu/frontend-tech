/**
 * Type Guards - 类型守卫
 * 用于运行时类型检查
 */

import { SceneSchema, ProjectSchema, BlogArticleSchema, SolutionSchema, KeyPointSchema } from '@/schemas'
import type { Scene, Project, BlogArticle, Solution, KeyPoint } from '@/schemas'

/**
 * 检查是否为有效的 Scene
 */
export function isScene(data: unknown): data is Scene {
  return SceneSchema.safeParse(data).success
}

/**
 * 检查是否为有效的 Project
 */
export function isProject(data: unknown): data is Project {
  return ProjectSchema.safeParse(data).success
}

/**
 * 检查是否为有效的 BlogArticle
 */
export function isBlogArticle(data: unknown): data is BlogArticle {
  return BlogArticleSchema.safeParse(data).success
}

/**
 * 检查是否为有效的 Solution
 */
export function isSolution(data: unknown): data is Solution {
  return SolutionSchema.safeParse(data).success
}

/**
 * 检查是否为有效的 KeyPoint
 */
export function isKeyPoint(data: unknown): data is KeyPoint {
  return KeyPointSchema.safeParse(data).success
}

/**
 * 安全地获取 Scene，失败时返回 undefined
 */
export function asScene(data: unknown): Scene | undefined {
  const result = SceneSchema.safeParse(data)
  return result.success ? result.data : undefined
}

/**
 * 安全地获取 Project，失败时返回 undefined
 */
export function asProject(data: unknown): Project | undefined {
  const result = ProjectSchema.safeParse(data)
  return result.success ? result.data : undefined
}

/**
 * 安全地获取 BlogArticle，失败时返回 undefined
 */
export function asBlogArticle(data: unknown): BlogArticle | undefined {
  const result = BlogArticleSchema.safeParse(data)
  return result.success ? result.data : undefined
}
