import Preference from '../models/preference.js'
import Watchlist from '../models/WatchList.js'

export default class PreferenceService {
  add = async (uid, watchlistId) => {
    try {
      let preference = await Preference.findOne({ uid: uid })
      if (preference) throw new Error('preference already exist')
      preference = new Preference({
        uid: uid,
        watchlistId: [watchlistId]
      })
      return await preference.save()
    } catch (error) {
      console.log(error)
      throw new Error('Somethings went wrong')
    }
  }
  update = async (uid, movieId) => {
    try {
      let preference = await Preference.findOne({ uid: uid })
      if (!preference) throw new Error('preference dont exist')
      let watchList = preference.watchlistId

      if (watchList.includes(movieId))
        throw new Error(`preference for ${movieId}  already exist`)

      watchList.push(movieId)

      return await Preference.findOneAndUpdate(
        { uid: uid },
        { watchlistId: watchList }
      )
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }

  find = async uid => {
    try {
      let preference = await Preference.findOne({ uid: uid })

      if (preference) return preference
      return false
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }
  getAll = async () => {
    try {
      let preferences = await Preference.find()
      if (preferences) return preferences
      return false
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }
}
