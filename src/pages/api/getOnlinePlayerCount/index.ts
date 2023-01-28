import queryDatabase from '@lib/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  onlinePlayerCount: number
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Props>
) => {
  try {
    const response = await queryDatabase({
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
  // return new Promise((resolve, reject) => {
  //   queryDatabase({ query: 'SELECT COUNT(username) FROM players WHERE ONLINE = 1', values: [] })
  //     .then(response => {
  //       console.log('response', response)
  //       res.statusCode = 200
  //       res.setHeader('Content-Type', 'application/json')
  //       res.end(JSON.stringify(response))
  //       resolve()
  //     })
  //     .catch(error => {
  //       res.json(error)
  //       res.status(405).end()
  //       resolve()
  //     })
  // })
  // const result = await queryDatabase({
  //   query: 'SELECT COUNT(username) FROM players WHERE ONLINE = 1',
  //   values: []
  // })
  // console.log('result', result)
}

export default handler