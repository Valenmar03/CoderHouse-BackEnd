import { Router } from 'express'
import ProductManager from '../dao/fileSystem/manager/ProductManager.js'
import ProductManagerMongo from '../dao/mongo/manager/productsManager.js'

const productService  = new ProductManagerMongo()

const productManager = new ProductManager()

const router = Router()

router.get('/', async (req, res) => {

    res.render('home', {
        css: 'home',
        prod: await productService.getProducts()
    })
})

router.get('/realTimeProducts', async (req, res) => {
    res.render('realTimeProducts', {
        css:'realTimeProducts',
        prod: await productService.getProducts()
    })
})


export default router