/**
 * API 类型定义
 * 使用 Zod 进行运行时类型校验
 */

import { z } from 'zod'

// 通用 API 响应结构
export function ApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean(),
  })
}

// 错误响应结构
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  code: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
})

// 分页响应结构
export function PaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  })
}

// 示例：知识场景 API 类型
export const KnowledgeSceneApiSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  solution: z.string(),
  codeExample: z.string().optional(),
  keyPoints: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// 示例：项目 API 类型
export const ProjectApiSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  techStack: z.array(z.string()),
  type: z.enum(['Tool', 'Experiment', 'FullStack']),
  status: z.enum(['completed', 'in-progress', 'archived']).optional(),
  keyPoints: z.array(z.string()).optional(),
  codeExample: z.string().optional(),
  demoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// 示例：博客文章 API 类型
export const BlogArticleApiSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  category: z.string().optional(),
  author: z.string(),
  date: z.string(),
  readingTime: z.number(),
  keyPoints: z.array(z.string()).optional(),
  relatedArticles: z.array(z.string()).optional(),
})

// 导出类型
export type KnowledgeSceneApi = z.infer<typeof KnowledgeSceneApiSchema>
export type ProjectApi = z.infer<typeof ProjectApiSchema>
export type BlogArticleApi = z.infer<typeof BlogArticleApiSchema>
export type ApiError = z.infer<typeof ApiErrorSchema>
