export interface PlayerDataRow {
  id: number
  /** Game account name */
  username: string
  former_name: string
  pass: string
  salt: string
  combat: number
  creation_date: number
  login_date: number
  bannned: string
}
