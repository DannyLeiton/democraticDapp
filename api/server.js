import ip from 'ip'
import express, { Router } from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'

import {
  UserApi,
  ProcessApi,
  VoteApi,
 } from './routes'
import config from '../config.js'

const app = express()
const host_ip = ip.address()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST, GET");
  next();
})

// passport.use(new Strategy(Account.authenticate()))
// passport.serializeUser(Account.serializeUser())
// passport.deserializeUser(Account.deserializeUser())
mongoose.connect(config.mongo.uri)

// app.use(function (req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

//Development error handler
// if (app.get('env') === 'development') {
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     })
//   })
// }


// //Production error handler
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   })
// })



const port = process.env.PORT || 8080
const router = new Router()

app.get('/', (req, res) => {
  return res.send('GET TO STATIC PAGE')
})

app.use('/api', router)

new UserApi(router)
new ProcessApi(router)
new VoteApi(router)

app.listen(port)
console.log(`Server is running at port ${port}\n got to http://${host_ip}:${port}/api for the REST API`)
