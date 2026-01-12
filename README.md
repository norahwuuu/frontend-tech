# Tech Portfolio - 技术作品集

一个现代化的前端技术作品集和知识分享平台，展示个人项目、技术文章和学习笔记。

## ✨ 特性

- 🎨 **现代化 UI** - 基于 Material UI 的响应式设计
- 🌍 **国际化** - 支持中英文切换
- 📱 **响应式布局** - 完美适配桌面端和移动端
- ⚡ **性能优化** - 代码分割和懒加载
- 🔒 **类型安全** - TypeScript + Zod 运行时校验
- 🧪 **单元测试** - Vitest 测试框架
- 🚀 **快速部署** - 支持 Vercel/Netlify 一键部署

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 7
- **UI 库**: Material UI 7
- **路由**: React Router v7
- **状态管理**: Zustand
- **国际化**: 自定义 i18n 方案
- **代码高亮**: Shiki
- **测试**: Vitest + Testing Library
- **类型校验**: Zod

## 📦 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🧪 测试

```bash
# 运行测试
npm run test

# 运行测试一次
npm run test:run

# 生成覆盖率报告
npm run test:coverage
```

## 📄 项目结构

```
src/
├── components/     # 通用组件
├── layouts/       # 布局组件
├── pages/         # 页面组件
├── hooks/         # 自定义 Hooks
├── services/      # API 服务
├── utils/         # 工具函数
├── i18n/          # 国际化配置
├── data/          # 静态数据
└── types/         # TypeScript 类型定义
```

## 🚀 部署

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/tech-portfolio)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/tech-portfolio)

详细部署说明请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📚 文档

- [部署指南](./DEPLOYMENT.md) - Vercel/Netlify 部署说明
- [测试指南](./TESTING.md) - 单元测试说明
- [技术栈文档](./TECH_STACK.md) - 技术选型说明

## 📝 License

MIT
