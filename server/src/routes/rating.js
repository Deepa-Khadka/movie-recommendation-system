import express from 'express'

import RatingController from '../Controllers/ratingController.js'

const rating = new RatingController()

const router = express.Router()

router.post('/', rating.addRating)
router.post('/allRating', rating.addAllUserRating)

export default router
