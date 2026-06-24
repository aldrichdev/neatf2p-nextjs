import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { handleError } from '@utils/api/apiUtils'
import { queryDatabase } from '@utils/db'
import { OkPacket } from 'mysql'
import { NextApiRequest, NextApiResponse } from 'next'

interface RowDataPacket {
  Kills: number
  Deaths: number
  Kdr: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { playerId } = req.query

  if (!playerId || typeof playerId !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Missing or malformed playerId provided to getKdrStatisticsForPlayer.'))
    return
  }

  const query = `CALL GetKdrStatisticsForPlayer(?);`

  try {
    const response: [Array<RowDataPacket>, OkPacket] | ErrorResult = await queryDatabase('game', query, [playerId])

    if (!Array.isArray(response)) {
      throw new Error(response?.error?.toString())
    }

    const kills = response?.[0]?.[0]?.['Kills']
    const deaths = response?.[0]?.[0]?.['Deaths']
    const kdr = response?.[0]?.[0]?.['Kdr']

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ kills, deaths, kdr }))
  } catch (error) {
    handleError(res, error, 'getKdrStatisticsForPlayer')
  }
}

export default handler
