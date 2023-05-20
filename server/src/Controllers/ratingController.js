import { faker } from '@faker-js/faker'

import Rating from '../models/Rating.js'
import UserService from '../Services/userService.js'
const user = new UserService()

export default class RatingController {
  addRating = async (req, res, next) => {
    try {
      const rating = new Rating(req.body)
      const result = await rating.save()
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      next()
    }
  }

  addAllUserRating = async (req, res, next) => {
    try {
      const users = await user.getAllUsers()
      for (let index = 0; index < users.length; index++) {
        const oldRating = await Rating.find({ userId: users[index]._id })

        if (oldRating.length === 1) continue

        let genreRatings = {
          drama: faker.datatype.number({ min: 0, max: 5 }),
          comedy: faker.datatype.number({ min: 0, max: 5 }),
          crime: faker.datatype.number({ min: 0, max: 5 }),
          adventure: faker.datatype.number({ min: 0, max: 5 }),
          action: faker.datatype.number({ min: 0, max: 5 }),
          romance: faker.datatype.number({ min: 0, max: 5 }),
          biography: faker.datatype.number({ min: 0, max: 5 }),
          animation: faker.datatype.number({ min: 0, max: 5 }),
          sciFi: faker.datatype.number({ min: 0, max: 5 }),
          history: faker.datatype.number({ min: 0, max: 5 }),
          horror: faker.datatype.number({ min: 0, max: 5 }),
          sport: faker.datatype.number({ min: 0, max: 5 }),
          music: faker.datatype.number({ min: 0, max: 5 }),
          mystery: faker.datatype.number({ min: 0, max: 5 }),
          sport: faker.datatype.number({ min: 0, max: 5 })
        }
        const rating = new Rating({
          userId: users[index]._id,
          genreRatings: genreRatings
        })
        console.log(index, 'added')
        const result = await rating.save()
      }
      console.log('added all users rating')
      res.status(200).json('all done')
    } catch (error) {
      console.log(error)
      next()
    }
  }
}
