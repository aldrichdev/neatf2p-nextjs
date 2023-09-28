import { NextApiRequest, NextApiResponse } from 'next'
import { manipulateWebsiteDatabase, isOkPacket } from '@helpers/db'
import { NewsPost } from 'src/globalTypes/NewsPost'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  const { userId, lastLogin } = req?.body
  const query = `UPDATE users SET lastLogin = '${lastLogin}' WHERE id = ${userId}`

  try {
    const queryResponse: OkPacket | ErrorResult = await manipulateWebsiteDatabase(query)

    if (!isOkPacket(queryResponse)) {
      throw new Error(queryResponse?.error?.toString())
    }

    if (queryResponse?.affectedRows !== 1) {
      throw new Error(`No rows, or too many rows, affected! Affected Rows: ${queryResponse.affectedRows}. Response: ${queryResponse}`)
    }

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(queryResponse?.affectedRows))
  }
  catch (error) {
    console.log('An error occurred in the updateLastLogin API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
