import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'
import { sendBadRequest, shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, accountId, currentName, newName } = req.body
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  // Validate new username
  const validUsernameMatches = newName.match(/^[a-zA-Z0-9_ ]+$/g)

  // Only allow game account names with letters, numbers, underscores and spaces.
  if (!validUsernameMatches || !validUsernameMatches?.[0]) {
    return sendBadRequest(res, 'Your account name can only have letters, numbers, underscores and spaces.')
  }

  // Check for names that are just spaces
  if (newName === '') {
    return sendBadRequest(res, 'You cannot have a username with only spaces.')
  }

  // Check for the same name
  if (newName === currentName) {
    return sendBadRequest(res, 'The account name entered is the same as your current name.')
  }

  // The "AND NOT EXISTS" part of the query ensures that the case-insensitive new name isn't taken by someone else.
  let query = `UPDATE players SET former_name = ?, username = ? WHERE id = ? AND websiteUserId = ?
    AND NOT EXISTS (SELECT username FROM players WHERE username = ? AND id != ?) `
  const sqlParams = [currentName, newName, accountId, userId, newName, accountId]

  // If the currentName starts with #, it means we are restoring the user's previous name.
  // This is a username that doesn't exist anywhere, so we don't apply this part of the query.
  if (!currentName.startsWith('#')) {
    // This part of the query ensures that the username returned from the search is theirs, and they haven't renamed yet.
    query += `AND ? IN (SELECT username FROM players WHERE websiteUserId = ?) AND former_name = ''`
    sqlParams.push(currentName)
    sqlParams.push(userId)
  }

  return handleManipulate('game', query, res, sqlParams)
}

export default handler
