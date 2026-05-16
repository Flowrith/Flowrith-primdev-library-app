import express from 'express'

import {
  getAllBorrowings,
  getBorrowingById,
  createBorrowing,
  returnBook,
  deleteBorrowing,
} from '../controllers/borrowings.controller.js'

const router = express.Router()

// GET semua data peminjaman
router.get('/', getAllBorrowings)

// GET detail peminjaman berdasarkan ID
router.get('/:id', getBorrowingById)

// POST membuat peminjaman baru
router.post('/', createBorrowing)

// PUT mengembalikan buku 
router.put('/:id/return', returnBook)

// DELETE menghapus data peminjaman
router.delete('/:id', deleteBorrowing)

export default router