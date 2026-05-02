import prisma from '../database.js'
import { sha256 } from 'js-sha256'
import bcrypt from 'bcrypt'

// GET ALL USERS
export const getUsers = async (req, res) => {
  // Mengambil semua pengguna dari database menggunakan Prisma Client
    const { includeProfile } = req.query
    const users = await prisma.users.findMany({
      include: includeProfile === 'true'
      ? {
          profiles: true
        }
      : undefined
  })

  res.json({
    success: true,
    message: 'Users retrieved successfully',
    data: users,
    
  })
}

// GET USER BY ID
export const getUserById = async (req, res) => {
  const id = parseInt(req.params.id)
  const { includeProfile } = req.query

  // Mengambil pengguna dengan ID yang sesuai dari database menggunakan Prisma Client
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
    include: includeProfile === 'true'
      ? {
          profiles: true
        }
      : undefined
  })
  
  

  // Jika pengguna tidak ditemukan, kirimkan pesan error
  if (!user) {
    return res.json({
      success: false,
      message: `User with ID: ${id} not found`,
    })
  }

  res.json({
    success: true,
    message: 'User retrieved successfully',
    data: user,
  })
}

// CREATE USER
export const createUser = async (req, res) => {
  const { name, email, password } = req.body

  // Hash password
   const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword
    },
  })

  res.json({
    success: true,
    message: 'User created successfully',
    data: user,
  })
}

export const updateUser = async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email, password } = req.body
  const user = await prisma.users.findUnique({
    where: {
      id: id,
    },
  })

  if (!user) {
    return res.json({
      success: false,
      message: `User with ID: ${id} not found`,
    })
  }

  // Mengupdate pengguna dengan ID yang sesuai di database menggunakan Prisma Client
  await prisma.users.update({
    where: {
      id: id,
    },
    data: {
      name,
      email,
      password: password ? await bcrypt.hash(password, 10) : undefined
    },
  })

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user,
  })
}


// DELETE USER
export const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id)

  const user = await prisma.users.findUnique({
    where: { id }
  })

  if (!user) {
    return res.json({
      success: false,
      message: `User with ID: ${id} not found`,
    })
  }

  // Hapus profile dulu
  await prisma.profiles.deleteMany({
    where: { userId: id }
  })

  // Baru hapus user
  await prisma.users.delete({
    where: { id }
  })

  res.json({
    success: true,
    message: 'User deleted successfully',
  })
}