import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format Date object correctly', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date)
    expect(result).toBeTruthy()
    expect(typeof result).toBe('string')
    expect(result).toContain('2024')
  })

  it('should format timestamp correctly', () => {
    const timestamp = new Date('2024-01-15').getTime()
    const result = formatDate(timestamp)
    expect(result).toBeTruthy()
    expect(typeof result).toBe('string')
  })

  it('should handle different dates', () => {
    const date1 = new Date('2024-01-15')
    const date2 = new Date('2024-12-31')
    
    expect(formatDate(date1)).toBeTruthy()
    expect(formatDate(date2)).toBeTruthy()
  })

  it('should return a formatted string', () => {
    const date = new Date('2024-01-15')
    const formatted = formatDate(date)
    expect(formatted).toBeTruthy()
    expect(typeof formatted).toBe('string')
  })

  it('should use custom format', () => {
    const date = new Date('2024-01-15T10:30:00')
    const formatted = formatDate(date, 'YYYY-MM-DD HH:mm')
    expect(formatted).toContain('2024-01-15')
    expect(formatted).toContain('10:30')
  })
})
