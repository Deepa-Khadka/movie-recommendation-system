import WatchList from '../models/WatchList.js'
import PreferenceService from '../Services/preferenceService.js'

const preferenceService = new PreferenceService()

export default class WatchListController {
  addWatchList = async (req, res, next) => {
    const { uid, movieId, rating } = req.body
    const filter = { movieId: movieId, uid: uid }
    try {
      const oldList = await WatchList.findOne(filter)
      let result

      if (oldList) {
        result = await WatchList.findOneAndUpdate(filter, { rating: rating })
      } else {
        const watchList = new WatchList({
          uid: uid,
          movieId: movieId,
          rating: rating
        })

        result = await watchList.save()
        if (result) {
          let preference = await preferenceService.find(uid)
          let update
          if (preference)
            update = await preferenceService.update(uid, result._id)
          else update = await preferenceService.add(uid, result._id)
        }
      }
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      next()
    }
  }
}
