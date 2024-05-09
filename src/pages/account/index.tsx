import { useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import useAuthentication from '@hooks/useAuthentication'
import { AccountNavigationContainer, AccountNavigationButton, AccountNavigationItem } from '@styledPages/Account.styled'
import Menu from '@mui/material/Menu'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { Spinner } from '@molecules/Spinner'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'

const AccountPage = () => {
  const [loading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const user = useAuthentication(setLoading)
  const open = Boolean(anchorEl)
  const isLoggedIn = UserIsLoggedIn(user)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (loading) {
    return (
      <>
        {renderHead('Account')}
        <Spinner />
      </>
    )
  }

  if (!isLoggedIn) {
    return <NotLoggedIn />
  }

  return (
    <>
      {renderHead('Account')}
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
    </>
  )
}
export default AccountPage
