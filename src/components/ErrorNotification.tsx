/**
 * ErrorNotification - 全局错误通知组件
 * 用于显示应用级别的错误信息
 */

import React from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

export interface ErrorNotificationProps {
  /**
   * 错误消息
   */
  message: string
  /**
   * 错误类型
   */
  severity?: AlertColor
  /**
   * 是否显示
   */
  open: boolean
  /**
   * 关闭回调
   */
  onClose: () => void
  /**
   * 自动关闭时间（毫秒）
   * @default 6000
   */
  autoHideDuration?: number
}

/**
 * 错误通知组件
 * 
 * @example
 * ```tsx
 * <ErrorNotification
 *   message="Something went wrong"
 *   severity="error"
 *   open={true}
 *   onClose={() => setOpen(false)}
 * />
 * ```
 */
export const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  severity = 'error',
  open,
  onClose,
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
