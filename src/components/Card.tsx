import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={cn('bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6', className)}>
      {title && <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h3>}
      {children}
    </div>
  )
}
