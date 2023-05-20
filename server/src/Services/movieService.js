import mongoose from 'mongoose'
import ErrorHandler from './error.js'
import Movies from '../models/Movie.js'
import Rating from '../models/Rating.js'
import WatchList from '../models/WatchList.js'
import Preference from '../models/preference.js'
import PreferenceService from './preferenceService.js'
import WatchlistService from './watchlistService.js'

const objectId = mongoose.Types.ObjectId
const preferenceService = new PreferenceService()
const watchlistService = new WatchlistService()

export default class MovieService {
  getAllGenre = async (req, res, next) => {
    try {
      const results = await Movies.aggregate([
        { $match: { Genre: { $exists: true } } },
        {
          $project: {
            genreWords: {
              $split: [
                {
                  $replaceAll: { input: '$Genre', find: ',', replacement: '' }
                },
                ' '
              ]
            }
          }
        },
        { $unwind: '$genreWords' },
        {
          $group: {
            _id: '$genreWords',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ])

      return results
    } catch (error) {
      console.log(error)
      throw new Error('someting went wrong')
    }
  }

  getAllMovie = async (req, res, next) => {
    try {
      const movies = await Movies.find({}).limit(40)
      return movies
    } catch (error) {
      console.log(error)
      throw new Error('something went wrong')
    }
  }

  collaborativeRecommendation = async targetUid => {
    try {
      const targetUserPreference = await preferenceService.find(targetUid)

      let targetRating = await watchlistService.getRating(targetUid)

      // all the use preferences
      const allPreferences = await preferenceService.getAll()
      let sim = []
      let total = 0
      let rating
      for (let i = 0; i < allPreferences.length; i++) {
        let preference = allPreferences[i]

        if (preference.uid.toString() == targetUid.toString()) continue

        // get all the movies user had rate/watched
        rating = await watchlistService.getRating(preference.uid)

        const { rating1, rating2 } = zeroRating(targetRating, rating)

        // calculate similarity
        const similarity = await cosSimilarity(rating1, rating2)

        sim.push({ uid: preference.uid, sim: similarity })
      }

      sim.sort((a, b) => b.sim - a.sim)

      console.log('Similarity', sim)
      // console.log("Movies that user already rated",targetRating)

      // predict rating
      let recommendedMovies = []

      for (let i = 0; i < allPreferences.length; i++) {
        let preference = allPreferences[i]
        if (preference.uid.toString() === targetUid.toString()) {
          console.log('dont compare for same user')
          continue
        }
        rating = await watchlistService.getRating(preference.uid)

        // if  target user have already watched that movie skip

        for (let k = 0; k < rating.length; k++) {
          let movieId = rating[k].movieId
          let isFound = false
          for (let j = 0; j < targetRating.length; j++) {
            if (targetRating[j].movieId.toString() === movieId.toString()) {
              isFound = true

              break
            }
          }

          if (!isFound) {
            let predictedRating = await predictRating(
              preference.uid,
              movieId,
              sim
            )
            recommendedMovies.push({
              movieId: movieId,
              rating: predictedRating
            })
          }
        }
      }
      recommendedMovies.sort((a, b) => b.rating - a.rating)
      return recommendedMovies
    } catch (error) {}
  }

  getOriginalRating = async id => {
    return await Movies.findById(id)
  }
}

function getRating (objects) {
  let rating = []
  objects.forEach((key, value) => {
    rating.push(value)
  })
  return rating
}
function zeroRating (userRating1, userRating2) {
  const a = userRating1.slice()
  const b = userRating2.slice()

  const result = a.concat(b).reduce((acc, { movieId, rating }) => {
    if (!acc[movieId]) {
      acc[movieId] = [0, 0]
    }
    acc[movieId][a.some(i => i.movieId === movieId) ? 0 : 1] = rating
    return acc
  }, {})

  let rating1 = []
  let rating2 = []
  for (const movieId in result) {
    rating1.push(result[movieId][0])
    rating2.push(result[movieId][1])
  }
  return { rating1, rating2 }
}

function cosSimilarity (a, b) {
  console.log('Rating vector', a, b)
  const dotProduct = a.reduce((acc, cur, index) => {
    acc += cur * b[index]
    return acc
  }, 0)
  const aMagnitude = Math.sqrt(
    a.reduce((sum, element) => sum + Math.pow(element, 2), 0)
  )
  const bMagnitude = Math.sqrt(
    b.reduce((sum, element) => sum + Math.pow(element, 2), 0)
  )
  const cosineSimilarity = dotProduct / (aMagnitude * bMagnitude)
  console.log('finished calculating similarity ')
  return Math.round(cosineSimilarity * 100) / 100
}

async function predictRating (uid, mid, similarity) {
  // sum of similarity
  let totalSim = await similarity.reduce((acc, curr) => acc + curr.sim, 0)

  // total rating for movie
  let rating = await watchlistService.getMovieRating(mid)
  let totalRating = rating.reduce((acc, obj) => acc + obj.rating, 0)
  // console.log('movies rating ', rating)
  // user similarity for movieId
  const weight = similarity.find(item => item.uid.toString() === uid.toString())

  const userRate = weight ? weight.sim : null

  // predicted rating
  const test = totalRating / 3
  // console.log(`predicted rating ${test}`)
  let predictedRating = (totalRating * userRate) / totalSim
  return Math.round(predictedRating * 100) / 100
}
