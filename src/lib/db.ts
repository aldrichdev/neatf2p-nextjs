// https://www.simplenextjs.com/posts/next-mysql
import mysql from 'serverless-mysql'

const port = !process.env.MARIADB_PORT || isNaN(parseInt(process.env.MARIADB_PORT)) 
  ? 3306
  : parseInt(process.env.MARIADB_PORT)
  
const sqlServerSettings = {
  host: process.env.MARIADB_HOST,
  port,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD
}

const gameDB = mysql({
  config: {
    ...sqlServerSettings,
    database: process.env.GAME_DATABASE,
  } 
})

const websiteDB = mysql({
  config: {
    ...sqlServerSettings,
    database: process.env.WEBSITE_DATABASE,
  } 
})

interface SomeProps {
  query: string
  values: string[]
}

export const queryGameDatabase = async ({ query, values } : SomeProps) => {
  try {
    const results = await gameDB.query(query, values)
    await gameDB.end()
    return results
  } catch (error) {
    return { error }
  }
}

export const queryWebsiteDatabase = async ({ query, values } : SomeProps) => {
  try {
    const results = await websiteDB.query<Array<any>>(query, values)
    await websiteDB.end()
    return results
  } catch (error) {
    return { error }
  }
}
