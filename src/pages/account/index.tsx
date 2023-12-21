import { useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { Typography } from '@mui/material'
import useAuthentication from '@hooks/useAuthentication'
import { AccountNavigationContainer, AccountNavigationButton, AccountNavigationItem } from '@styledPages/Account.styled'
import Menu from '@mui/material/Menu'
import { UserIsLoggedIn } from '@helpers/users/users'

const AccountPage = () => {
  const user = useAuthentication()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const isLoggedIn = UserIsLoggedIn(user)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (!isLoggedIn) {
    return (
      <ContentBlock>
        <Typography variant='h2'>Account</Typography>
        <BodyText variant='body'>
          You are not currently logged in. Please visit the <InlineLink href='/account/login'>Login page</InlineLink> to
          log in.
        </BodyText>
      </ContentBlock>
    )
  }

  return (
    <ContentBlock>
      <Typography variant='h2'>Hiya, {user?.username}!</Typography>
      <BodyText variant='body'>
        Welcome to your account page. Here, you can modify your website account, create game (RSC) accounts, rename game
        accounts and update passwords.
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
          <AccountNavigationItem href='/account/change-username' onClick={handleClose}>
            Change password
          </AccountNavigationItem>
        </Menu>
        <AccountNavigationButton href='/account/game-accounts'>Manage Game Accounts</AccountNavigationButton>
      </AccountNavigationContainer>
    </ContentBlock>
  )
}
export default AccountPage
