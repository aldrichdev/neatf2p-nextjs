// Something to think about. I think our API calls are very redundant. However, the typing of the response can be
// custom and I don't know how that could be controlled

// import { ErrorResult } from '@globalTypes/Database/ErrorResult'
// import { UserDataRow } from '@globalTypes/Database/Users/UserDataRow'
// import { queryWebsiteDatabase } from '@helpers/db'
// import { NextApiRequest, NextApiResponse } from 'next'

// interface Props {
//   onlinePlayerCount: number
// }

// const apiHandler = async (req: NextApiRequest, res: NextApiResponse<Props>, response: any) => {
//   try {
//     if (response instanceof Array) {
//       res.statusCode = 200
//       res.setHeader('Content-Type', 'application/json')
//       res.end(JSON.stringify(response?.length))
//     } else {
//       throw new Error(response.error?.toString())
//     }
//   } catch (error) {
//     console.log('An error occurred in the getMatchingUsers API: ', error)
//     res.statusCode = 500
//     res.setHeader('Content-Type', 'application/json')
//     res.end(JSON.stringify(error?.toString()))
//   }
// }

// export default handler
