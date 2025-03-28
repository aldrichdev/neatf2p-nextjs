import { NextApiRequest, NextApiResponse } from 'next'
import { GetRandomToken } from '@helpers/string/stringUtils'
import { queryDatabase, isOkPacket } from '@helpers/db'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { mailOptions, transporter } from 'src/config/nodemailer'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, recipientEmail } = req.body
  const now = new Date().toISOString()
  const resetToken = GetRandomToken()
  const query = `UPDATE users SET resetToken = ?, dateModified = ? WHERE id = ? AND emailAddress = ?`

  try {
    const response: OkPacket | ErrorResult = await queryDatabase('website', query, [
      resetToken,
      now,
      userId,
      recipientEmail,
    ])

    if (!isOkPacket(response)) {
      throw new Error(response?.error?.toString())
    }

    if (response?.affectedRows < 1) {
      throw new Error(`No rows affected. Affected Rows: ${response.affectedRows}. Response: ${response}`)
    }

    // Success. Now, send the email.
    await transporter.sendMail({
      ...mailOptions,
      to: recipientEmail,
      subject: 'Website Account Password Reset Request',
      text: `Hello, you are receiving this email because you or someone else requested a password reset for your 
        Neat F2P website account. To reset your password, click here: 
        https://www.neatf2p.com/account/reset-password/${resetToken}.
        If you have any issues, please contact Beast Fable on Discord. Thanks, Neat F2P Team`,
      html: `<p>Hello,</p>
        <p>You are receiving this email because you or someone else requested a password reset for your 
          Neat F2P website account.</p>
        <p>To reset your password, click here: https://www.neatf2p.com/account/reset-password/${resetToken}</p>
        <p>If you have any issues, please contact Beast Fable on Discord.</p>
        <p>Thanks,</p>
        <p>Neat F2P Team</p>`,
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('OK'))
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`An error occurred in the addResetTokenAndSendEmail API: ${error}`))
  }
}

export default handler
