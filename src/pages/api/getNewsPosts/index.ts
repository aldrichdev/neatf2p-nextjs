import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { queryWebsiteDatabase } from '@lib/db'
import { NewsPost } from '@atoms/NewsAndUpdates'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  try {
    let list: NewsPost[] = []
    const query = fs.readFileSync('src/sql/getNewsPosts.sql').toString()
    const response: Array<any> | { error: unknown } = await queryWebsiteDatabase({
      query,
      values: []
    })
    
    if (response instanceof Array<any>) {
      response?.map((rowDataPacket: NewsPost) => {
        list.push(rowDataPacket);
      })

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(list))
    } else {
      throw new Error(response.error?.toString());
    }
  }
  catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
