# API 服务使用指南

## 类型安全 + 运行时校验

本项目使用 **Zod** 进行 API 类型定义和运行时校验，确保类型安全和数据验证。

## 基本用法

### 1. 定义 API Schema

```typescript
import { z } from 'zod'
import { ApiResponseSchema } from '@/services/api.types'

// 定义数据 Schema
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).max(150),
})

// 定义 API 响应 Schema
const GetUserResponseSchema = ApiResponseSchema(UserSchema)
```

### 2. 使用 API 请求函数

```typescript
import { apiGet, apiPost } from '@/services/api'
import { GetUserResponseSchema } from './schemas'

// GET 请求
const response = await apiGet('/users/123', GetUserResponseSchema)
// response 的类型是自动推断的，完全类型安全
console.log(response.data.name) // ✅ TypeScript 知道这是 string

// POST 请求
const createResponse = await apiPost(
  '/users',
  GetUserResponseSchema,
  { name: 'John', email: 'john@example.com', age: 30 }
)
```

### 3. 使用 API Hooks

```typescript
import { useGet, usePost } from '@/hooks/useApi'
import { GetUserResponseSchema } from './schemas'

function UserProfile({ userId }: { userId: string }) {
  // GET 请求 Hook
  const { data, loading, error, execute } = useGet(
    `/users/${userId}`,
    GetUserResponseSchema,
    true // immediate: 立即执行
  )

  // POST 请求 Hook
  const { execute: createUser } = usePost('/users', GetUserResponseSchema)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return null

  return (
    <div>
      <h1>{data.data.name}</h1>
      <p>{data.data.email}</p>
    </div>
  )
}
```

## 错误处理

```typescript
import { apiGet, handleApiError, ApiValidationError, ApiRequestError } from '@/services/api'

try {
  const response = await apiGet('/users/123', UserSchema)
} catch (error) {
  if (error instanceof ApiValidationError) {
    // 数据验证失败
    console.error('Validation errors:', error.errors)
  } else if (error instanceof ApiRequestError) {
    // HTTP 请求失败
    console.error('Request failed:', error.status, error.message)
  } else {
    // 其他错误
    console.error(handleApiError(error))
  }
}
```

## 分页响应

```typescript
import { PaginatedResponseSchema } from '@/services/api.types'

const UsersListSchema = PaginatedResponseSchema(UserSchema)

const response = await apiGet('/users?page=1&pageSize=10', UsersListSchema)
// response.items: User[]
// response.total: number
// response.page: number
// response.pageSize: number
// response.totalPages: number
```

## 优势

1. **类型安全**: TypeScript 编译时类型检查
2. **运行时校验**: Zod 在运行时验证 API 响应数据
3. **自动类型推断**: 无需手动定义类型，Zod Schema 自动生成
4. **错误处理**: 清晰的错误类型和错误信息
5. **代码分割**: 页面组件使用懒加载，减少初始 bundle 大小
