/**
 * SceneViewer - 场景查看器组件
 * 支持多解决方案展示和 Demo 生成
 */

import React, { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Chip,
  Stack,
  Divider,
  Alert,
} from '@mui/material'
import { PlayArrow, Download } from '@mui/icons-material'
import { CodeBlock } from './CodeBlock'
import { DemoPreview } from './DemoPreview'
import { DemoVersionManager } from './DemoVersionManager'
import { type Scene, type Solution } from '@/schemas'
import { exportSceneToMarkdown, downloadMarkdown } from '@/utils/markdown'
import { generateDemo, type GeneratedDemo } from '@/utils/demoGenerator'
import { useLanguage } from '@/hooks/useLanguage'

interface SceneViewerProps {
  scene: Scene | null
  onGenerateDemo?: (solution: Solution, demoCode: string) => void
}

export const SceneViewer: React.FC<SceneViewerProps> = ({ scene, onGenerateDemo }) => {
  const { t } = useLanguage()
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0)
  const [generatingDemo, setGeneratingDemo] = useState(false)
  const [generatedDemos, setGeneratedDemos] = useState<Map<string, GeneratedDemo[]>>(new Map())
  const [currentDemo, setCurrentDemo] = useState<GeneratedDemo | null>(null)

  if (!scene) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {t.knowledge.selectScene}
        </Typography>
      </Box>
    )
  }

  const selectedSolution = scene.solutions[selectedSolutionIndex]

  const handleGenerateDemo = async () => {
    if (!selectedSolution) return

    setGeneratingDemo(true)
    try {
      const demo = await generateDemo(scene, selectedSolution, {
        techStack: ['React', 'TypeScript'],
        generator: 'template',
        template: 'basic',
      })

      // 保存到版本历史
      const solutionId = selectedSolution.id
      const existingVersions = generatedDemos.get(solutionId) || []
      const newVersion = {
        ...demo,
        version: existingVersions.length + 1,
      }
      const updatedVersions = [...existingVersions, newVersion]
      setGeneratedDemos(new Map(generatedDemos.set(solutionId, updatedVersions)))
      setCurrentDemo(newVersion)

      if (onGenerateDemo) {
        onGenerateDemo(selectedSolution, demo.code)
      }
    } catch (error) {
      console.error('Failed to generate demo:', error)
    } finally {
      setGeneratingDemo(false)
    }
  }

  const handleRegenerateDemo = async () => {
    await handleGenerateDemo()
  }

  const handleSelectVersion = (version: GeneratedDemo) => {
    setCurrentDemo(version)
  }

  const handleDeleteVersion = (versionId: string) => {
    if (!selectedSolution) return
    const solutionId = selectedSolution.id
    const versions = generatedDemos.get(solutionId) || []
    const updatedVersions = versions.filter(v => v.id !== versionId)
    setGeneratedDemos(new Map(generatedDemos.set(solutionId, updatedVersions)))
    if (currentDemo?.id === versionId) {
      setCurrentDemo(updatedVersions[0] || null)
    }
  }

  const handleRestoreVersion = (version: GeneratedDemo) => {
    setCurrentDemo(version)
  }

  // 获取当前解决方案的 Demo 版本
  const currentSolutionDemos = selectedSolution
    ? generatedDemos.get(selectedSolution.id) || []
    : []

  const handleExportMarkdown = () => {
    const markdown = exportSceneToMarkdown(scene)
    downloadMarkdown(markdown, `${scene.id}.md`)
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* 标题和基本信息 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          {scene.title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
          <Chip label={scene.category} color="primary" size="small" />
          {scene.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Context */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {t.knowledge.sceneContext}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
          {scene.context}
        </Typography>
      </Paper>

      {/* Solutions Tabs */}
      {scene.solutions.length > 1 && (
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={selectedSolutionIndex}
            onChange={(_, newValue) => setSelectedSolutionIndex(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {scene.solutions.map((solution, index) => (
              <Tab
                key={solution.id}
                label={`${t.knowledge.solution} ${index + 1}`}
                sx={{ textTransform: 'none' }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Selected Solution */}
      {selectedSolution && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              {t.knowledge.solution} {selectedSolutionIndex + 1}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<PlayArrow />}
                onClick={handleGenerateDemo}
                disabled={generatingDemo}
              >
                {generatingDemo ? t.markdown.generating : t.markdown.generateDemo}
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Download />}
                onClick={handleExportMarkdown}
              >
                {t.markdown.exportMarkdown}
              </Button>
            </Stack>
          </Box>

          {selectedSolution.autoGenerated && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {t.knowledge.autoGeneratedBy.replace('{generator}', selectedSolution.generator || 'unknown')}
            </Alert>
          )}

          {/* Problem */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {t.knowledge.problemDescription}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {selectedSolution.problem}
            </Typography>
          </Box>

          {/* Approach */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {t.knowledge.approach}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {selectedSolution.approach}
            </Typography>
          </Box>

          {/* Code Demo */}
          {selectedSolution.codeDemo && !currentDemo && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {t.knowledge.codeExample}
              </Typography>
              <CodeBlock code={selectedSolution.codeDemo} language="tsx" />
            </Box>
          )}

          {/* Generated Demo Preview */}
          {currentDemo && (
            <Box sx={{ mb: 3 }}>
              <DemoPreview
                demo={currentDemo}
                onRegenerate={handleRegenerateDemo}
                showCode={true}
              />
            </Box>
          )}

          {/* Version Manager */}
          {currentSolutionDemos.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <DemoVersionManager
                versions={currentSolutionDemos}
                currentVersion={currentDemo || currentSolutionDemos[0]}
                onSelectVersion={handleSelectVersion}
                onDeleteVersion={handleDeleteVersion}
                onRestoreVersion={handleRestoreVersion}
              />
            </Box>
          )}

          {/* Key Points */}
          {selectedSolution.keyPoints.length > 0 && (
            <Box>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                {t.knowledge.keyPoints}
              </Typography>
              <Stack spacing={2}>
                {selectedSolution.keyPoints.map((kp) => (
                  <Box key={kp.id} sx={{ pl: 2, borderLeft: 2, borderColor: 'primary.main' }}>
                    <Typography variant="body1" fontWeight={600}>
                      {kp.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {kp.description}
                    </Typography>
                    {kp.tags.length > 0 && (
                      <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap">
                        {kp.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    )}
                    {kp.tradeOffs && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {t.knowledge.tradeOffs}: {Object.entries(kp.tradeOffs).map(([k, v]) => `${k}: ${v}`).join(', ')}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>
      )}

      {/* Multiple Solutions Comparison */}
      {scene.solutions.length > 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            {t.knowledge.solutionComparison}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t.knowledge.multipleSolutions.replace('{count}', scene.solutions.length.toString())}
          </Typography>
        </Paper>
      )}
    </Box>
  )
}
