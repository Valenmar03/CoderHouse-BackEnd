import express from 'express'
import ProductManager from '../manager/ProductManager.js'

const app = express()

const productManager = new ProductManager()

const products = await productManager.getProducts()

app.get('/products', (req, res) => {
    res.send(products)
})

app.get('/products/:pid', async(req, res) => {
    const id = Object.values(req.params)[0]
    const  id2 = parseInt(id)
    const product = await productManager.getProductById(id2)
    res.send(product)
})

app.listen(8080, () => console.log('Listening on Port 8080'))