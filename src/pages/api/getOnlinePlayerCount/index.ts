import fs from 'fs'
import { queryGameDatabase } from '@lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  onlinePlayerCount: number
}

interface RowDataPacket {
  'COUNT(id)': number
}

interface ErrorResult {
  error: unknown
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Props>
) => {
  try {
    const query = fs.readFileSync('sql/getOnlinePlayers.sql').toString()
    const response = await queryGameDatabase<RowDataPacket[] | ErrorResult>(query)
    console.log('response', response);
    
    if (!Array.isArray(response)) {
      throw new Error(response?.error?.toString());
    }

    const onlineCount = Array.isArray(response) && response?.[0]?.["COUNT(id)"]
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify(onlineCount))
  }
  catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
