import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'
import { sendBadRequest, shouldBlockApiCall } from '@helpers/api/apiUtils'
import { BannedText } from 'src/data/BannedText'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, accountName, password, userIp } = req.body
  const creationDateMillis = Math.round(new Date().getTime() / 1000)
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  // Input validation
  const validUsernameMatches = accountName.match(/^[a-zA-Z0-9_ ]+$/g)

  // Replace underscores with spaces in username. RSC+ signup does this.
  // Underscores are translated as spaces on login, but the account name cannot have underscores in the database.
  const cleanedAccountName = accountName.replace(/_/g, ' ').trim()

  // Check if name is correct length
  if (cleanedAccountName.length < 1 || cleanedAccountName.length > 12) {
    return sendBadRequest(res, 'Account names must be 1-12 characters in length.')
  }

  // Only allow game account names with letters, numbers, underscores and spaces.
  if (!validUsernameMatches || !validUsernameMatches?.[0]) {
    return sendBadRequest(res, 'Your account name can only have letters, numbers, underscores and spaces.')
  }

  // Look for any bad or undesired words in names
  if (BannedText.some(text => accountName.toLowerCase().includes(text))) {
    return sendBadRequest(
      res,
      'Your account name has been determined to be offensive or misleading. Please try another one.',
    )
  }

  const query = `INSERT INTO players (username, pass, creation_date, creation_ip, websiteUserId)
    SELECT ?, ?, ?, ?, ? FROM DUAL
    WHERE NOT EXISTS (SELECT * FROM players WHERE username = ? LIMIT 1)`

  // Create the player record and return the new record ID.
  return handleManipulate(
    'game',
    query,
    res,
    [cleanedAccountName, password, creationDateMillis, userIp, userId, cleanedAccountName],
    'The account name you entered is currently taken. Please try another one.',
    true,
  )
}

export default handler
