export interface BlogArticle {
  id: string
  title: string
  summary: string
  content: string // Markdown/HTML
  tags: string[]
  author: string
  date: string
  readingTime: number // 单位：分钟
  keyPoints?: string[]
  relatedArticles?: string[] // article id 数组
  category?: string
}

export const blogArticles: BlogArticle[] = [
  {
    id: 'b1',
    title: 'React Hooks 深入实践',
    summary: '总结 useState, useEffect, useReducer 的高级使用场景，包括副作用清理、复杂状态管理和自定义 Hooks 封装。',
    content: `# React Hooks 深入实践

React Hooks 为我们提供了在函数组件中使用状态和生命周期的方法。本文将深入探讨几个常用 Hooks 的高级使用场景。

## useEffect 清理副作用

\`\`\`typescript
import { useEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // 清理函数：组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组表示只在挂载和卸载时执行

  return size;
}
\`\`\`

## useReducer 管理复杂状态

\`\`\`typescript
import { useReducer } from 'react';

interface State {
  count: number;
  step: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
\`\`\`

## 自定义 Hooks 封装逻辑

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`

## 总结

通过合理使用 React Hooks，我们可以：

1. **管理副作用**：使用 useEffect 处理副作用并正确清理
2. **管理复杂状态**：使用 useReducer 替代多个 useState
3. **代码复用**：通过自定义 Hooks 封装可复用的逻辑

这些模式可以帮助我们编写更清晰、更易维护的 React 代码。`,
    tags: ['React', 'Hooks', 'TypeScript'],
    author: 'Norah Wu',
    date: '2026-01-12',
    readingTime: 8,
    category: 'React',
    keyPoints: [
      'useEffect 清理副作用',
      'useReducer 管理复杂状态',
      '自定义 Hooks 封装逻辑',
    ],
    relatedArticles: ['b2', 'b3'],
  },
  {
    id: 'b2',
    title: 'TypeScript 类型系统优化',
    summary: '利用泛型和联合类型提高代码可维护性，探索 TypeScript 高级类型技巧。',
    content: `# TypeScript 类型系统优化

TypeScript 的类型系统是它最强大的特性之一。本文将介绍如何利用泛型和联合类型来提高代码的可维护性。

## 泛型的使用

\`\`\`typescript
// 基础泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface Repository<T> {
  findById(id: string): T | undefined;
  save(entity: T): void;
  findAll(): T[];
}

// 泛型约束
interface HasId {
  id: string;
}

function updateEntity<T extends HasId>(entity: T, updates: Partial<T>): T {
  return { ...entity, ...updates };
}
\`\`\`

## 联合类型和类型守卫

\`\`\`typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

function isSuccess<T>(result: Result<T>): result is { success: true; data: T } {
  return result.success === true;
}

function handleResult<T>(result: Result<T>) {
  if (isSuccess(result)) {
    // TypeScript 知道这里 result.data 存在
    console.log(result.data);
  } else {
    // TypeScript 知道这里 result.error 存在
    console.error(result.error);
  }
}
\`\`\`

## 实用工具类型

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// Partial: 所有属性变为可选
type UserUpdate = Partial<User>;

// Pick: 选择特定属性
type UserPublic = Pick<User, 'id' | 'name'>;

// Omit: 排除特定属性
type UserWithoutId = Omit<User, 'id'>;

// Record: 创建对象类型
type UserRoles = Record<string, User[]>;
\`\`\`

## 总结

TypeScript 的类型系统提供了强大的工具来：

1. **提高类型安全**：通过泛型和约束确保类型正确
2. **增强代码可读性**：类型即文档
3. **减少运行时错误**：在编译时捕获类型错误`,
    tags: ['TypeScript', 'Types'],
    author: 'Norah Wu',
    date: '2026-01-10',
    readingTime: 6,
    category: 'TypeScript',
    keyPoints: [
      '泛型的使用和约束',
      '联合类型和类型守卫',
      '实用工具类型',
    ],
    relatedArticles: ['b1'],
  },
  {
    id: 'b3',
    title: 'Web 性能优化实战',
    summary: '从代码分割到资源优化，全面介绍现代 Web 应用的性能优化策略。',
    content: `# Web 性能优化实战

性能优化是现代 Web 开发的重要课题。本文将介绍从代码分割到资源优化的全面策略。

## 代码分割

\`\`\`typescript
import { lazy, Suspense } from 'react';

// 路由级别的代码分割
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
}

// 组件级别的代码分割
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
\`\`\`

## 图片优化

\`\`\`typescript
// 使用 WebP 格式
<img 
  src="image.webp" 
  srcSet="image.webp 1x, image@2x.webp 2x"
  loading="lazy"
  alt="Description"
/>

// 响应式图片
<picture>
  <source media="(min-width: 800px)" srcSet="large.jpg" />
  <source media="(min-width: 400px)" srcSet="medium.jpg" />
  <img src="small.jpg" alt="Description" />
</picture>
\`\`\`

## 资源预加载

\`\`\`html
<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style" />
<link rel="preload" href="critical.js" as="script" />

<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://api.example.com" />

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
\`\`\`

## 总结

性能优化的关键策略：

1. **代码分割**：减少初始加载时间
2. **资源优化**：压缩和优化图片、CSS、JS
3. **缓存策略**：合理使用浏览器缓存和 CDN`,
    tags: ['Performance', 'Optimization', 'Web'],
    author: 'Norah Wu',
    date: '2026-01-08',
    readingTime: 10,
    category: 'Performance',
    keyPoints: [
      '代码分割策略',
      '图片和资源优化',
      '缓存和预加载',
    ],
    relatedArticles: ['b1'],
  },
  {
    id: 'b4',
    title: 'CSS 架构最佳实践',
    summary: '探索现代 CSS 架构模式，包括 BEM、CSS Modules 和 CSS-in-JS 的适用场景。',
    content: `# CSS 架构最佳实践

良好的 CSS 架构可以提高代码的可维护性和可扩展性。本文将探讨几种主流的 CSS 架构模式。

## BEM 命名规范

\`\`\`css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--highlighted { }
.card__header--large { }
\`\`\`

## CSS Modules

\`\`\`typescript
// styles.module.css
.container {
  padding: 20px;
}

.title {
  font-size: 24px;
  color: #333;
}

// Component.tsx
import styles from './styles.module.css';

function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  );
}
\`\`\`

## CSS-in-JS

\`\`\`typescript
import { styled } from '@mui/material/styles';

const StyledButton = styled('button')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
\`\`\`

## 总结

选择合适的 CSS 架构取决于项目需求：

- **BEM**：适合传统项目，命名清晰
- **CSS Modules**：适合组件化项目，作用域隔离
- **CSS-in-JS**：适合 React 项目，动态样式`,
    tags: ['CSS', 'Architecture', 'Best Practices'],
    author: 'Norah Wu',
    date: '2026-01-05',
    readingTime: 7,
    category: 'CSS',
    keyPoints: [
      'BEM 命名规范',
      'CSS Modules 使用',
      'CSS-in-JS 方案',
    ],
  },
  {
    id: 'b5',
    title: 'WebAssembly 入门指南',
    summary: '了解 WebAssembly 的基础概念和实际应用场景，探索性能优化的新可能。',
    content: `# WebAssembly 入门指南

WebAssembly (WASM) 是一种低级的二进制格式，可以在现代 Web 浏览器中运行高性能代码。

## 什么是 WebAssembly

WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行：

- **高性能**：接近原生代码的执行速度
- **安全**：运行在沙箱环境中
- **可移植**：跨平台运行

## 基本使用

\`\`\`javascript
// 加载 WASM 模块
async function loadWasm() {
  const wasmModule = await WebAssembly.instantiateStreaming(
    fetch('module.wasm')
  );
  
  const { add } = wasmModule.instance.exports;
  console.log(add(2, 3)); // 5
}
\`\`\`

## 与 JavaScript 交互

\`\`\`javascript
// C/C++ 代码编译为 WASM
// add.c
int add(int a, int b) {
  return a + b;
}

// JavaScript 调用
const result = wasmModule.instance.exports.add(10, 20);
\`\`\`

## 应用场景

1. **图像处理**：高性能图像滤镜和转换
2. **游戏引擎**：3D 渲染和物理计算
3. **科学计算**：数值计算和模拟
4. **加密算法**：高性能加密解密

## 总结

WebAssembly 为 Web 应用带来了新的性能可能性，特别适合计算密集型任务。`,
    tags: ['WebAssembly', 'Performance', 'Advanced'],
    author: 'Norah Wu',
    date: '2026-01-03',
    readingTime: 12,
    category: 'Advanced',
    keyPoints: [
      'WebAssembly 基础概念',
      '与 JavaScript 交互',
      '实际应用场景',
    ],
  },
]

export const blogCategories = Array.from(
  new Set(blogArticles.map(article => article.category).filter((cat): cat is string => Boolean(cat)))
)

export const blogTags = Array.from(new Set(blogArticles.flatMap(article => article.tags))).sort()
