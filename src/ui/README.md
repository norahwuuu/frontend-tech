# UI Component Library

可复用的组件库，按照分层架构设计，支持独立发布和使用。

## 组件分层

```
/ui
 ├─ primitives   # 基础组件：Button, Card, Badge
 ├─ blocks       # 块级组件：CodeBlock, MarkdownViewer
 └─ domain       # 领域组件：SceneViewer, SolutionPanel
```

## 设计原则

### Primitives（基础组件）

- ✅ **不依赖任何业务逻辑**
- ✅ 可在任何项目中使用
- ✅ 只依赖 Material UI 等通用 UI 库
- ✅ 提供完整的 TypeScript 类型定义

**组件列表：**
- `Button` - 基础按钮组件
- `Card` - 基础卡片组件
- `Badge` - 基础徽章组件

### Blocks（块级组件）

- ✅ **不依赖业务逻辑**
- ✅ 只依赖通用库（如 shiki, react-markdown）
- ✅ 可在任何项目中使用
- ✅ 提供完整的 TypeScript 类型定义

**组件列表：**
- `CodeBlock` - 代码块组件（支持语法高亮和复制）
- `MarkdownViewer` - Markdown 查看器组件

### Domain（领域组件）

- ✅ **只依赖 schema 类型**
- ✅ 不依赖具体业务实现
- ✅ 通过 props 接收数据和回调
- ✅ 可在其他项目中使用（只要符合 schema）

**组件列表：**
- `SceneViewer` - 场景查看器组件
- `SolutionPanel` - 解决方案面板组件

## 使用示例

### 基础组件

```tsx
import { Button, Card, Badge } from '@/ui'

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

### 块级组件

```tsx
import { CodeBlock, MarkdownViewer } from '@/ui/blocks'

function MyComponent() {
  return (
    <>
      <CodeBlock code="const x = 1;" language="typescript" />
      <MarkdownViewer content="# Hello World" />
    </>
  )
}
```

### 领域组件

```tsx
import { SceneViewer } from '@/ui/domain'
import type { Scene } from '@/schemas'

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

## 类型安全

所有组件都提供完整的 TypeScript 类型定义：

```tsx
import type { ButtonProps, CardProps, BadgeProps } from '@/ui'
import type { CodeBlockProps, MarkdownViewerProps } from '@/ui/blocks'
import type { SceneViewerProps, SolutionPanelProps } from '@/ui/domain'
```

## 独立发布

组件库可以独立打包发布为 npm 包：

```json
{
  "name": "@your-org/ui-components",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    "./primitives": "./dist/primitives/index.js",
    "./blocks": "./dist/blocks/index.js",
    "./domain": "./dist/domain/index.js"
  }
}
```

## 依赖关系

```
primitives (无业务依赖)
    ↑
blocks (依赖 primitives + 通用库)
    ↑
domain (依赖 primitives + blocks + schema 类型)
```

## 最佳实践

1. **使用 primitives** 构建基础 UI
2. **使用 blocks** 构建复杂功能块
3. **使用 domain** 构建业务相关组件
4. **保持类型安全**，所有 props 都有类型定义
5. **保持可复用性**，避免硬编码业务逻辑
