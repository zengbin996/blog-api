const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const fileRouter = require('./file')
const photosRouter = require('./photos')

router.use('/user', userRouter)
router.use('/api/file', fileRouter)
router.use(photosRouter)

module.exports = router
