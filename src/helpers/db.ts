// https://www.simplenextjs.com/posts/next-mysql
import { OkPacket } from 'mysql'
import mysql from 'serverless-mysql'

const port =
  !process.env.MARIADB_PORT || isNaN(parseInt(process.env.MARIADB_PORT)) ? 3306 : parseInt(process.env.MARIADB_PORT)

const sqlServerSettings = {
  host: process.env.NEXT_PUBLIC_GAME_SERVER_HOST,
  port,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
}

const gameDB = mysql({
  config: {
    ...sqlServerSettings,
    database: process.env.GAME_DATABASE,
  },
})

const websiteDB = mysql({
  config: {
    ...sqlServerSettings,
    database: process.env.WEBSITE_DATABASE,
  },
})

export const queryDatabase = async <T>(databaseType: 'website' | 'game', sqlStatement: string) => {
  const database = databaseType === 'website' ? websiteDB : gameDB

  try {
    const results = await database.query<T>(sqlStatement, [])
    await database.end()
    return results
  } catch (error) {
    return { error }
  }
}

export const isOkPacket = (o: any): o is OkPacket => {
  return o && Object.prototype.hasOwnProperty.call(o, 'insertId') && typeof o.insertId === 'number'
}
