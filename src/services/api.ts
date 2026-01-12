/**
 * API 服务 - 类型安全 + 运行时校验
 */

import { z } from 'zod'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// 自定义错误类
export class ApiValidationError extends Error {
  errors: z.ZodError
  response?: unknown

  constructor(
    message: string,
    errors: z.ZodError,
    response?: unknown
  ) {
    super(message)
    this.name = 'ApiValidationError'
    this.errors = errors
    this.response = response
  }
}

export class ApiRequestError extends Error {
  status: number
  response?: unknown

  constructor(
    message: string,
    status: number,
    response?: unknown
  ) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.response = response
  }
}

/**
 * 类型安全的 API 请求函数
 * @param endpoint API 端点
 * @param schema Zod schema 用于验证响应数据
 * @param options Fetch 选项
 * @returns 验证后的类型安全数据
 */
export async function apiRequest<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  options: RequestInit = {}
): Promise<z.infer<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    // 检查 HTTP 状态
    if (!response.ok) {
      let errorData: unknown
      try {
        errorData = await response.json()
      } catch {
        errorData = { error: response.statusText }
      }
      
      throw new ApiRequestError(
        `API request failed: ${response.statusText}`,
        response.status,
        errorData
      )
    }

    // 解析 JSON
    const jsonData = await response.json()

    // 使用 Zod 验证数据
    try {
      const validatedData = schema.parse(jsonData)
      return validatedData
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiValidationError(
          'API response validation failed',
          error,
          jsonData
        )
      }
      throw error
    }
  } catch (error) {
    // 重新抛出已知错误
    if (error instanceof ApiRequestError || error instanceof ApiValidationError) {
      throw error
    }
    // 处理网络错误等其他错误
    throw new Error(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * GET 请求
 */
export async function apiGet<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  options?: RequestInit
): Promise<z.infer<T>> {
  return apiRequest(endpoint, schema, {
    method: 'GET',
    ...options,
  })
}

/**
 * POST 请求
 */
export async function apiPost<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  data?: unknown,
  options?: RequestInit
): Promise<z.infer<T>> {
  return apiRequest(endpoint, schema, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  })
}

/**
 * PUT 请求
 */
export async function apiPut<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  data?: unknown,
  options?: RequestInit
): Promise<z.infer<T>> {
  return apiRequest(endpoint, schema, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  })
}

/**
 * DELETE 请求
 */
export async function apiDelete<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  options?: RequestInit
): Promise<z.infer<T>> {
  return apiRequest(endpoint, schema, {
    method: 'DELETE',
    ...options,
  })
}

/**
 * 处理 API 错误的工具函数
 */
export function handleApiError(error: unknown): string {
  if (error instanceof ApiValidationError) {
    return `Validation error: ${error.errors.issues.map((e: z.ZodIssue) => e.message).join(', ')}`
  }
  if (error instanceof ApiRequestError) {
    return `Request error (${error.status}): ${error.message}`
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Unknown error occurred'
}
