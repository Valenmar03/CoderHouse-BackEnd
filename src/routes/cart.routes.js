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
    res.send({status: 'success', payload: cart.products})
})

router.post('/:cid/products/:pid', async (req, res) => {
    const paramId = Object.values(req.params)
    const cartId = parseInt(paramId[0])
    const productId = parseInt(paramId[1])
    await cartManager.addProductToCart(cartId, productId)
    res.send({status: 'success', message: 'Productd added to Cart successfully'})
})

export default router