import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingFallback } from './LoadingFallback'

describe('LoadingFallback', () => {
  it('should render loading spinner and default message', () => {
    render(<LoadingFallback />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render custom message', () => {
    const customMessage = 'Please wait...'
    render(<LoadingFallback message={customMessage} />)
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it('should render circular progress', () => {
    const { container } = render(<LoadingFallback />)
    // Material UI CircularProgress renders as a circular SVG
    const progress = container.querySelector('[role="progressbar"]')
    expect(progress).toBeInTheDocument()
  })
})
