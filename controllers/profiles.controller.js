import prisma from '../database.js'

export const getAllProfiles = async (req, res) => {
  const { includeUser } = req.query

  const query = {}

  if (includeUser === 'true') {
    query.include = {
      user: true
    }
  }

  const profiles = await prisma.profiles.findMany(query)

  res.json({
    success: true,
    data: profiles
  })
}

export const getProfileById = async (req, res) => {
  const { id } = req.params
  const { includeUser } = req.query

  const idInt = parseInt(id)

  if (isNaN(idInt)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID'
    })
  }

  const query = {
    where: { id: idInt }
  }

  if (includeUser === 'true') {
    query.include = { user: true }
  }

  const profile = await prisma.profiles.findUnique(query)

  if (!profile) {
    return res.status(404).json({
      success: false,
      message: 'Profile not found'
    })
  }

  res.json({
    success: true,
    data: profile
  })
}

export const createProfile = async (req, res) => {
  const { name, address, phone, userId } = req.body

  const profile = await prisma.profiles.create({
    data: {
      address,
      phone,
      user: {
        connect: { id: userId }
      }
    }
  })

  res.json({
    success: true,
    message: 'Profile created',
    data: profile
  })
}

export const updateProfile = async (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  const user = await prisma.profiles.findUnique({
    where: {
      id: id,
    },
  })

  if (!user) {
    return res.json({
      success: false,
      message: `Profile with ID: ${id} not found`,
    })
  }

  await prisma.profiles.update({
    where: {
      id: id,
    },
    data: {
      address,
      phone,
    },
  })

  res.json({
    success: true,
    message: 'Profile updated successfully',
  })
}

export const deleteProfile = async (req, res) => {
  const id = parseInt(req.params.id)

  const user = await prisma.profiles.findUnique({
    where: {
      id: id,
    },
  })
  if (!user) {
    return res.json({
      success: false,
      message: `Profile with ID: ${id} not found`,
    })
  }

  await prisma.profiles.delete({
    where: {
      id: id,
    },
  })

  res.json({
    success: true,
    message: 'Profile deleted successfully',
  })
}