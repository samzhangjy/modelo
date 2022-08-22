import { Avatar, Button, Popover, Text, useTheme } from '@geist-ui/core'
import { usePrefers } from '../../hooks/usePrefers'
import Submenu from './Submenu'
import * as Icons from '@geist-ui/icons'
import UserSettings from './UserSettings'
import { getAvatarDisplayText } from '../../lib/common'
import useAuth from '../../hooks/useAuth'
import { useRouter } from 'next/router'

const Navbar = () => {
  const theme = useTheme()
  const prefers = usePrefers()
  const auth = useAuth()
  const router = useRouter()

  return (
    <header>
      <div className="navbar-container">
        <Text className="navbar-heading" p>
          Modelo
        </Text>
        <div className="navbar-left">
          <Button
            aria-label="Toggle Dark mode"
            className="navbar-theme-toggle"
            auto
            type="abort"
            onClick={() =>
              prefers.switchTheme(theme.type === 'dark' ? 'light' : 'dark')
            }
          >
            {theme.type === 'dark' ? (
              <Icons.Sun size={16} />
            ) : (
              <Icons.Moon size={16} />
            )}
          </Button>
          {auth.isLoggedIn().data?.isLoggedIn ? (
            <Popover
              content={<UserSettings />}
              placement="bottomEnd"
              portalClassName="user-settings-popover"
            >
              <button className="user-settings-toggle">
                <Avatar
                  text={getAvatarDisplayText(
                    process.env.NEXT_PUBLIC_ADMIN_NAME || 'Modelo'
                  )}
                />
              </button>
            </Popover>
          ) : (
            <Button scale={0.5} auto onClick={() => router.push('/auth/login')}>
              Login
            </Button>
          )}
        </div>
      </div>
      <Submenu />
      <style jsx>{`
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: 0 ${theme.layout.pageMargin};
          background-color: ${theme.palette.background};
          font-size: 16px;
          height: 54px;
          box-sizing: border-box;
        }

        .navbar-heading {
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
          letter-spacing: 0;
        }

        .navbar-left {
          display: flex;
          align-items: center;
        }

        :global(.navbar-theme-toggle) {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem !important;
          height: 2.25rem !important;
          padding: 0 !important;
          margin: 0 ${theme.layout.gapHalf} !important;
        }

        .user-settings-toggle {
          border: none;
          background: none;
          padding: 0;
          margin: 0;
          appearance: none;
          cursor: pointer;
        }

        :global(.user-settings-popover) {
          width: 180px !important;
        }
      `}</style>
    </header>
  )
}

export default Navbar
