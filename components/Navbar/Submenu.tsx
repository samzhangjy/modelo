import { Tabs, useTheme } from '@geist-ui/core'
import { useRouter } from 'next/router'
import config from '../../config'
import useAuth from '../../hooks/useAuth'

const Submenu = () => {
  const theme = useTheme()
  const router = useRouter()
  const auth = useAuth()
  const isLoggedIn = auth.isLoggedIn().data?.isLoggedIn

  return (
    <>
      <div className="submenu-container">
        <div className="submenu-content">
          <Tabs
            initialValue="1"
            hideDivider
            value={router.asPath}
            onChange={(route) => router.push(route)}
            hoverWidthRatio={1}
          >
            {config.navigation
              .filter((value) => (value.admin ? isLoggedIn : true))
              .map((link, index) => (
                <Tabs.Item label={link.text} value={link.link} key={index} />
              ))}
          </Tabs>
        </div>
      </div>
      <style jsx>{`
        .submenu-container {
          height: 48px;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 -1px ${theme.palette.border};
        }

        .submenu-content {
          display: flex;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          // padding: 0 ${theme.layout.pageMargin};
          height: 48px;
          box-sizing: border-box;
          overflow-y: hidden;
          overflow-x: auto;
          overflow: -moz-scrollbars-none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}

export default Submenu
