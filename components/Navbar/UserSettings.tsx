import { Link, Popover, useToasts } from '@geist-ui/core'
import useAuth from '../../hooks/useAuth'

const UserSettings = () => {
  const auth = useAuth()
  const toasts = useToasts()

  const handleLogout = async () => {
    const response = await auth.logout()
    toasts.setToast({
      text: response.msg,
      type: response.status,
    })
    window.location.reload()
  }

  return (
    <>
      <Popover.Item title>
        <span>{process.env.NEXT_PUBLIC_ADMIN_NAME}</span>
      </Popover.Item>
      <Popover.Item onClick={handleLogout}>
        <Link href="#">Logout</Link>
      </Popover.Item>
    </>
  )
}

export default UserSettings
