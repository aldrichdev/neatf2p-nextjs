// https://www.simplenextjs.com/posts/next-mysql
import { OkPacket } from 'mysql'
import mysql from 'serverless-mysql'

const port =
  !process.env.MARIADB_PORT || isNaN(parseInt(process.env.MARIADB_PORT)) ? 3306 : parseInt(process.env.MARIADB_PORT)

const sqlServerSettings = {
  host: process.env.MARIADB_HOST,
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

// TODO: Refactor these query functions so the caller can pass a reference to the database (maybe via a string),
// that way we only need 1 query function
export const queryGameDatabase = async <T>(sqlStatement: string) => {
  try {
    const results = await gameDB.query<T>(sqlStatement, [])
    await gameDB.end()
    return results
  } catch (error) {
    return { error }
  }
}

export const queryWebsiteDatabase = async (sqlStatement: string) => {
  try {
    const results = await websiteDB.query<Array<any>>(sqlStatement, [])
    await websiteDB.end()
    return results
  } catch (error) {
    return { error }
  }
}

export const insertIntoWebsiteDatabase = async (sqlStatement: string) => {
  try {
    const results = await websiteDB.query<OkPacket>(sqlStatement, [])
    await websiteDB.end()
    return results
  } catch (error) {
    return { error }
  }
}
