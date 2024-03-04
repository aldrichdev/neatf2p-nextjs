import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { queryDatabase } from '@helpers/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  onlinePlayerCount: number
}

interface RowDataPacket {
  'COUNT(id)': number
}

/** Note: `req` variable is unused, but removing it will throw an error, `res.setHeader is not a function`. */
const handler = async (req: NextApiRequest, res: NextApiResponse<Props>) => {
  // Block requests from non-app sources
  console.log('process.env.NEXT_PUBLIC_API_SECRET', process.env.NEXT_PUBLIC_API_SECRET)

  if (process.env.NEXT_PUBLIC_API_SECRET) {
    const secretHeader = req.headers[process.env.NEXT_PUBLIC_API_SECRET]
    console.log('req.headers', req.headers)
    console.log('secretHeader', secretHeader)

    if (!secretHeader) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify('Unauthorized'))
      return
    }
  }

  try {
    const query = `SELECT COUNT(id) FROM players WHERE ONLINE = 1`
    const response = await queryDatabase<RowDataPacket[] | ErrorResult>('game', query)

    if (!Array.isArray(response)) {
      throw new Error(response?.error?.toString())
    }

    const onlineCount = Array.isArray(response) && response?.[0]?.['COUNT(id)']
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(onlineCount))
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
