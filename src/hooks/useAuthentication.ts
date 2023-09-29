import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useAuthentication = () => {
  const [user, setUser] = useState<User>(NullUser)

  useEffect(() => {
    const fetchLoginStatus = () => {
      axios
        .get('/api/ironUser')
        .then(response => {
          setUser(response?.data)
        })
        .catch((error: string) => error)
    }

    fetchLoginStatus()
    return () => fetchLoginStatus()
  }, [])

  return user
}

export default useAuthentication
