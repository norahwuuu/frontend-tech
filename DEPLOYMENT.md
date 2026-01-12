# 部署指南

本指南介绍如何将项目部署到 Vercel 或 Netlify，并配置自定义域名和 SSL。

## 📦 部署前准备

### 1. 环境变量

创建 `.env.production` 文件（如果需要）：

```env
VITE_API_BASE_URL=https://api.example.com
```

### 2. 构建项目

确保项目可以正常构建：

```bash
npm run build
```

## 🚀 Vercel 部署

### 方法一：通过 Vercel Dashboard

1. **登录 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "New Project"
   - 选择你的 Git 仓库
   - Vercel 会自动检测 Vite 项目

3. **配置项目**
   - Framework Preset: `Vite`
   - Build Command: `npm run build` (自动检测)
   - Output Directory: `dist` (自动检测)
   - Install Command: `npm install` (自动检测)

4. **环境变量**
   - 在项目设置中添加环境变量
   - 添加 `VITE_API_BASE_URL` 等变量

5. **部署**
   - 点击 "Deploy"
   - 等待构建完成

### 方法二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

### 配置自定义域名

1. **添加域名**
   - 进入项目设置 → Domains
   - 点击 "Add Domain"
   - 输入你的域名（如 `example.com`）

2. **DNS 配置**
   - 根据 Vercel 提供的 DNS 记录配置你的域名
   - 通常需要添加 CNAME 记录：
     ```
     Type: CNAME
     Name: @ 或 www
     Value: cname.vercel-dns.com
     ```

3. **SSL 证书**
   - Vercel 自动为所有域名提供免费 SSL 证书
   - 证书会自动续期，无需手动配置

## 🌐 Netlify 部署

### 方法一：通过 Netlify Dashboard

1. **登录 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 使用 GitHub/GitLab/Bitbucket 账号登录

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 Git 仓库

3. **配置构建**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - 点击 "Deploy site"

4. **环境变量**
   - 进入 Site settings → Environment variables
   - 添加 `VITE_API_BASE_URL` 等变量

### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy

# 生产环境部署
netlify deploy --prod
```

### 配置自定义域名

1. **添加域名**
   - 进入 Site settings → Domain management
   - 点击 "Add custom domain"
   - 输入你的域名

2. **DNS 配置**
   - 根据 Netlify 提供的 DNS 记录配置
   - 通常需要添加 CNAME 记录：
     ```
     Type: CNAME
     Name: @ 或 www
     Value: your-site.netlify.app
     ```
   - 或者 A 记录：
     ```
     Type: A
     Name: @
     Value: 75.2.60.5 (Netlify 提供的 IP)
     ```

3. **SSL 证书**
   - Netlify 自动为所有域名提供免费 SSL 证书
   - 在 Domain management 中可以看到证书状态
   - 证书会自动续期

## 🔒 SSL 证书配置

### Vercel
- ✅ 自动配置，无需手动操作
- ✅ 支持 Let's Encrypt 证书
- ✅ 自动续期

### Netlify
- ✅ 自动配置，无需手动操作
- ✅ 支持 Let's Encrypt 证书
- ✅ 自动续期

### 验证 SSL
部署后，访问 `https://your-domain.com` 确认 SSL 证书已生效。

## 📊 持续集成 (CI/CD)

### GitHub Actions (可选)

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

## 🧪 部署前测试

```bash
# 运行测试
npm run test

# 构建测试
npm run build

# 预览构建结果
npm run preview
```

## 📝 部署检查清单

- [ ] 项目可以正常构建
- [ ] 所有测试通过
- [ ] 环境变量已配置
- [ ] 域名 DNS 已配置
- [ ] SSL 证书已生效
- [ ] 生产环境功能正常

## 🔧 故障排查

### 构建失败
- 检查 Node.js 版本（推荐 18+）
- 检查依赖是否正确安装
- 查看构建日志中的错误信息

### 路由 404
- 确保配置了 SPA 路由重定向（已在配置文件中）
- Vercel: 检查 `vercel.json` 中的 rewrites
- Netlify: 检查 `netlify.toml` 中的 redirects

### 环境变量未生效
- 确保在平台设置中添加了环境变量
- 重新部署项目使环境变量生效
- 检查变量名是否正确（Vite 需要 `VITE_` 前缀）

## 📚 相关资源

- [Vercel 文档](https://vercel.com/docs)
- [Netlify 文档](https://docs.netlify.com)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
