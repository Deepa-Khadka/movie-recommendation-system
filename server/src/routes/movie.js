import express from 'express'
import MovieController from '../Controllers/movieController.js'

const movie = new MovieController()

const router = express.Router()

router.post('/',movie.addMovies)
router.get('/genre/:genre', movie.getGenre)
router.get('/allGenre', movie.getAllGenre)
router.get('/', movie.getAllMovie)
router.get('/recommended/:id', movie.getRecommendation)


export default router
