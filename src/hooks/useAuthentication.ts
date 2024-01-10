import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

/** `setLoading` should be provided whenever this hook is used on a page that
 * returns different JSX based on wehther the user is logged in, is an admin, or
 * any other data associated with the user. This prevents the wrong text being
 * shown on the screen for a brief moment.
 */
const useAuthentication = (setLoading?: Dispatch<SetStateAction<boolean>>) => {
  const [user, setUser] = useState<User>(NullUser)

  useEffect(() => {
    const fetchLoginStatus = () => {
      axios
        .get('/api/ironUser')
        .then(response => {
          setUser(response?.data)
          setLoading?.(false)
        })
        .catch((error: string) => error)
    }

    fetchLoginStatus()
    return () => fetchLoginStatus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return user
}

export default useAuthentication
