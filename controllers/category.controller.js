import prisma from '../database.js'

// GET ALL
export const getCategories = async (req, res) => {
  const { includeBooks } = req.query

  const categories = await prisma.categories.findMany({
    include: includeBooks === 'true'
      ? {
          book: true
        }
      : undefined
  })

  res.json({
    success: true,
    data: categories
  })
}

//GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
  const id = parseInt(req.params.id)
  const { includeBooks } = req.query
  const category = await prisma.categories.findUnique({
    where: { id },
    include: includeBooks === 'true'
      ? {
          book: true
        }
      : undefined
  })

  if (!category) {
    return res.json({
      success: false,
      message: `Category with ID: ${id} not found`
    })
  }

  res.json({
    success: true,
    data: category
  })
}

// CREATE
export const createCategory = async (req, res) => {
  const { name } = req.body

  const category = await prisma.categories.create({
    data: { name }
  })

  res.json({
    success: true,
    message: 'Category created',
    data: category
  })
}