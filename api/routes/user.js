import jwt from 'jsonwebtoken'
import uuidv1 from 'uuid/v1'
import bcrypt from 'bcrypt'

import { Mailer } from '../helpers/mailer'
import config from '../../config'
import User from '../model/user'
import authMid from '../middlewares/authMid'


const RESPONSE_413 = { code: 3, message: 'Invalid Request, more parameters than needed' }
class UserApi {
  constructor(parentRouter) {
    this.router = parentRouter
    this._createUserApi()
    this._mailer = new Mailer()
  }

  _createUserApi(){
    this.router.post('/user/authenticate', async (req, res) => {
      const { email, password, ...rest } = req.body
      if (Object.keys(rest).length) return res.status(413).send(RESPONSE_413)

      // TODO: Validate if email and pass are ok
      const user = await User.findOne({ email })

      if (!user) return res.status(403).send({ code: 2, message: 'No user' })

      const isMatch = await bcrypt.compare(password, user.password)

      if(isMatch) {
        const secret = config.jwt.secret
        const token = jwt.sign({ email }, secret)

        return res.send({
          userId: user._id,
          fullname: user.fullname,
          email: user.email,
          token: token,
        })
      }

      return res.status(403).send({code: 2, message: 'Password does not match'})
    })

    this.router.post('/user/recover', async (req, res) => {
      const { email, ...rest } = req.body
      if (Object.keys(rest).length) return res.status(413).send(RESPONSE_413)

      const user = await User.findOne({ email })

      if (!user) return res.status(403).send({ code: 2, message: 'No user' })

      const newPassword = uuidv1().substring(0, 6)
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(newPassword, salt)

      const {password} = await User.findByIdAndUpdate(user._id, { password: hash })

      console.log('password', password)

      const mailerInfo = await this._mailer.sendMail(user.email, `Password recovered, your new password is ${newPassword}`)

      return res.send({url: mailerInfo})
    })

    this.router.get('/user/list', async (req, res) => {

      const users = await User.find()
      const response = users.map((user) => {
        const { fullname, email, _id: userId } = user

        return { fullname, email, userId }
      })

      return res.send(response)
    })

    this.router.route('/user')
      .post(authMid, async (req, res) => {
        const { fullname, email, ...rest } = req.body
        if (Object.keys(rest).length) return res.status(413).send(RESPONSE_413)

        const password = uuidv1().substring(0, 6)
        const newUser = new User({ fullname, email, password })

        try {
          const saved = await newUser.save()

          const mailerInfo = await this._mailer.sendMail(saved.email, `Welcome ${saved.fullname}, your password is: ${password}`)

          return res.send({
            userId: saved._id,
            fullname: saved.fullname,
            email: saved.email,
            url: mailerInfo
          })
        } catch (error) {
          return res.status(400).send({ code: 1, message: error.errmsg })
        }

      })

    this.router.route('/user/:userId')
      .get(async (req, res) => {
        const { userId } = req.params
        const user = await User.findById(userId)

        if(!user) return res.send([])

        const { fullname, email } = user

        return res.send({
          userId,
          fullname,
          email
        })
      })
      .post(authMid, async (req, res) => {
        const { fullname, email, ...rest } = req.body
        if (Object.keys(rest).length) return res.status(413).send(RESPONSE_413)

        const newUser = new User({ fullname, email })
        const saved = await newUser.save()

        return res.send(saved)

      })
      .put(async (req, res) => {
        const { userId, ...restParams } = req.params
        // const { fullname, email, password, ...rest } = req.body
        // if (Object.keys(rest).length || Object.keys(restParams).length) return res.status(413).send(RESPONSE_413)

        const { email, fullname, _id } = await User.findByIdAndUpdate(userId, req.body, { new: true})

        res.send({ email, fullname, userId: _id })
      })
      .delete(async (req, res) => {
        const { userId, ...rest } = req.params
        if (Object.keys(rest).length) return res.status(413).send(RESPONSE_413)

        const user = await User.findByIdAndRemove(userId)

        res.send(user)
      })
  }
}

export { UserApi }
