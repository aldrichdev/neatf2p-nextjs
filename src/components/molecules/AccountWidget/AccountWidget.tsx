import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, LogIn, UserPlus, LogOut, User as UserIcon } from 'lucide-react'
import { User } from '@globalTypes/User'
import { redirectTo } from '@utils/window'
import { UserIsLoggedIn } from '@utils/users/users'
import { sendApiRequest } from '@utils/api/apiUtils'
import { StandardLink } from '@atoms/StandardLink'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@ui/dropdown-menu'
import clsx from 'clsx'
import { cn } from '@utils/cn'

interface AccountWidgetProps {
  user: User
}

const AccountWidget = (props: AccountWidgetProps) => {
  const { user } = props
  const isLoggedIn = UserIsLoggedIn(user)
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  // next-themes can't know the theme on the server, so we hold off rendering
  // theme-dependent UI until after mount to avoid a hydration mismatch.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const handleLogout = () => {
    sendApiRequest('GET', '/api/ironLogout')
      .then(() => {
        redirectTo('/')
      })
      .catch((error: string) => {
        console.error('An error occurred on logout: ', error)
      })
  }

  const initial = isLoggedIn ? user.username.charAt(0).toUpperCase() : null

  return (
    <div className='absolute top-2.5 right-2.5 md:top-5 md:right-5'>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              'bg-dark-gray font-sans font-semibold text-white lg:text-xl',
              'shadow-lg shadow-black/30',
              'transition-opacity hover:opacity-90 focus:outline-none',
              isLoggedIn && `bg-secondary-main`,
            )}
            aria-label='Account menu'
          >
            {isLoggedIn ? initial : <UserIcon className='h-5 w-5' />}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='bg-background-paper border-divider w-60'>
          {isLoggedIn ? (
            <>
              <DropdownMenuLabel className='text-text-primary text-base font-normal'>
                Hi{' '}
                <StandardLink
                  href='/account'
                  hoverUnderline
                  onClick={() => setOpen(false)}
                  className='text-primary-main hover:text-primary-main font-semibold'
                >
                  {user.username}
                </StandardLink>
                !
              </DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-divider' />
              <div className='px-2 py-1.5'>{mounted && <ThemeSwitch theme={theme} setTheme={setTheme} />}</div>
              <DropdownMenuSeparator className='bg-divider' />
              <DropdownMenuItem
                onClick={handleLogout}
                className={clsx(
                  'text-text-primary hover:bg-primary-light focus:bg-primary-light',
                  'focus:text-text-primary cursor-pointer gap-2',
                )}
              >
                <LogOut className='h-4 w-4' />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem asChild className='hover:bg-primary-light focus:bg-primary-light cursor-pointer'>
                <StandardLink
                  href='/account/login'
                  underline={false}
                  onClick={() => setOpen(false)}
                  className='text-text-primary hover:text-text-primary flex items-center gap-2'
                >
                  <LogIn className='h-4 w-4' />
                  Login
                </StandardLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='hover:bg-primary-light focus:bg-primary-light cursor-pointer'>
                <StandardLink
                  href='/account/create'
                  underline={false}
                  onClick={() => setOpen(false)}
                  className='text-text-primary hover:text-text-primary flex items-center gap-2'
                >
                  <UserPlus className='h-4 w-4' />
                  Register
                </StandardLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className='bg-divider' />
              <div className='px-2 py-1.5'>{mounted && <ThemeSwitch theme={theme} setTheme={setTheme} />}</div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const ThemeSwitch = ({ theme, setTheme }: { theme: string | undefined; setTheme: (t: string) => void }) => {
  const isDark = theme === 'dark'

  return (
    <div className='bg-background-default flex items-center gap-1 rounded-full p-1'>
      <button
        onClick={e => {
          e.preventDefault()
          setTheme('light')
        }}
        className={clsx(
          'flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-medium transition-colors',
          !isDark ? 'bg-background-paper text-text-primary shadow-sm' : 'text-text-secondary',
        )}
      >
        <Sun className='h-3.5 w-3.5' />
        Light
      </button>
      <button
        onClick={e => {
          e.preventDefault()
          setTheme('dark')
        }}
        className={clsx(
          'flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs font-medium transition-colors',
          isDark ? 'bg-primary-dark text-white shadow-sm' : 'text-text-secondary',
        )}
      >
        <Moon className='h-3.5 w-3.5' />
        Dark
      </button>
    </div>
  )
}

export default AccountWidget
