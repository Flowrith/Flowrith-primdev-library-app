import express from 'express'
import booksRoute from './books.route.js'
import usersRoute from './users.route.js'
import categoriesRoute from './category.route.js'
import profilesRoute from './profile.route.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the API Library')
})

router.use('/books', booksRoute)
router.use('/users', usersRoute)
router.use('/categories', categoriesRoute)
router.use('/profiles', profilesRoute)

export default router