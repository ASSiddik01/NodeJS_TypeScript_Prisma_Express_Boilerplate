import nodemailer, { Transporter } from 'nodemailer'
import config from '../config'
import { IEmailData } from '../interface/emailData'

const sendEmail = async (data: IEmailData): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: config.mail_id,
      pass: config.mail_pass,
    },
  })

  await transporter.sendMail({
    from: '"Squeak Cart" <squeakcart@gmail.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  })
}

export default sendEmail
