import { User } from '@globalTypes/User'

export const UserIsLoggedIn = (user: User) => user?.id !== 'NULL'

export const UserExists = (user: any) => user?.id !== null && user?.id !== 'NULL' && user?.id?.length > 0
