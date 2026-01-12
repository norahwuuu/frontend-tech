/**
 * Badge - 基础徽章组件
 * 不依赖任何业务逻辑，可在任何项目中使用
 */

import React from 'react'
import { Chip, ChipProps } from '@mui/material'

export interface BadgeProps extends Omit<ChipProps, 'label'> {
  /**
   * 徽章文本
   */
  label: string
  /**
   * 徽章颜色
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  /**
   * 徽章变体
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined'
  /**
   * 徽章大小
   * @default 'medium'
   */
  size?: 'small' | 'medium'
  /**
   * 点击事件
   */
  onClick?: () => void
}

/**
 * 基础徽章组件
 * 
 * @example
 * ```tsx
 * <Badge label="New" color="primary" />
 * <Badge label="Tag" variant="outlined" onClick={handleClick} />
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  color = 'default',
  variant = 'filled',
  size = 'medium',
  onClick,
  ...props
}) => {
  return (
    <Chip
      label={label}
      color={color}
      variant={variant}
      size={size}
      onClick={onClick}
      clickable={!!onClick}
      {...props}
    />
  )
}
