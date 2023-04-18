import { Router } from 'express'
import CartManager from '../../manager/CartManager.js'

const router = Router()

const cartManager = new CartManager()

const carts = cartManager.getCarts()

router.post('/', async (req, res) => {
    await cartManager.createCart()
    res.send({status: 'success', message: 'Cart created successfully'})    
})

router.get('/:cid', async (req, res) => {
    const paramId = Object.values(req.params)[0]
    const id = parseInt(paramId)
    const cart = await cartManager.getCartById(id)
    res.send({status: 'success', payload: cart})
})

export default router