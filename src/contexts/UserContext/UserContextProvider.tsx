import { useState, ReactNode, useMemo } from 'react'
import { UserContextType, User } from './UserContext.types'
import UserContext from './UserContext'
import { NullUser } from '@models/NullUser'

interface UserContextProviderProps {
  children?: ReactNode
}

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User>(NullUser)

  return (
    <UserContext.Provider
      value={useMemo(
        () =>
          ({
            user,
            setUser
          } as UserContextType),
        [
          user,
          setUser,
        ]
      )}
    >
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.defaultProps = {
  children: null,
}

export default UserContextProvider
