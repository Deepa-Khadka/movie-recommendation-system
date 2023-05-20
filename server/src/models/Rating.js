import mongoose from 'mongoose'

const genreObejct = {
  drama: 0,
  comedy: 0,
  crime: 0,
  adventure: 0,
  action: 0,
  romance: 0,
  biography: 0,
  animation: 0,
  sciFi: 0,
  history: 0,
  horror: 0,
  sport: 0,
  music: 0,
  mystery: 0,
  sport: 0
}
const ratingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'users'
  },
  genreRatings: {
    type: Map,
    of: Number,
    required: true,
    default: genreObejct
  }
})

export default mongoose.model('Rating', ratingSchema)