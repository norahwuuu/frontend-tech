import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiRequest, ApiValidationError, ApiRequestError, handleApiError } from './api'
import { z } from 'zod'

// Mock fetch
const mockFetch = vi.fn()
globalThis.fetch = mockFetch as unknown as typeof fetch

describe('apiRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should make a successful API request and validate response', async () => {
    const schema = z.object({
      data: z.string(),
      success: z.boolean(),
    })

    const mockResponse = {
      data: 'test',
      success: true,
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response)

    const result = await apiRequest('/test', schema)
    expect(result).toEqual(mockResponse)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/test'),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      })
    )
  })

  it('should throw ApiRequestError on HTTP error', async () => {
    const schema = z.object({
      data: z.string(),
    })

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({ error: 'Not found' }),
    } as Response)

    await expect(apiRequest('/test', schema)).rejects.toThrow(ApiRequestError)
  })

  it('should throw ApiValidationError on validation failure', async () => {
    const schema = z.object({
      data: z.string(),
      success: z.boolean(),
    })

    const invalidResponse = {
      data: 123, // Should be string
      success: true,
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => invalidResponse,
    } as Response)

    await expect(apiRequest('/test', schema)).rejects.toThrow(ApiValidationError)
  })
})

describe('handleApiError', () => {
  it('should handle ApiValidationError', () => {
    // 创建一个真实的 Zod 验证错误
    const schema = z.object({
      data: z.string(),
    })
    const result = schema.safeParse({ data: 123 })
    if (!result.success) {
      const error = new ApiValidationError('Validation failed', result.error)
      const errorMessage = handleApiError(error)
      expect(errorMessage).toContain('Validation error')
    }
  })

  it('should handle ApiRequestError', () => {
    const error = new ApiRequestError('Not found', 404)
    const result = handleApiError(error)
    expect(result).toContain('Request error')
    expect(result).toContain('404')
  })

  it('should handle generic Error', () => {
    const error = new Error('Generic error')
    const result = handleApiError(error)
    expect(result).toBe('Generic error')
  })

  it('should handle unknown error', () => {
    const result = handleApiError('unknown')
    expect(result).toBe('Unknown error occurred')
  })
})
