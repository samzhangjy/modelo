import hljs from 'highlight.js'

const autoDetectLanguageFromString = (code: string) => {
  const results = hljs.highlightAuto(code, [
    'cpp',
    'js',
    'python',
    'c',
    'ts',
    'jsx',
    'tsx',
    'java',
    'bash',
  ])
  return results.language
}

const useLanguage = () => {
  return { detect: autoDetectLanguageFromString }
}

export default useLanguage
