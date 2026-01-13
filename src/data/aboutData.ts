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
  location?: string
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
  type: 'Email' | 'GitHub' | 'LinkedIn' | 'Blog' | 'Twitter' | 'Phone' | 'Other'
  value: string
  link?: string
  icon?: string
}

export interface AboutData {
  name: string
  title: string
  location?: string
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
  name: 'Haonan Wu',
  title: 'Lead Frontend Engineer',
  location: 'Essen, Germany',
  bio: 'Senior Frontend Engineer with 10+ years of experience building complex, performance-critical web applications in international teams. Strong expertise in React, TypeScript and frontend architecture, with proven ownership of system design, cross-team collaboration and delivery in English-speaking environments. Currently based in Germany and seeking senior frontend roles with long-term growth.',
  motto: 'Building the future of the web, one component at a time.',
  education: [
    {
      school: 'Jilin Normal University',
      degree: 'Bachelor of Telecommunications Engineering',
      startDate: '2010-09',
      endDate: '2014-06',
      description: [
        'Focus on Telecommunications Engineering and Signal Processing',
        'Graduated with honors',
      ],
    },
  ],
  workExperience: [
    {
      company: 'Ulab',
      position: 'Frontend Team Leader',
      location: 'Chengdu, China',
      startDate: '2021-01',
      endDate: '2024-12',
      description: [
        'Owned frontend architecture and delivery for a medical/orthodontic platform built with React, TypeScript and Redux Toolkit, leading key technical decisions across the frontend domain',
        'Designed a scalable component-driven architecture, improving maintainability, reuse and team onboarding efficiency',
        'Introduced WebAssembly + Web Worker for heavy 3D mesh computation, offloading work from the main thread and reducing rendering time from 1.2s to 700ms',
        'Acted as the primary frontend interface for the C++ / WebAssembly team, aligning data contracts, debugging workflows and performance expectations',
        'Established CI/CD pipelines and frontend standards, improving release reliability, delivery velocity and mentoring junior developers',
      ],
    },
    {
      company: 'Key Studio',
      position: 'Frontend Developer',
      location: 'Kuala Lumpur, Malaysia',
      startDate: '2017-11',
      endDate: '2020-05',
      description: [
        'Designed and developed scalable front-end applications using Vue, React, React Native, Redux and TypeScript for web and mobile platforms',
        'Built reusable UI components, custom hooks and shared libraries to improve maintainability and development speed',
        'Optimised application performance through code splitting, memoisation and bundle optimisation',
        'Collaborated closely with backend engineers to integrate RESTful APIs',
      ],
    },
    {
      company: 'RoseFinish',
      position: 'Web Developer',
      location: 'Beijing, China',
      startDate: '2014-01',
      endDate: '2017-11',
      description: [
        'Developed and maintained full-stack web applications using Java (Spring Boot) and AngularJS / Vue.js',
        'Built RESTful APIs and supported high-volume financial data systems',
        'Delivered real-time data visualisation dashboards and analytics tools',
      ],
    },
  ],
  skills: [
    { tech: 'React', level: 10, category: 'Frontend' },
    { tech: 'TypeScript', level: 10, category: 'Language' },
    { tech: 'JavaScript', level: 10, category: 'Language' },
    { tech: 'Redux Toolkit', level: 9, category: 'State Management' },
    { tech: 'React Native', level: 8, category: 'Mobile' },
    { tech: 'Vue.js', level: 8, category: 'Framework' },
    { tech: 'WebAssembly', level: 8, category: 'Advanced' },
    { tech: 'Web Worker', level: 8, category: 'Advanced' },
    { tech: 'HTML5', level: 10, category: 'Fundamental' },
    { tech: 'CSS3', level: 10, category: 'Fundamental' },
    { tech: 'Java (Spring Boot)', level: 7, category: 'Backend' },
    { tech: 'Python', level: 6, category: 'Backend' },
    { tech: 'AngularJS', level: 7, category: 'Framework' },
    { tech: 'Vite', level: 9, category: 'Build Tools' },
    { tech: 'Git', level: 9, category: 'Tools' },
    { tech: 'GitHub Actions', level: 8, category: 'DevOps' },
    { tech: 'Jira', level: 7, category: 'Tools' },
  ],
  languages: [
    { language: 'Chinese', level: 'Native', proficiency: 10 },
    { language: 'English', level: 'Business fluent', proficiency: 8 },
    { language: 'German', level: 'Basic proficiency', proficiency: 4 },
  ],
  contacts: [
    {
      type: 'Email',
      value: 'norah.wuuu@gmail.com',
      link: 'mailto:norah.wuuu@gmail.com',
    },
    {
      type: 'Phone',
      value: '+49 17660876657',
      link: 'tel:+4917660876657',
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/haonan-wu-890639344',
      link: 'https://www.linkedin.com/in/haonan-wu-890639344',
    },
    {
      type: 'GitHub',
      value: 'github.com/norahwuuu',
      link: 'https://github.com/norahwuuu',
    },
  ],
  resumeUrl: '/resume/NorahWu_Resume.pdf',
}
