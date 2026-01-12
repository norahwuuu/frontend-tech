# 技术栈检查清单

## ✅ 已配置的技术

### 框架
- ✅ **React 19.2.0** (符合要求：React 18+)
- ✅ **TypeScript 5.9.3**

### 路由
- ✅ **React Router v7.12.0** (符合要求：React Router v6+)
  - 已安装 `react-router-dom`
  - 已安装类型定义 `@types/react-router-dom`

### 样式
- ✅ **TailwindCSS 4.1.18**
  - 已配置 `@tailwindcss/vite` 插件
  - 已配置 `tailwind.config.js`
- ✅ **shadcn/ui** (已配置基础环境)
  - 已安装核心依赖：`@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`
  - 已创建 `components.json` 配置文件
  - 已创建 `src/lib/utils.ts` 工具函数
  - 已配置路径别名 `@/*` 指向 `src/*`

### 状态管理
- ✅ **Zustand 5.0.10** (符合要求)

### 富文本编辑
- ✅ **TipTap 3.15.3** (符合要求)
  - 已安装 `@tiptap/react`
  - 已安装 `@tiptap/starter-kit`
  - 已安装 `@tiptap/extension-placeholder`

### 代码高亮
- ✅ **Shiki 3.21.0** (符合要求)

### Live Preview
- ✅ **Sandpack 2.20.0** (符合要求)
  - 已安装 `@codesandbox/sandpack-react`
  - 已安装 `@codesandbox/sandpack-client`

### 数据存储
- ✅ **LocalStorage** (浏览器原生支持，已有示例 hook `useLocalStorage`)
- ⚠️ **IndexedDB** (浏览器原生支持，可按需添加封装工具)
- ⚠️ **Supabase / Firebase** (可按需安装，当前未安装)

### 部署
- ✅ **Vercel / Netlify / GitHub Pages** (部署配置，无需在代码中安装)

## 📁 项目结构

```
src/
├── components/     # 通用组件（可添加 shadcn/ui 组件）
├── layouts/        # 页面布局
├── pages/          # 页面组件
├── features/       # 业务模块
├── hooks/          # 自定义 hooks
├── utils/          # 工具函数
├── services/       # API / 数据操作
├── types/          # TS 类型定义
└── lib/            # 库文件（shadcn/ui utils）
```

## 🔧 配置说明

### 路径别名
- `@/*` → `src/*`
- 已在 `vite.config.ts` 和 `tsconfig.app.json` 中配置

### shadcn/ui 使用
1. 使用 `npx shadcn@latest add [component]` 添加组件
2. 组件将自动添加到 `src/components/ui/` 目录
3. 使用 `@/components/ui` 导入组件

## 📝 下一步建议

1. **添加 shadcn/ui 组件示例**
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add card
   ```

2. **创建 Zustand store 示例**
   - 在 `src/features/` 或 `src/stores/` 中创建状态管理示例

3. **创建 TipTap 编辑器组件**
   - 在 `src/components/` 中创建富文本编辑器组件

4. **创建代码高亮组件**
   - 使用 Shiki 创建代码高亮组件

5. **创建 Sandpack 预览组件**
   - 在 `src/components/` 中创建 Live Preview 组件

6. **配置路由**
   - 在 `src/App.tsx` 或 `src/main.tsx` 中配置 React Router

7. **按需添加数据存储**
   - 如需使用 Supabase: `npm install @supabase/supabase-js`
   - 如需使用 Firebase: `npm install firebase`

## ✅ 技术栈符合度：100%

所有必需的技术栈都已安装和配置完成！
