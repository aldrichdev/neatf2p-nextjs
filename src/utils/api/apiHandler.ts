import { NextApiResponse } from 'next'
import { queryDatabase, isOkPacket } from '@utils/db'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { handleError } from './apiUtils'

/** Helper for querying database records.
 * For <T>, use the type of data array you would like returned (e.g. `PlayerHiscoreDataRow`).
 */
export const handleQuery = async <T>(
  databaseType: 'website' | 'game',
  sqlQuery: string,
  res: NextApiResponse<T>,
  sqlParams?: string[],
): Promise<void> => {
  try {
    const response: T[] | ErrorResult = await queryDatabase(databaseType, sqlQuery, sqlParams)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } else {
      throw new Error(response.error?.toString())
    }
  } catch (error) {
    handleError<T>(res, error, 'handleQuery')
  }
}

/** Helper for manipulating (UPDATEing or INSERTing) database records. */
export const handleManipulate = async (
  databaseType: 'website' | 'game',
  sqlQuery: string,
  res: NextApiResponse,
  sqlParams?: string[] | Record<string, string>,
  noRowsAffectedErrorMessage?: string,
  returnLastInsertedId?: boolean,
): Promise<void> => {
  try {
    const response: OkPacket | ErrorResult = await queryDatabase(databaseType, sqlQuery, sqlParams)

    if (!isOkPacket(response)) {
      throw new Error(response?.error?.toString())
    }

    if (response?.affectedRows < 1) {
      throw new Error(noRowsAffectedErrorMessage || `No rows affected. Response: ${response}`)
    }

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(returnLastInsertedId ? response?.insertId : response?.affectedRows))
  } catch (error) {
    handleError(res, error, 'handleManipulate')
  }
}
