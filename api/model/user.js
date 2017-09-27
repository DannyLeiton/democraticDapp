import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema


const User = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  }
)

User.pre('save', function (next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

// User.plugin(passportLocalMongoose)

export default mongoose.model('User', User)
