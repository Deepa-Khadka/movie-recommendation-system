import express from 'express'
import WatchedListController from '../Controllers/watchedListController.js'

const router = new express.Router()

const watchedList = new WatchedListController()

router.post('/', watchedList.addWatchList)
export default router
