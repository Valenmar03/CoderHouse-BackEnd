import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = Router()

router.post('/', userController.createUser)
router.get('/', userController.getAllUsers)
router.get('/userEmail', userController.getUserByEmailAndPass)
router.get('/:uid', userController.getUserById)
router.put('/:uid', userController.updateUser)
router.delete('/:uid', userController.deleteUser)


export default router


