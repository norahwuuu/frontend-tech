/**
 * 类型安全的数据 Hooks
 * 确保所有数据都经过 Zod 校验
 */

import { useMemo } from 'react'
import { parseScene, parseScenes, parseProject, parseProjects, parseBlogArticle, parseBlogArticles } from '@/utils/validation'
import type { Scene, Project, BlogArticle } from '@/schemas'

/**
 * 使用校验后的场景数据
 * 如果数据未通过校验，会抛出错误
 */
export function useValidatedScene(data: unknown): Scene {
  return useMemo(() => parseScene(data), [data])
}

/**
 * 使用校验后的场景数组
 */
export function useValidatedScenes(data: unknown[]): Scene[] {
  return useMemo(() => parseScenes(data), [data])
}

/**
 * 使用校验后的项目数据
 */
export function useValidatedProject(data: unknown): Project {
  return useMemo(() => parseProject(data), [data])
}

/**
 * 使用校验后的项目数组
 */
export function useValidatedProjects(data: unknown[]): Project[] {
  return useMemo(() => parseProjects(data), [data])
}

/**
 * 使用校验后的博客文章数据
 */
export function useValidatedBlogArticle(data: unknown): BlogArticle {
  return useMemo(() => parseBlogArticle(data), [data])
}

/**
 * 使用校验后的博客文章数组
 */
export function useValidatedBlogArticles(data: unknown[]): BlogArticle[] {
  return useMemo(() => parseBlogArticles(data), [data])
}
