import { BodyText } from '@atoms/BodyText'
import { UserIsLoggedIn } from '@utils/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { GetServerSideProps } from 'next'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@models/session'
import { NullUser } from '@models/NullUser'
import { User } from '@globalTypes/User'
import { sharedStyles } from '@consts/styles/shared'
import { Button } from '@ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@ui/dropdown-menu'
import Link from 'next/link'

type AccountPageProps = {
  user: User
}

const AccountPage = ({ user }: AccountPageProps) => {
  const websiteLinkClass = 'cursor-pointer px-4 py-3'

  const handleUpdateNewsPostClick = () => {
    const userInput = prompt('Enter the ID of the news post you wish to update:')

    if (userInput === null) {
      // User cancelled the prompt
      return
    }

    const userInteger = parseInt(userInput, 10)

    if (isNaN(userInteger)) {
      alert("That's not a valid integer. Please try again.")
      return
    }

    window.location.href = `/admin/update-news-post/${userInteger}`
  }

  return (
    <>
      {renderHead('Account', 'The account page allows you to modify your website account and create in-game accounts.')}
      {!UserIsLoggedIn(user) ? (
        <NotLoggedIn />
      ) : (
        <div className={sharedStyles.defaultContainer}>
          <PageHeading>Hiya, {user?.username}!</PageHeading>
          <BodyText bodyTextAlign='center'>
            Welcome to your account page. Here, you can modify your website account, create game (RSC) accounts, rename
            game accounts and update passwords.
          </BodyText>
          <div className='mt-2.5 flex flex-wrap justify-center gap-5 md:flex-nowrap'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size='lg'>⚙️ Manage Website Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href='/account/change-email' className={websiteLinkClass}>
                    Change email address
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/account/change-username' className={websiteLinkClass}>
                    Change username
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/account/change-password' className={websiteLinkClass}>
                    Change password
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size='lg' asChild>
              <Link href='/account/game-accounts'>🕹️ Manage Game Accounts</Link>
            </Button>
          </div>
          {user?.isAdmin && (
            <>
              <hr className='my-5' />
              <div className='flex flex-wrap justify-center gap-5'>
                <h2 className='text-center md:text-5xl'>
                  <span className='hidden md:inline'>🧰</span> Admin Tools <span className='hidden md:inline'>🧰</span>
                </h2>
                <BodyText bodyTextAlign='center'>
                  Below are some admin tools to help you manage content on this site.
                </BodyText>
                <div className='flex flex-wrap justify-center gap-5'>
                  <Button asChild>
                    <Link href='/admin/create-news-post'>➕ Create News Post</Link>
                  </Button>
                  <Button onClick={handleUpdateNewsPostClick}>📝 Update News Post</Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default AccountPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
