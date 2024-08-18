import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   phoneNumber: { type: String },
   avatar: { type: String },
   isVerified: { type: Boolean, default: false },
   token: { type: String },
   lastLogin: { type: Date },
})

const SALT = process.env.SALT || 'default_salt' 

function hashPassword(password) {
   return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, SALT, 1000, 64, 'sha512', (err, derivedKey) => {
         if (err) reject(err)
         resolve(derivedKey.toString('hex'))
      })
   })
}

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next()
   try {
      this.password = await hashPassword(this.password)
      next()
   } catch (err) {
      next(err)
   }
})

const User = mongoose.model('User', userSchema)

export { User }
