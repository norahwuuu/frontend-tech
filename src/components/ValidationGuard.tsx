/**
 * ValidationGuard - 数据校验保护组件
 * 确保传入的数据符合 Schema，不符合时显示错误
 */

import React from 'react'
import { Alert, Box, Typography } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'
import { ValidationError } from '@/utils/validation'
import { useLanguage } from '@/hooks/useLanguage'

interface ValidationGuardProps<T> {
  data: unknown
  schema: (data: unknown) => T
  fallback?: React.ReactNode
  children: (validData: T) => React.ReactElement
}

/**
 * 数据校验保护组件
 * 使用示例：
 * <ValidationGuard
 *   data={someData}
 *   schema={parseScene}
 *   fallback={<div>Loading...</div>}
 * >
 *   {(validScene) => <SceneViewer scene={validScene} />}
 * </ValidationGuard>
 */
export function ValidationGuard<T>({
  data,
  schema,
  fallback,
  children,
}: ValidationGuardProps<T>): React.ReactElement {
  const { t } = useLanguage()
  
  try {
    const validData = schema(data)
    return <>{children(validData)}</> as React.ReactElement
  } catch (error) {
    if (error instanceof ValidationError) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error" icon={<ErrorOutline />}>
            <Typography variant="h6" gutterBottom>
              {t.validation.validationFailed}
            </Typography>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
              {error.getFormattedErrors()}
            </Typography>
            {error.data !== undefined && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  {t.validation.rawData}:
                </Typography>
                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {JSON.stringify(error.data, null, 2)}
                </Typography>
              </Box>
            )}
          </Alert>
        </Box>
      )
    }
    
    if (fallback) {
      return <>{fallback}</> as React.ReactElement
    }
    
    return (
      <Alert severity="error">
        {t.validation.dataLoadFailed}: {error instanceof Error ? error.message : t.validation.unknownError}
      </Alert>
    ) as React.ReactElement
  }
}
