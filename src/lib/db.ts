// https://www.simplenextjs.com/posts/next-mysql
import mysql from 'serverless-mysql'

const port = !process.env.MARIADB_PORT || isNaN(parseInt(process.env.MARIADB_PORT)) 
  ? 3306
  : parseInt(process.env.MARIADB_PORT)
  
const db = mysql({
  config: {
    host: process.env.MARIADB_HOST,
    port,
    database: process.env.MARIADB_DATABASE,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD
  }
})

interface SomeProps {
  query: string
  values: string[]
}

const queryDatabase = async ({ query, values } : SomeProps) => {
  try {
    const results = await db.query(query, values)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}

export default queryDatabase