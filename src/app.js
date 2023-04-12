import express from 'express'
import ProductManager from '../manager/ProductManager.js'

const app = express()

const productManager = new ProductManager()

const products = await productManager.getProducts()

app.get('/products', (req, res) => {
    res.send(products)
})

app.get('/products/:pid', (req, res) => {
    const id = Object.values(req.params)[0]
    const product = await productManager.getProductById(id)// Revisar el await
    console.log(id) // Linea para comprobar que el id se esta pasando correctamente
    res.send(productManager.getProductById(product))
})

app.listen(8080, () => console.log('Listening on Port 8080'))