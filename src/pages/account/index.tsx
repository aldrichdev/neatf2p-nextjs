import { useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import {
  AccountNavigationContainer,
  AccountNavigationButton,
  AccountNavigationItem,
  AdminToolsSection,
  AdminToolsHeading,
  AdminToolsButtonArea,
} from '@styledPages/Account.styled'
import Menu from '@mui/material/Menu'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'
import { GetServerSideProps } from 'next'
import { getIronSession } from 'iron-session'
import { sessionOptions } from '@models/session'
import { NullUser } from '@models/NullUser'
import { User } from '@globalTypes/User'
import Button from '@mui/material/Button'

type AccountPageProps = {
  user: User
}

const AccountPage = ({ user }: AccountPageProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleUpdateNewsPost = () => {
    const userInput = prompt('Please enter an integer:')

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
      {renderHead('Account')}
      {!UserIsLoggedIn(user) ? (
        <NotLoggedIn />
      ) : (
        <ContentBlock>
          <PageHeading>Hiya, {user?.username}!</PageHeading>
          <BodyText variant='body' bodyTextAlign='center'>
            Welcome to your account page. Here, you can modify your website account, create game (RSC) accounts, rename
            game accounts and update passwords.
          </BodyText>
          <AccountNavigationContainer>
            <AccountNavigationButton
              id='manage-website-account'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Manage Website Account
            </AccountNavigationButton>
            <Menu
              id='manage-website-account-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'manage-website-account',
              }}
            >
              <AccountNavigationItem href='/account/change-email' onClick={handleClose}>
                Change email address
              </AccountNavigationItem>
              <AccountNavigationItem href='/account/change-username' onClick={handleClose}>
                Change username
              </AccountNavigationItem>
              <AccountNavigationItem href='/account/change-password' onClick={handleClose}>
                Change password
              </AccountNavigationItem>
            </Menu>
            <AccountNavigationButton href='/account/game-accounts'>Manage Game Accounts</AccountNavigationButton>
          </AccountNavigationContainer>
          {user?.isAdmin && (
            <>
              <hr />
              <AdminToolsSection>
                <AdminToolsHeading variant='h3'>🧰 Admin Tools 🧰</AdminToolsHeading>
                <BodyText variant='body' bodyTextAlign='center' topMargin={0}>
                  Below are some admin tools to help you manage content on this site.
                </BodyText>
                <AdminToolsButtonArea>
                  <Button variant='contained' href='/admin/create-news-post'>
                    Create News Post
                  </Button>
                  <Button variant='contained' onClick={handleUpdateNewsPost}>
                    Update News Post
                  </Button>
                </AdminToolsButtonArea>
              </AdminToolsSection>
            </>
          )}
        </ContentBlock>
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
