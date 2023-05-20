import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import { userSchema } from '../models/User.js'

export default userSchema.methods.generateAuthToken = function (user) {
  const user = {
    _id: this._id,
    user_type: this.user_type
  }
  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOEKN_PRIVATE_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  })

  const refreshToken = jwt.sign(
    user,
    process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_LIFE
    }
  )

  return { accessToken, refreshToken }
}
