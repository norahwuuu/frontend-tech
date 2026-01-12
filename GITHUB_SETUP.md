# GitHub 仓库设置指南

## 步骤 1: 在 GitHub 创建新仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息：
   - Repository name: `tech-portfolio` (或你喜欢的名称)
   - Description: "Tech Portfolio - 技术作品集与知识分享平台"
   - 选择 Public 或 Private
   - **不要**勾选 "Initialize this repository with a README"（因为本地已有代码）
4. 点击 "Create repository"

## 步骤 2: 连接本地仓库到 GitHub

创建仓库后，GitHub 会显示设置说明。运行以下命令：

```bash
# 添加远程仓库（将 YOUR_USERNAME 和 REPO_NAME 替换为你的实际值）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 或者使用 SSH（如果你配置了 SSH key）
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

## 步骤 3: 验证推送

访问你的 GitHub 仓库页面，确认所有文件都已上传。

## 后续推送

之后每次修改代码后，使用以下命令推送：

```bash
# 查看更改
git status

# 添加更改
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 GitHub
git push
```

## 使用 GitHub CLI（可选）

如果你安装了 GitHub CLI，可以使用：

```bash
# 安装 GitHub CLI（如果未安装）
# macOS: brew install gh
# 其他系统: https://cli.github.com/

# 登录
gh auth login

# 创建并推送仓库
gh repo create tech-portfolio --public --source=. --remote=origin --push
```

## 配置 GitHub Actions Secrets（如果需要）

如果使用 GitHub Actions 自动部署，需要在仓库设置中添加 Secrets：

1. 进入仓库 Settings → Secrets and variables → Actions
2. 添加以下 Secrets（如果使用 Vercel）：
   - `VERCEL_TOKEN`: Vercel API Token
   - `VERCEL_ORG_ID`: Vercel Organization ID
   - `VERCEL_PROJECT_ID`: Vercel Project ID

## 启用 GitHub Pages（可选）

如果你想使用 GitHub Pages 部署：

1. 进入仓库 Settings → Pages
2. Source 选择 "GitHub Actions"
3. 创建 `.github/workflows/pages.yml` 工作流文件
