/**
 * Card - 基础卡片组件
 * 不依赖任何业务逻辑，可在任何项目中使用
 */

import React from 'react'
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardHeader,
  CardActions,
} from '@mui/material'

export interface CardProps extends Omit<MuiCardProps, 'elevation'> {
  /**
   * 卡片标题
   */
  title?: string
  /**
   * 卡片副标题
   */
  subtitle?: string
  /**
   * 卡片内容
   */
  children: React.ReactNode
  /**
   * 卡片操作区域（按钮等）
   */
  actions?: React.ReactNode
  /**
   * 是否显示阴影
   * @default true
   */
  elevated?: boolean
  /**
   * 点击事件
   */
  onClick?: () => void
}

/**
 * 基础卡片组件
 * 
 * @example
 * ```tsx
 * <Card
 *   title="Card Title"
 *   subtitle="Card Subtitle"
 *   actions={<Button>Action</Button>}
 * >
 *   Card content
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  elevated = true,
  onClick,
  ...props
}) => {
  return (
    <MuiCard
      elevation={elevated ? 2 : 0}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        ...props.sx,
      }}
      {...props}
    >
      {(title || subtitle) && (
        <CardHeader
          title={title}
          subheader={subtitle}
        />
      )}
      <CardContent>{children}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  )
}
