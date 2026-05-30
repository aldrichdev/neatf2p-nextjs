import { User } from '@globalTypes/User'
import { redirectTo } from '@utils/window'
import { UserIsLoggedIn } from '@utils/users/users'
import { sendApiRequest } from '@utils/api/apiUtils'
import { StandardLink } from '@atoms/StandardLink'
import clsx from 'clsx'

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
    <div
      className={clsx(
        'flex items-center gap-2.5 font-sans',
        'absolute top-2.5 right-2.5',
        'text-foreground rounded-lg bg-white p-2.5',
        'md:top-5 md:right-5',
        'lg:text-xl',
      )}
    >
      {isLoggedIn && (
        <>
          <p>
            Hi{' '}
            <StandardLink href='/account' hoverUnderline>
              {user.username}
            </StandardLink>
            !
          </p>
          ~
        </>
      )}
      {!isLoggedIn && (
        <div className='text-foreground'>
          <StandardLink href='/account/login' hoverUnderline className='text-foreground hover:text-foreground'>
            Login
          </StandardLink>{' '}
          ~{' '}
          <StandardLink href='/account/create' hoverUnderline className='text-foreground hover:text-foreground'>
            Register
          </StandardLink>
        </div>
      )}

      {isLoggedIn && (
        <>
          <StandardLink href='' hoverUnderline className='text-foreground hover:text-foreground' onClick={handleLogout}>
            Logout
          </StandardLink>
        </>
      )}
    </div>
  )
}

export default AccountWidget
