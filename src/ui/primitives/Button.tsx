/**
 * Button - 基础按钮组件
 * 不依赖任何业务逻辑，可在任何项目中使用
 */

import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  /**
   * 按钮变体
   * @default 'contained'
   */
  variant?: 'contained' | 'outlined' | 'text'
  /**
   * 按钮大小
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 是否全宽
   * @default false
   */
  fullWidth?: boolean
  /**
   * 点击事件
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * 子元素
   */
  children: React.ReactNode
}

/**
 * 基础按钮组件
 * 
 * @example
 * ```tsx
 * <Button variant="contained" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
      {...props}
    >
      {children}
    </MuiButton>
  )
}
