# @tech-portfolio/ui

Reusable UI component library for tech portfolio projects.

## Installation

```bash
npm install @tech-portfolio/ui
# or
yarn add @tech-portfolio/ui
# or
pnpm add @tech-portfolio/ui
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@mui/material": "^5.0.0",
  "@mui/icons-material": "^5.0.0"
}
```

## Usage

### Primitives (Base Components)

```tsx
import { Button, Card, Badge } from '@tech-portfolio/ui'

function MyComponent() {
  return (
    <Card
      title="Card Title"
      subtitle="Card Subtitle"
      actions={<Button>Action</Button>}
    >
      <Badge label="New" color="primary" />
      Card content
    </Card>
  )
}
```

### Blocks (Block Components)

```tsx
import { CodeBlock, MarkdownViewer } from '@tech-portfolio/ui/blocks'

function MyComponent() {
  return (
    <>
      <CodeBlock code="const x = 1;" language="typescript" />
      <MarkdownViewer content="# Hello World" />
    </>
  )
}
```

### Domain (Domain Components)

```tsx
import { SceneViewer, SolutionPanel } from '@tech-portfolio/ui/domain'
import type { Scene, Solution } from '@tech-portfolio/schemas'

function MyComponent() {
  const scene: Scene = {
    id: '1',
    title: 'My Scene',
    context: 'Context...',
    category: 'React',
    tags: [],
    solutions: [],
  }

  return (
    <SceneViewer
      scene={scene}
      onGenerateDemo={async (solution) => {
        // Generate demo logic
      }}
    />
  )
}
```

## Component Structure

```
@tech-portfolio/ui
 ├─ primitives   # Button, Card, Badge
 ├─ blocks       # CodeBlock, MarkdownViewer
 └─ domain       # SceneViewer, SolutionPanel
```

## TypeScript Support

This package includes TypeScript definitions. All components are fully typed:

```tsx
import type {
  ButtonProps,
  CardProps,
  BadgeProps,
} from '@tech-portfolio/ui'

import type {
  CodeBlockProps,
  MarkdownViewerProps,
} from '@tech-portfolio/ui/blocks'

import type {
  SceneViewerProps,
  SolutionPanelProps,
} from '@tech-portfolio/ui/domain'
```

## No Router Dependency

This package does **not** depend on `react-router` or any routing library. All components are router-agnostic and can be used with any routing solution or without routing at all.

## License

MIT
