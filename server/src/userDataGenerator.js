import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import User, { validateUser } from './models/User.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

/**
 * chagne process.env.CONNECTION_URL
 * and passowrd
 */
const createUsers = async () => {
  mongoose
    .connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Database connected!'))
    .catch(err => {
      console.log(err)
      return
    })

  for (let index = 0; index < 10; index++) {
    try {
      const user = new User({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 12),
        gender: faker.helpers.arrayElement(['male', 'female']),
        address: faker.address.streetAddress(),
        country: faker.address.country()
      })
      validateUser(user)
      await user.save()
      console.log(index, 'created')
    } catch (error) {
      console.log(error)
    }
  }
  mongoose.connection.close()
}

createUsers()
