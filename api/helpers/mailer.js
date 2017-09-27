import nodemailer from 'nodemailer'
import config from '../../config'

class Mailer {
  constructor(){
    this._createMailer()
  }

  async _createMailer(){
    const mailerSettings = await nodemailer.createTestAccount()
    this._transpoter = nodemailer.createTransport({
      host: mailerSettings.smtp.host,
      port: mailerSettings.smtp.port,
      secure: mailerSettings.smtp.secure, // true for 465, false for other ports
      auth: {
        user: mailerSettings.user, // generated ethereal user
        pass: mailerSettings.pass  // generated ethereal password
      }
    })
    this._baseOptions = {
      from: '"Kaiser Hack" <kaiser@hack.com>', // sender address
      subject: 'Bienvenido a KaiseHack ✔', // Subject line
    }
  }

  async sendMail(recipient, text) {
    const mailOptions = { ...this._baseOptions, text, to: recipient }

    const mailerInfo = await this._transpoter.sendMail(mailOptions)

    return nodemailer.getTestMessageUrl(mailerInfo)
  }
}

export { Mailer }
