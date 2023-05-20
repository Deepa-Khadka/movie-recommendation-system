import mongoose from 'mongoose'
const objectId = mongoose.Schema.Types.ObjectId
const preferenceSchema = mongoose.Schema({
  uid: {
    type: objectId,
    required: true,
    unique: true,
    ref: 'users'
  },
  watchlistId: {
    type: [objectId],
    unique: true,
    ref: 'watchlists'
  }
})
export default mongoose.model('preferences', preferenceSchema)
