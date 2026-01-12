# 类型安全体系文档

## 核心理念

**前端模型 = 单一真相（Single Source of Truth）**

所有数据必须通过 Zod Schema 校验，确保：
- ✅ 类型安全（编译时 + 运行时）
- ✅ 防止接口变更导致的静默错误
- ✅ 为 AI 自动生成和 Markdown 导入提供基础

## 使用规范

### ❌ 禁止的做法

```typescript
// ❌ 禁止：直接使用 any
function processData(data: any) {
  // ...
}

// ❌ 禁止：直接使用未校验的数据
function Component({ scene }: { scene: unknown }) {
  return <div>{scene.title}</div> // 类型不安全！
}

// ❌ 禁止：绕过校验
const scene = knowledgeScenes[0] as Scene // 危险！
```

### ✅ 正确的做法

```typescript
// ✅ 正确：使用校验函数
import { parseScene } from '@/utils/validation'

function Component({ data }: { data: unknown }) {
  const scene = parseScene(data) // 自动校验
  return <div>{scene.title}</div> // 类型安全
}

// ✅ 正确：使用类型守卫
import { isScene } from '@/utils/typeGuards'

if (isScene(data)) {
  // TypeScript 知道 data 是 Scene 类型
  console.log(data.title)
}

// ✅ 正确：使用 ValidationGuard 组件
import { ValidationGuard } from '@/components/ValidationGuard'
import { parseScene } from '@/utils/validation'

<ValidationGuard data={unknownData} schema={parseScene}>
  {(validScene) => <SceneViewer scene={validScene} />}
</ValidationGuard>
```

## Schema 定义

所有核心模型都在 `src/schemas/index.ts` 中定义：

- `KeyPointSchema` - 技术要点
- `SolutionSchema` - 解决方案
- `SceneSchema` - 场景
- `ProjectSchema` - 项目
- `BlogArticleSchema` - 博客文章

## 数据校验流程

```
原始数据 (unknown)
    ↓
适配器转换 (dataAdapter)
    ↓
Zod 校验 (parseScene/parseProject/etc.)
    ↓
类型安全的数据 (Scene/Project/etc.)
    ↓
UI 组件使用
```

## 数据来源

所有数据必须从以下文件导入（已校验）：

- `src/data/scenes.ts` - 场景数据
- `src/data/projects.ts` - 项目数据
- `src/data/blogArticles.ts` - 博客文章数据

**禁止**直接从 `knowledgeData.ts`、`projectsData.ts`、`blogData.ts` 导入数据。

## 错误处理

校验失败时会：
1. 在控制台输出详细错误信息
2. 抛出 `ValidationError` 异常
3. 在开发环境下显示错误 UI

## 示例

### 从 API 获取数据

```typescript
import { parseScenes } from '@/utils/validation'

async function fetchScenes() {
  const response = await fetch('/api/scenes')
  const data = await response.json()
  // 必须校验
  return parseScenes(data)
}
```

### 从 Markdown 导入

```typescript
import { parseMarkdownToScene } from '@/utils/markdown'
import { parseScene } from '@/utils/validation'

const markdown = `# Scene: ...`
const scene = parseMarkdownToScene(markdown) // 内部已校验
```

### 在组件中使用

```typescript
import { scenes } from '@/data/scenes' // 已校验的数据
import type { Scene } from '@/schemas' // 类型定义

function MyComponent() {
  // scenes 已经是类型安全的 Scene[]
  return scenes.map(scene => <div key={scene.id}>{scene.title}</div>)
}
```
