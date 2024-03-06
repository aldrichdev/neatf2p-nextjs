export interface UserDataRow {
  id: number
  emailAddress: string
  username: string
  password: string
  passwordSalt: string
  session: string
  lastLogin: string
  isAdmin: number
}
