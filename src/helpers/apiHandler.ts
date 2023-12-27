import { NextApiResponse } from 'next'
import { manipulateWebsiteData, isOkPacket } from '@helpers/db'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { User } from '@globalTypes/User'

/** Helper for updating website records. */
export const handleWebsiteUpdate = async (sqlQuery: string, res: NextApiResponse<User>): Promise<void> => {
  try {
    const queryResponse: OkPacket | ErrorResult = await manipulateWebsiteData(sqlQuery)

    if (!isOkPacket(queryResponse)) {
      throw new Error(queryResponse?.error?.toString())
    }

    if (queryResponse?.affectedRows !== 1) {
      throw new Error(
        `No rows, or too many rows, affected! Affected Rows: ${queryResponse.affectedRows}. Response: ${queryResponse}`,
      )
    }

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(queryResponse?.affectedRows))
  } catch (error) {
    console.log('An error occurred in the API handler: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}
