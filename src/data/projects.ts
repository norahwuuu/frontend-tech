/**
 * 项目数据（使用新的 Schema）
 * 所有数据必须通过 Zod 校验
 * 
 * 这是数据的单一真相来源（Single Source of Truth）
 */

import { validateAndFilter } from '@/utils/validation'
import { adaptProjectsToNewFormat } from '@/utils/dataAdapter'
import { projects as oldProjects } from './projectsData'
import { ProjectSchema } from '@/schemas'
import type { Project } from '@/schemas'

// 将旧格式数据转换为新格式
const adaptedProjects = adaptProjectsToNewFormat(oldProjects)

// 严格校验所有项目数据，过滤无效数据
const { valid: validatedProjects, invalid } = validateAndFilter(
  ProjectSchema,
  adaptedProjects,
  'Projects'
)

// 如果开发环境且有无效数据，输出警告
if (import.meta.env.DEV && invalid.length > 0) {
  console.warn(`[Data Validation] ${invalid.length} projects failed validation:`, invalid)
  // 在开发环境显示用户可见的警告
  if (typeof window !== 'undefined') {
    console.groupCollapsed('⚠️ Data Validation Warnings')
    invalid.forEach((item) => {
      console.warn(`Project at index ${item.index}:`, item.error)
      console.log('Invalid data:', item.data)
    })
    console.groupEnd()
  }
}

// 导出校验后的项目数据（这是唯一的数据源）
export const projects: Project[] = validatedProjects

// 导出技术栈列表（从校验后的数据提取）
export const allTechStack = Array.from(new Set(projects.flatMap(p => p.techStack))).sort()

// 根据 ID 获取项目
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}
