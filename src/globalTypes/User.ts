/** A user is a website account. */
export type User = {
  id: string
  username: string
  emailAddress: string
  lastLogin: Date
  isAdmin: boolean
}
