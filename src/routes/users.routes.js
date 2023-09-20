import { Router } from 'express'
import userController from '../controllers/user.controller.js'

const router = Router()

router.post('/', userController.createUser)
router.get('/', userController.getAllUsers)
router.get('/userEmail', userController.getUserByEmailAndPass)
router.get('/:uid', userController.getUserById)
router.put('/:uid', userController.updateUser)
router.delete('/:uid', userController.deleteUser)
router.put('/premium/:uid', userController.upgradeUser)
router.put('/downgrade/:uid', userController.downgradeUser)
router.post('/changeRole', userController.changeRole)
router.post('/:uid/documents', userController.uploadDocuments)
router.post('/deleteUser', userController.deleteFront)


export default router


