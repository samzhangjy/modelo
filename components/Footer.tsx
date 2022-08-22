import { Link, Text, useTheme } from '@geist-ui/core'

const Footer = () => {
  const theme = useTheme()

  return (
    <>
      <div className="footer-container">
        <Text h3>Modelo.</Text>
        <Text>Instantly share your codes.</Text>
        <Text>
          Made with love by{' '}
          <Link href="https://github.com/samzhangjy" target="_blank" block>
            @samzhangjy
          </Link>
          {'.'}
        </Text>
      </div>
      <style jsx>{`
        .footer-container {
          width: 100%;
          padding: 30px 100px 30px 100px;
          margin: 0 auto;
          border-top: 1px solid ${theme.palette.border};
        }
      `}</style>
    </>
  )
}

export default Footer
