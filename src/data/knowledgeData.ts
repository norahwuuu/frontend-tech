export interface KnowledgeScene {
  id: string
  title: string
  category: string
  tags: string[]
  description: string
  solution: string
  codeExample: {
    language: string
    code: string
  }
  keyPoints: Array<{
    title: string
    description: string
  }>
}

export const knowledgeScenes: KnowledgeScene[] = [
  {
    id: 'react-optimization',
    title: 'React Performance Optimization',
    category: 'React',
    tags: ['Performance', 'Optimization', 'Memoization'],
    description: 'Advanced techniques for optimizing React applications, including memoization, code splitting, and lazy loading.',
    solution: `React performance optimization is crucial for building fast and responsive applications. Here are the key strategies:

1. **Memoization**: Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders
2. **Code Splitting**: Implement lazy loading with React.lazy() and Suspense
3. **Virtualization**: Use libraries like react-window for long lists
4. **Bundle Optimization**: Analyze and optimize your bundle size with tools like webpack-bundle-analyzer`,
    codeExample: {
      language: 'tsx',
      code: `import React, { memo, useMemo, useCallback } from 'react';

// Memoize component
const ExpensiveComponent = memo(({ data, onUpdate }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }));
  }, [data]);

  // Memoize callbacks
  const handleClick = useCallback(() => {
    onUpdate(processedData);
  }, [processedData, onUpdate]);

  return (
    <div onClick={handleClick}>
      {processedData.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
});

// Lazy load components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}`
    },
    keyPoints: [
      {
        title: 'Memoization Strategy',
        description: 'Use React.memo for component memoization, useMemo for expensive calculations, and useCallback for function references.'
      },
      {
        title: 'Code Splitting',
        description: 'Implement route-based and component-based code splitting to reduce initial bundle size.'
      },
      {
        title: 'Bundle Analysis',
        description: 'Regularly analyze your bundle to identify and eliminate unnecessary dependencies.'
      }
    ]
  },
  {
    id: 'typescript-practices',
    title: 'TypeScript Best Practices',
    category: 'TypeScript',
    tags: ['Best Practices', 'Type Safety', 'Patterns'],
    description: 'Comprehensive guide to writing maintainable and type-safe TypeScript code with advanced patterns.',
    solution: `TypeScript best practices help you write more maintainable and type-safe code:

1. **Strict Type Checking**: Enable strict mode in tsconfig.json
2. **Type Inference**: Leverage TypeScript's type inference where possible
3. **Generic Types**: Use generics for reusable and flexible code
4. **Utility Types**: Utilize built-in utility types like Partial, Pick, Omit
5. **Discriminated Unions**: Use discriminated unions for type-safe state management`,
    codeExample: {
      language: 'typescript',
      code: `// Strict type checking
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Generic types
function createRepository<T extends { id: string }>() {
  const items: T[] = [];
  
  return {
    add(item: T) {
      items.push(item);
    },
    findById(id: string): T | undefined {
      return items.find(item => item.id === id);
    }
  };
}

// Utility types
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
type UserPublic = Omit<User, 'email'>;

// Discriminated unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

function fetchUser(id: string): Result<User> {
  // Implementation
  return { success: true, data: { id, name: 'John', email: 'john@example.com', role: 'user' } };
}`
    },
    keyPoints: [
      {
        title: 'Type Safety',
        description: 'Always prefer explicit types for function parameters and return values when inference is unclear.'
      },
      {
        title: 'Generic Patterns',
        description: 'Use generics to create reusable components and functions that work with multiple types.'
      },
      {
        title: 'Utility Types',
        description: 'Leverage TypeScript utility types to create new types from existing ones efficiently.'
      }
    ]
  },
  {
    id: 'css-architecture',
    title: 'Modern CSS Architecture',
    category: 'CSS',
    tags: ['Architecture', 'Tailwind', 'Design Systems'],
    description: 'Building scalable CSS architectures using Tailwind CSS, CSS Modules, and design systems.',
    solution: `Modern CSS architecture focuses on maintainability, scalability, and performance:

1. **Utility-First**: Use Tailwind CSS for rapid development
2. **Component-Based**: Organize styles with CSS Modules or styled-components
3. **Design Tokens**: Centralize design decisions with CSS variables
4. **Performance**: Minimize CSS bundle size and leverage critical CSS
5. **Maintainability**: Follow BEM or similar naming conventions when needed`,
    codeExample: {
      language: 'css',
      code: `/* Design Tokens */
:root {
  --color-primary: #1976d2;
  --color-secondary: #dc004e;
  --spacing-unit: 8px;
  --border-radius: 8px;
}

/* Component Styles */
.button {
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
  background-color: var(--color-primary);
  transition: all 0.2s ease;
}

.button:hover {
  background-color: color-mix(in srgb, var(--color-primary) 90%, black);
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-unit);
}

/* Responsive Design */
@media (min-width: 768px) {
  .container {
    padding: 0 calc(var(--spacing-unit) * 2);
  }
}`
    },
    keyPoints: [
      {
        title: 'Design Tokens',
        description: 'Use CSS variables to centralize design decisions and enable easy theming.'
      },
      {
        title: 'Component Organization',
        description: 'Organize styles by component to improve maintainability and reduce conflicts.'
      },
      {
        title: 'Performance Optimization',
        description: 'Minimize CSS bundle size, use critical CSS, and leverage modern CSS features for better performance.'
      }
    ]
  },
  {
    id: 'database-patterns',
    title: 'Database Design Patterns',
    category: 'Database',
    tags: ['Database', 'Design Patterns', 'SQL'],
    description: 'Exploring modern database design patterns and optimization strategies for web applications.',
    solution: `Effective database design is crucial for application performance and scalability:

1. **Normalization**: Follow database normalization rules to reduce redundancy
2. **Indexing Strategy**: Create appropriate indexes for frequently queried columns
3. **Query Optimization**: Write efficient queries and use EXPLAIN to analyze performance
4. **Connection Pooling**: Implement connection pooling to manage database connections
5. **Caching**: Use caching strategies to reduce database load`,
    codeExample: {
      language: 'sql',
      code: `-- Normalized schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Optimized query with JOIN
SELECT 
  u.name,
  p.title,
  p.created_at
FROM posts p
INNER JOIN users u ON p.user_id = u.id
WHERE p.created_at > NOW() - INTERVAL '7 days'
ORDER BY p.created_at DESC
LIMIT 10;`
    },
    keyPoints: [
      {
        title: 'Normalization',
        description: 'Follow normalization principles to eliminate data redundancy and ensure data integrity.'
      },
      {
        title: 'Indexing',
        description: 'Create indexes on frequently queried columns, but avoid over-indexing which can slow down writes.'
      },
      {
        title: 'Query Optimization',
        description: 'Use EXPLAIN to analyze query plans and optimize slow queries for better performance.'
      }
    ]
  },
  {
    id: 'state-management',
    title: 'State Management Patterns',
    category: 'React',
    tags: ['State Management', 'Redux', 'Zustand'],
    description: 'Modern state management patterns for React applications using Redux, Zustand, and Context API.',
    solution: `Choosing the right state management solution depends on your application's needs:

1. **Local State**: Use useState for component-specific state
2. **Context API**: For shared state across a component tree
3. **Zustand**: Lightweight state management for medium-sized applications
4. **Redux**: For complex applications with predictable state updates
5. **Server State**: Use React Query or SWR for server state management`,
    codeExample: {
      language: 'tsx',
      code: `// Zustand Store
import { create } from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<AppState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// Component usage
function Counter() {
  const { count, increment, decrement } = useStore();
  
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

// Context API for shared state
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`
    },
    keyPoints: [
      {
        title: 'State Location',
        description: 'Keep state as close to where it\'s used as possible. Lift state up only when necessary.'
      },
      {
        title: 'State Management Libraries',
        description: 'Choose state management libraries based on application complexity and team preferences.'
      },
      {
        title: 'Server State',
        description: 'Use specialized libraries like React Query for server state management to handle caching and synchronization.'
      }
    ]
  },
  {
    id: 'testing-strategies',
    title: 'Testing Strategies for React',
    category: 'Testing',
    tags: ['Testing', 'Jest', 'React Testing Library'],
    description: 'Comprehensive testing strategies for React applications including unit, integration, and E2E testing.',
    solution: `Effective testing ensures code quality and prevents regressions:

1. **Unit Tests**: Test individual components and functions in isolation
2. **Integration Tests**: Test component interactions and data flow
3. **E2E Tests**: Test complete user workflows
4. **Test Coverage**: Aim for meaningful coverage, not just high percentages
5. **Testing Tools**: Use Jest, React Testing Library, and Playwright/Cypress`,
    codeExample: {
      language: 'tsx',
      code: `// Component test with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Integration test
describe('UserForm', () => {
  it('submits form with user data', async () => {
    const onSubmit = jest.fn();
    render(<UserForm onSubmit={onSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    });
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
    });
  });
});`
    },
    keyPoints: [
      {
        title: 'Testing Pyramid',
        description: 'Follow the testing pyramid: many unit tests, fewer integration tests, and minimal E2E tests.'
      },
      {
        title: 'User-Centric Testing',
        description: 'Write tests from the user\'s perspective using React Testing Library\'s queries.'
      },
      {
        title: 'Test Maintenance',
        description: 'Keep tests maintainable by testing behavior, not implementation details.'
      }
    ]
  }
]

export const categories = Array.from(new Set(knowledgeScenes.map(scene => scene.category)))

export const allTags = Array.from(new Set(knowledgeScenes.flatMap(scene => scene.tags)))
