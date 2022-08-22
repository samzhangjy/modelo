import type { AppProps } from 'next/app'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import 'inter-ui/inter.css'
import Navbar from '../components/Navbar'
import { useState, useEffect, useCallback } from 'react'
import { ThemeType, themes, PrefersContext } from '../hooks/usePrefers'
import Footer from '../components/Footer'

const App = ({ Component, pageProps }: AppProps) => {
  const [themeType, setThemeType] = useState<ThemeType>('dark')

  useEffect(() => {
    document.documentElement.removeAttribute('style')
    document.body.removeAttribute('style')

    const isDarkMode =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    if (isDarkMode) {
      setThemeType('dark')
    }

    const theme = window.localStorage.getItem('theme') as ThemeType
    if (themes.includes(theme)) setThemeType(theme)
    else setThemeType('light')
  }, [])

  const switchTheme = useCallback((theme: ThemeType) => {
    setThemeType(theme)
    if (typeof window !== 'undefined' && window.localStorage)
      window.localStorage.setItem('theme', theme)
  }, [])

  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <PrefersContext.Provider value={{ themeType, switchTheme }}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </PrefersContext.Provider>
    </GeistProvider>
  )
}

export default App
