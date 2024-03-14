import { User } from '@globalTypes/User'

export const NullUser: User = {
  id: 'NULL',
  username: 'NULL',
  emailAddress: 'null@gmail.com',
  lastLogin: new Date(),
  isAdmin: false,
  dateModified: new Date().toString(),
}
