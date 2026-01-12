export interface Education {
  school: string
  degree: string
  startDate: string
  endDate: string
  description?: string[]
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate: string | 'Present'
  description: string[]
}

export interface Skill {
  tech: string
  level: number // 1-10
  category?: string
}

export interface Language {
  language: string
  level: string // Native, B2, A1, etc.
  proficiency?: number // 1-10 for visualization
}

export interface Contact {
  type: 'Email' | 'GitHub' | 'LinkedIn' | 'Blog' | 'Twitter' | 'Other'
  value: string
  link?: string
  icon?: string
}

export interface AboutData {
  name: string
  title: string
  avatarUrl?: string
  bio: string
  motto?: string
  education: Education[]
  workExperience: WorkExperience[]
  skills: Skill[]
  languages: Language[]
  contacts: Contact[]
  resumeUrl?: string
}

export const aboutData: AboutData = {
  name: 'Norah Wu',
  title: 'Senior Frontend Developer | React & TypeScript Expert | Frontend Performance Optimizer',
  bio: '10 years of frontend development experience, specializing in React ecosystem, TypeScript, performance optimization, and complex state management. Passionate about building exceptional user experiences through clean, maintainable code.',
  motto: 'Building the future of the web, one component at a time.',
  education: [
    {
      school: 'University of Technology',
      degree: 'Bachelor of Computer Science',
      startDate: '2010-09',
      endDate: '2014-06',
      description: [
        'Focus on Software Engineering and Web Development',
        'Graduated with honors',
      ],
    },
  ],
  workExperience: [
    {
      company: 'ULab',
      position: 'Senior Frontend Engineer',
      startDate: '2022-05',
      endDate: 'Present',
      description: [
        'Lead React + TypeScript project architecture design and implementation',
        'Implemented WebAssembly + Web Worker for high-performance frontend computing',
        'Optimized frontend performance, improving rendering efficiency by 30%',
        'Mentored junior developers and established coding standards',
      ],
    },
    {
      company: 'Tech Startup Inc.',
      position: 'Frontend Developer',
      startDate: '2018-03',
      endDate: '2022-04',
      description: [
        'Developed and maintained multiple React applications',
        'Built reusable component library with TypeScript',
        'Collaborated with design team to implement pixel-perfect UIs',
        'Improved application load time by 40% through code splitting',
      ],
    },
    {
      company: 'Digital Agency',
      position: 'Junior Frontend Developer',
      startDate: '2014-07',
      endDate: '2018-02',
      description: [
        'Built responsive websites using HTML, CSS, and JavaScript',
        'Learned modern frameworks: React, Vue.js',
        'Participated in agile development processes',
      ],
    },
  ],
  skills: [
    { tech: 'React', level: 10, category: 'Framework' },
    { tech: 'TypeScript', level: 9, category: 'Language' },
    { tech: 'JavaScript', level: 10, category: 'Language' },
    { tech: 'Redux / Zustand', level: 8, category: 'State Management' },
    { tech: 'WebAssembly', level: 7, category: 'Advanced' },
    { tech: 'Node.js', level: 7, category: 'Backend' },
    { tech: 'HTML/CSS', level: 10, category: 'Fundamental' },
    { tech: 'Material UI', level: 9, category: 'UI Library' },
    { tech: 'Vite / Webpack', level: 8, category: 'Build Tools' },
    { tech: 'Git', level: 9, category: 'Tools' },
    { tech: 'Jest / Testing Library', level: 8, category: 'Testing' },
    { tech: 'Docker', level: 6, category: 'DevOps' },
  ],
  languages: [
    { language: 'Chinese', level: 'Native', proficiency: 10 },
    { language: 'English', level: 'B2 (Upper Intermediate)', proficiency: 7 },
    { language: 'German', level: 'A1 (Beginner)', proficiency: 3 },
  ],
  contacts: [
    {
      type: 'Email',
      value: 'norah@example.com',
      link: 'mailto:norah@example.com',
    },
    {
      type: 'GitHub',
      value: 'github.com/norahwu',
      link: 'https://github.com/norahwu',
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/norahwu',
      link: 'https://linkedin.com/in/norahwu',
    },
    {
      type: 'Blog',
      value: 'norahwu.dev',
      link: 'https://norahwu.dev',
    },
  ],
  resumeUrl: '/resume/NorahWu_Resume.pdf',
}
