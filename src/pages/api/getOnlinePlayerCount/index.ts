import { queryGameDatabase } from '@lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  onlinePlayerCount: number
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Props>
) => {
  try {
    const response = await queryGameDatabase({
      query: 'SELECT COUNT(id) FROM players WHERE ONLINE = 1',
      values: []
    })
    const onlineCount = response?.[0]?.['COUNT(id)']
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(onlineCount))
  }
  catch (error) {
    res.json(error)
    res.status(500).end()
  }
}

export default handler
