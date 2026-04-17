import express from 'express'
import prisma from '../database.js'
import booksRoute from './books.route.js'
// import userRoute from './user.route.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to the API Library')
})

router.get('/', (req, res) => {
  res.send('Hai! Selamat datang di aplikasi Express.js! <br> Semoga harimu menyenangkan! :)')
})

router.get('/books', async (req, res) => {
  // Mengambil semua buku dari database menggunakan Prisma Client
  const books = await prisma.book.findMany()
  
  res.send(books)
})

router.get('/books/:id', async (req, res) => {
  // Mendapatkan ID buku yang akan diupdate dari parameter URL
  // Lalu mengubahnya menjadi tipe data integer menggunakan parseInt
  const id = parseInt(req.params.id)
})

router.use(booksRoute)

export default router