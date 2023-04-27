import express from "express";
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

import productRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import viewsRouter from './routes/views.routes.js'
import ProductManager from "../manager/ProductManager.js";

import __dirname from './utils.js'

const app = express();
const server = app.listen(8080, () => console.log("Listening on Port 8080"));

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.static(`${__dirname}/public`))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)


const productManager = new ProductManager()
const products = await productManager.getProducts()

const io = new Server(server)

io.on('connection', socket => {
    console.log('a user connected')
    socket.emit('products-list', products)
})