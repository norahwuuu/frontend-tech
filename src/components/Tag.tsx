import React from 'react'
import { Chip } from '@mui/material'
import type { ChipProps } from '@mui/material'

interface TagProps extends Omit<ChipProps, 'label' | 'variant'> {
  label: string
  variant?: 'outlined' | 'filled'
  size?: 'small' | 'medium'
  onClick?: () => void
}

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'outlined',
  size = 'small',
  onClick,
  ...props
}) => {
  return (
    <Chip
      label={label}
      variant={variant}
      size={size}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
        } : {},
      }}
      {...props}
    />
  )
}
