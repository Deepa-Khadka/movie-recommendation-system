import WatchList from '../models/WatchList.js'

export default class WatchlistService {
  getRating = async uid => {
    try {
      const results = await WatchList.find({ uid: uid }, { _id: 0 })

      return results
    } catch (error) {
      console.log(error)
      throw new Error('something went wrong')
    }
  }

  getMovieRating = async mid => {
    try {
      let results = await WatchList.find(
        { movieId: mid }
      )
      return results
    } catch (error) {
      console.log(error)
      throw new Error('something went wrong')
    }
  }
}
