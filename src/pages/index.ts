// 页面组件导出 - 使用懒加载
import { lazy } from 'react'

// 懒加载页面组件，实现代码分割
export const Home = lazy(() => import('./Home').then(module => ({ default: module.Home })))
export const Knowledge = lazy(() => import('./Knowledge').then(module => ({ default: module.Knowledge })))
export const Projects = lazy(() => import('./Projects').then(module => ({ default: module.Projects })))
export const Blog = lazy(() => import('./Blog').then(module => ({ default: module.Blog })))
export const About = lazy(() => import('./About').then(module => ({ default: module.About })))
