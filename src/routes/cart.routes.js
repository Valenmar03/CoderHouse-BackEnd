import { Router } from 'express'
import CartManager from '../../manager/CartManager.js'

const router = Router()

const cartManager = new CartManager()

const cart = cartManager.getCarts()

router.get('/:cid', async (req, res) => {
    const paramId = Object.values(req.params)[0]
    const id = parseInt(paramId)
})

export default router