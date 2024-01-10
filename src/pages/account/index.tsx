import { useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import useAuthentication from '@hooks/useAuthentication'
import { AccountNavigationContainer, AccountNavigationButton, AccountNavigationItem } from '@styledPages/Account.styled'
import Menu from '@mui/material/Menu'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { Spinner } from '@molecules/Spinner'

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
    return <Spinner />
  }

  if (!isLoggedIn) {
    return <NotLoggedIn />
  }

  return (
    <ContentBlock>
      <Typography variant='h2'>Hiya, {user?.username}!</Typography>
      <BodyText variant='body'>
        Welcome to your account page. Here, you can modify your website account, create game (RSC) accounts, rename game
        accounts and update passwords. (You can&apos;t update your website account right now, but that will be
        implemented soon!)
      </BodyText>
      <AccountNavigationContainer>
        <AccountNavigationButton
          id='manage-website-account'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          disabled
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
