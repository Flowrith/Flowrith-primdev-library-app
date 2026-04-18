import express from 'express'

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/books.controller.js'

const router = express.Router()

router.get('/', getBooks)
router.post('/', createBook)
router.get('/:id', getBookById)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)

export default router