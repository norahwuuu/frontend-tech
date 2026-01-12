/**
 * API Hook - 提供类型安全的 API 调用
 */

import { useState, useCallback } from 'react'
import { apiGet, apiPost, apiPut, apiDelete, handleApiError } from '@/services/api'
import type { z } from 'zod'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: unknown[]) => Promise<void>
  reset: () => void
}

/**
 * 通用 API Hook
 */
export function useApi<T extends z.ZodTypeAny>(
  apiCall: (...args: unknown[]) => Promise<z.infer<T>>,
  immediate = false
): UseApiReturn<z.infer<T>> {
  const [state, setState] = useState<UseApiState<z.infer<T>>>({
    data: null,
    loading: immediate,
    error: null,
  })

  const execute = useCallback(
    async (...args: unknown[]) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      try {
        const data = await apiCall(...args)
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: handleApiError(error),
        })
      }
    },
    [apiCall]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  // 如果需要立即执行
  if (immediate && !state.data && !state.loading && !state.error) {
    execute()
  }

  return {
    ...state,
    execute,
    reset,
  }
}

/**
 * GET 请求 Hook
 */
export function useGet<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  immediate = false
) {
  return useApi(() => apiGet(endpoint, schema), immediate)
}

/**
 * POST 请求 Hook
 */
export function usePost<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T
) {
  return useApi((data: unknown) => apiPost(endpoint, schema, data), false)
}

/**
 * PUT 请求 Hook
 */
export function usePut<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T
) {
  return useApi((data: unknown) => apiPut(endpoint, schema, data), false)
}

/**
 * DELETE 请求 Hook
 */
export function useDelete<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T
) {
  return useApi(() => apiDelete(endpoint, schema), false)
}
