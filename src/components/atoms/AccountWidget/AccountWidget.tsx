import { useContext } from "react"
import { UserContext } from "@contexts/UserContext"
import { AccountArea, AccountAreaLink } from './AccountWidget.styled'
import { Typography } from "@mui/material";
import { NullUser } from "@models/NullUser";
import { useRouter } from 'next/router'

const AccountWidget = () => {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext);
  const userIsLoggedIn = user?.id > 0

  const handleLogout = () => {
    setUser(NullUser)
    router.reload()
  }

  return (
    <AccountArea>
      {userIsLoggedIn && (
        <>
          <Typography variant="body">Hi {user.username}!</Typography>
          |
        </>
      )}
      {userIsLoggedIn && <AccountAreaLink href='' onClick={handleLogout}>Logout</AccountAreaLink>}
      <AccountAreaLink href={userIsLoggedIn ? '/account' : '/account/login'}>
        {userIsLoggedIn ? 'Account' : 'Login'}
      </AccountAreaLink>
    </AccountArea>
  )
}

export default AccountWidget
