/** Game accounts use timestamps (numbers) for dates. (creation_date and login_date)
 * These represent the number of seconds since 1/1/1970 UTC. https://www.epochconverter.com
 * To avoid conflicting with how the game works with those fields, I will use and convert the values to dates. */
export interface GameAccount {
  id: number
  name: string
  combatLevel: number
  creationDate: number
  loginDate: number
}
