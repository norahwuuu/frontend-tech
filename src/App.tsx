import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { useState, useEffect } from 'react'
import { Header } from './layouts/Header'
import { LoadingFallback } from './components/LoadingFallback'
import { theme, darkTheme } from './theme'
import { LanguageProvider } from './hooks/useLanguage'
import { Home, Knowledge, Projects, Blog, About } from './pages'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark))
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  return (
    <LanguageProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
          <main>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/knowledge" element={<Knowledge />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
