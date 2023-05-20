import mongoose from 'mongoose'

var Schema = mongoose.Schema

const movieSchema = mongoose.Schema({
  _id: { type: Schema.ObjectId },
  Certificate: {
    type: String
  },
  Director: {
    type: String
  },
  Genre: {
    type: String
  },
  IMDB_Rating: {
    type: String
  },
  Meta_score: {
    type: String
  },
  No_of_Votes: {
    type: String
  },
  Poster_Link: {
    type: String
  },
  Released_Year: {
    type: String
  },
  Runtime: {
    type: String
  },
  Series_Title: {
    type: String
  },
  Star1: {
    type: String
  },

  Star2: {
    type: String
  },
  Star3: {
    type: String
  },

  Star4: {
    type: String
  }
})

export default mongoose.model('Movies', movieSchema)
