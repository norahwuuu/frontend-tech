/**
 * useErrorHandler - 错误处理 Hook
 * 提供统一的错误处理机制
 */

import { useState, useCallback } from 'react'

export interface ErrorState {
  message: string
  severity: 'error' | 'warning' | 'info' | 'success'
  open: boolean
}

/**
 * 错误处理 Hook
 * 
 * @example
 * ```tsx
 * const { error, showError, clearError } = useErrorHandler()
 * 
 * try {
 *   // some operation
 * } catch (err) {
 *   showError(err.message)
 * }
 * ```
 */
export function useErrorHandler() {
  const [error, setError] = useState<ErrorState>({
    message: '',
    severity: 'error',
    open: false,
  })

  const showError = useCallback((message: string, severity: ErrorState['severity'] = 'error') => {
    setError({
      message,
      severity,
      open: true,
    })
  }, [])

  const showWarning = useCallback((message: string) => {
    showError(message, 'warning')
  }, [showError])

  const showInfo = useCallback((message: string) => {
    showError(message, 'info')
  }, [showError])

  const showSuccess = useCallback((message: string) => {
    showError(message, 'success')
  }, [showError])

  const clearError = useCallback(() => {
    setError((prev) => ({ ...prev, open: false }))
  }, [])

  return {
    error,
    showError,
    showWarning,
    showInfo,
    showSuccess,
    clearError,
  }
}
