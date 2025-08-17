import { useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { AccountNavigationContainer, AccountNavigationButton, AccountNavigationItem } from '@styledPages/Account.styled'
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
