import { Router } from 'express'
import ProductManager from '../../manager/ProductManager.js'

const productManager = new ProductManager()

const router = Router()

router.get('/home', async (req, res) => {

    res.render('home', {
        css: 'home',
        prod: await productManager.getProducts()
    })
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        css:'realTimeProducts'
    })
})


export default router