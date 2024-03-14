import nodemailer from 'nodemailer'

const email = process.env.NODEMAILER_EMAIL
const emailPass = process.env.NODEMAILER_EMAIL_PASS

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: emailPass,
  },
})

export const mailOptions = {
  from: `Neat F2P Team <${email}>`,
  to: email,
}
