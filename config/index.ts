const navigationConfig = [
  { text: 'Home', link: '/' },
  { text: 'Snippts', link: '/snippts' },
  { text: 'About', link: '/about' },
  { text: 'Create Snippt', link: '/snippts/new', admin: true },
]

const siteConfig = {
  entriesPerPage: 6,
}

const config = {
  navigation: navigationConfig,
  site: siteConfig,
}

export default config
