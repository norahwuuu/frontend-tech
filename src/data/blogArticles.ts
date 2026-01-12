/**
 * 博客文章数据（使用新的 Schema）
 * 所有数据必须通过 Zod 校验
 * 
 * 这是数据的单一真相来源（Single Source of Truth）
 */

import { validateAndFilter } from '@/utils/validation'
import { adaptBlogArticlesToNewFormat } from '@/utils/dataAdapter'
import { blogArticles as oldArticles } from './blogData'
import { BlogArticleSchema } from '@/schemas'
import type { BlogArticle } from '@/schemas'

// 将旧格式数据转换为新格式
const adaptedArticles = adaptBlogArticlesToNewFormat(oldArticles)

// 严格校验所有博客文章数据，过滤无效数据
const { valid: validatedArticles, invalid } = validateAndFilter(
  BlogArticleSchema,
  adaptedArticles,
  'BlogArticles'
)

// 如果开发环境且有无效数据，输出警告
if (import.meta.env.DEV && invalid.length > 0) {
  console.warn(`[Data Validation] ${invalid.length} blog articles failed validation:`, invalid)
}

// 导出校验后的博客文章数据（这是唯一的数据源）
export const blogArticles: BlogArticle[] = validatedArticles

// 导出分类和标签（从校验后的数据提取）
export const blogCategories = Array.from(
  new Set(blogArticles.map(article => article.category).filter((cat): cat is string => Boolean(cat)))
).sort()

export const blogTags = Array.from(new Set(blogArticles.flatMap(article => article.tags))).sort()

// 根据 ID 获取文章
export function getBlogArticleById(id: string): BlogArticle | undefined {
  return blogArticles.find(article => article.id === id)
}
