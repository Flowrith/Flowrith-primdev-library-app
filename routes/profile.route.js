import express from 'express'
import {
  getAllProfiles,
  createProfile,
  getProfileById,
  updateProfile,
  deleteProfile
} from '../controllers/profiles.controller.js'

const router = express.Router()

router.get('/', getAllProfiles)
router.post('/', createProfile)
router.get('/:id', getProfileById)
router.put('/:id', updateProfile)
router.delete('/:id', deleteProfile)

export default router