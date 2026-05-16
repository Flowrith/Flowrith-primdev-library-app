import prisma from '../database.js'

// GET ALL BOOKS
export const getBooks = async (req, res) => {
  const { includeCategory } = req.query

  const books = await prisma.book.findMany({
    include: includeCategory === 'true'
      ? {
          category: true
        }
      : undefined
  })

  res.json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  })
}

// GET BOOK BY ID
export const getBookById = async (req, res) => {
  const id = parseInt(req.params.id)
  const { includeCategory } = req.query

  const book = await prisma.book.findUnique({
    where: { id },
    include: includeCategory === 'true'
      ? {
          category: true
        }
      : undefined
  })

  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    })
  }

  res.json({
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  })
}


// CREATE BOOK
export const createBook = async (req, res) => {
  const { title, author, year, categoryId } = req.body

  //  validasi
  if (!title || !author || !year || !categoryId) {
    return res.json({
      success: false,
      message: 'title, author, year, and categoryId are required'
    })
  }

  // cek category ada atau tidak
  const category = await prisma.categories.findUnique({
    where: { id: categoryId }
  })

  if (!category) {
    return res.json({
      success: false,
      message: `Category with ID: ${categoryId} not found`
    })
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      year,
      categoryId
    },
    include: {
      category: true
    }
  })

  res.json({
    success: true,
    message: 'Book created successfully',
    data: book,
  })
}

// UPDATE BOOK
export const updateBook = async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, author, year, categoryId } = req.body

  const book = await prisma.book.findUnique({
    where: { id }
  })

  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    })
  }

  const updatedBook = await prisma.book.update({
    where: { id },
    data: {
      title,
      author,
      year,
      categoryId
    },
    include: {
      category: true
    }
  })

  res.json({
    success: true,
    message: 'Book updated successfully',
    data: updatedBook,
  })
}

// DELETE BOOK
export const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id)

  const book = await prisma.book.findUnique({
    where: { id }
  })

  if (!book) {
    return res.json({
      success: false,
      message: `Book with ID: ${id} not found`,
    })
  }

  await prisma.book.delete({
    where: { id }
  })

  res.json({
    success: true,
    message: 'Book deleted successfully',
  })
}