import { useTheme } from '@geist-ui/core'

const useCodeTheme = () => {
  const theme = useTheme()
  return {
    'pre[class*="language-"]': {
      background: 'transparent',
      border: 'none',
      margin: '0',
      padding: '0',
    },
    comment: {
      color: theme.palette.accents_3,
    },
    punctuation: {
      color: theme.palette.accents_4,
    },
    'attr-name': {
      color: theme.palette.accents_6,
    },
    'attr-value': {
      color: theme.palette.accents_4,
    },
    'class-name': {
      color: theme.palette.warning,
    },
    'maybe-class-name': {
      color: theme.palette.purple,
    },
    string: {
      color: theme.palette.accents_5,
    },
    parameter: {
      color: theme.palette.violet,
    },
    'property-access': {
      color: theme.palette.purple,
    },
    keyword: {
      color: theme.palette.success,
    },
    boolean: {
      color: theme.palette.successDark,
    },
    'plain-text': {
      color: theme.palette.accents_3,
    },
    tag: {
      color: theme.palette.accents_5,
    },
  }
}

export default useCodeTheme
