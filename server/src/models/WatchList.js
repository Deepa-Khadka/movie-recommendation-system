import mongoose from 'mongoose'

const objectId = mongoose.Schema.Types.ObjectId

const watchlistSchema = mongoose.Schema({
  uid: {
    type: objectId,
    required: true,
    ref:'users'
  },
  movieId: {
    type: objectId,
    required: true,
    ref : 'movies'
  },
  rating: {
    type: Number,
    default: 0
  }
})
export default mongoose.model('watchlists', watchlistSchema)
