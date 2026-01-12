/**
 * UI Component Library - 可复用组件库
 * 
 * 组件分层：
 * - primitives: 基础组件（Button, Card, Badge）
 * - blocks: 块级组件（CodeBlock, MarkdownViewer）
 * - domain: 领域组件（SceneViewer, SolutionPanel）
 * 
 * 使用规范：
 * - primitives 不依赖任何业务逻辑
 * - blocks 不依赖业务逻辑，只依赖通用库
 * - domain 组件只依赖 schema 类型，不依赖具体业务实现
 * 
 * @example
 * ```tsx
 * // 使用基础组件
 * import { Button, Card, Badge } from '@/ui'
 * 
 * // 使用块级组件
 * import { CodeBlock, MarkdownViewer } from '@/ui/blocks'
 * 
 * // 使用领域组件
 * import { SceneViewer, SolutionPanel } from '@/ui/domain'
 * ```
 */

// Primitives
export * from './primitives'

// Blocks
export * from './blocks'

// Domain
export * from './domain'
