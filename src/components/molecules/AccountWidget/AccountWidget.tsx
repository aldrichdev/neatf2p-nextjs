import { AccountArea, Username, AccountAreaLink } from './AccountWidget.styled'
import { Typography } from '@mui/material'
import { User } from '@globalTypes/User'
import { redirectTo } from '@utils/window'
import { UserIsLoggedIn } from '@utils/users/users'
import { sendApiRequest } from '@utils/api/apiUtils'

interface AccountWidgetProps {
  user: User
}

const AccountWidget = (props: AccountWidgetProps) => {
  const { user } = props
  const isLoggedIn = UserIsLoggedIn(user)

  const handleLogout = () => {
    sendApiRequest('GET', '/api/ironLogout')
      .then(() => {
        redirectTo('/')
      })
      .catch((error: string) => {
        console.error('An error occurred on logout: ', error)
      })
  }

  return (
    <AccountArea>
      {isLoggedIn && (
        <>
          <Typography variant='body'>
            Hi{' '}
            <Username href='/account' useHoverUnderline>
              {user.username}
            </Username>
            !
          </Typography>
          ~
        </>
      )}
      {!isLoggedIn && (
        <>
          <AccountAreaLink href='/account/login'>Login</AccountAreaLink>~
          <AccountAreaLink href='/account/create'>Register</AccountAreaLink>
        </>
      )}

      {isLoggedIn && (
        <>
          <AccountAreaLink href='' onClick={handleLogout}>
            Logout
          </AccountAreaLink>
        </>
      )}
    </AccountArea>
  )
}

export default AccountWidget
