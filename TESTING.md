# 测试指南

本项目使用 **Vitest** 进行单元测试。

## 测试命令

```bash
# 运行测试（watch 模式）
npm run test

# 运行测试一次
npm run test:run

# 运行测试并显示 UI
npm run test:ui

# 运行测试并生成覆盖率报告
npm run test:coverage
```

## 测试文件结构

```
src/
├── test/
│   └── setup.ts          # 测试环境配置
├── utils/
│   └── formatDate.test.ts
├── services/
│   └── api.test.ts
└── components/
    └── LoadingFallback.test.tsx
```

## 编写测试

### 工具函数测试示例

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('should format Date object correctly', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date)
    expect(result).toContain('2024')
  })
})
```

### API 服务测试示例

```typescript
import { describe, it, expect, vi } from 'vitest'
import { apiRequest, ApiValidationError } from './api'
import { z } from 'zod'

describe('apiRequest', () => {
  it('should validate response with Zod schema', async () => {
    const schema = z.object({ data: z.string() })
    // Mock fetch...
  })
})
```

### React 组件测试示例

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingFallback } from './LoadingFallback'

describe('LoadingFallback', () => {
  it('should render loading message', () => {
    render(<LoadingFallback />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
```

## 测试覆盖率

运行 `npm run test:coverage` 生成覆盖率报告，报告会保存在 `coverage/` 目录。

## 持续集成

GitHub Actions 会在每次 push 时自动运行测试，配置文件位于 `.github/workflows/test.yml`。
