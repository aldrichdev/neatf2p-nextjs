import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { queryDatabase } from '@helpers/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface RowDataPacket {
  Kills: number
  Deaths: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { playerId } = req.query

  if (!playerId || typeof playerId !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Missing or malformed playerId provided to getKdrForPlayer.'))
    return
  }

  const query = `SELECT GetNumKillsForPlayer(p.username) as Kills, GetNumDeathsForPlayer(p.username) as Deaths  
    FROM players p
    WHERE p.id = ?`

  try {
    const response: Array<RowDataPacket> | ErrorResult = await queryDatabase('game', query, [playerId])

    if (!Array.isArray(response)) {
      throw new Error(response?.error?.toString())
    }

    const kills = response?.[0]?.['Kills']
    const deaths = response?.[0]?.['Deaths']

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ kills, deaths }))
  } catch (error) {
    console.log('An error occurred in the getKdrForPlayer API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
