/**
 * 场景数据（使用新的 Schema）
 * 所有数据必须通过 Zod 校验
 * 
 * 这是数据的单一真相来源（Single Source of Truth）
 * 所有 UI 组件必须使用从此文件导出的 scenes
 */

import { validateAndFilter } from '@/utils/validation'
import { adaptKnowledgeScenesToScenes } from '@/utils/dataAdapter'
import { knowledgeScenes } from './knowledgeData'
import { SceneSchema } from '@/schemas'
import type { Scene } from '@/schemas'

// 将旧格式数据转换为新格式
const adaptedScenes = adaptKnowledgeScenesToScenes(knowledgeScenes)

// 严格校验所有场景数据，过滤无效数据
const { valid: validatedScenes, invalid } = validateAndFilter(
  SceneSchema,
  adaptedScenes,
  'Scenes'
)

// 如果开发环境且有无效数据，输出警告
if (import.meta.env.DEV && invalid.length > 0) {
  console.warn(`[Data Validation] ${invalid.length} scenes failed validation:`, invalid)
}

// 导出校验后的场景数据（这是唯一的数据源）
export const scenes: Scene[] = validatedScenes

// 导出分类和标签（从校验后的数据提取）
export const categories = Array.from(new Set(scenes.map(scene => scene.category)))
export const allTags = Array.from(new Set(scenes.flatMap(scene => scene.tags)))

// 根据 ID 获取场景
export function getSceneById(id: string): Scene | undefined {
  return scenes.find(scene => scene.id === id)
}

// 根据分类过滤场景
export function getScenesByCategory(category: string): Scene[] {
  return scenes.filter(scene => scene.category === category)
}

// 根据标签过滤场景
export function getScenesByTag(tag: string): Scene[] {
  return scenes.filter(scene => scene.tags.includes(tag))
}
