import User from '../models/User.js'

export default class UserService {
  getAllUsers = async (req, res) => {
    try {
      const users = User.find()
      return users
    } catch (error) {
      console.log(error)
      throw new Error('Something went wrong')
    }
  }
}
