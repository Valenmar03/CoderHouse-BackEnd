import { Router } from 'express';
import ProductManager from '../../manager/ProductManager.js';

const router = Router();

const productManager = new ProductManager();

const products = await productManager.getProducts();

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const parseLimit = parseInt(limit);
  if (!limit || parseLimit > products.length) {
    res.send({status: 'success', payload: products})
    res.status(400).send({status: 'error', error: 'Ocurrio un error'});
  } else {
    const productsLimit = products.slice(0, parseLimit)
    res.send({status: 'success', payload: productsLimit});
    res.status(400).send({status: 'error', error: 'Ocurrio un error'})
  }
});

router.get("/:pid", async (req, res) => {
  const paramId = Object.values(req.params)[0];
  const id = parseInt(paramId);
  const product = await productManager.getProductById(id);
  res.send({status: 'success', payload: product});
});

router.post('/', async (req, res) => {
    const product = req.body
    await productManager.addProducts(product)
    res.send({status: 'success', message: 'Product added successfully'})
})

router.put('/:pid', async (req, res) => {
    const product = req.body
    const paramId = Object.values(req.params)[0];
    const id = parseInt(paramId);
    await productManager.updateProduct(id, product.title, product.description, product.price, product.thumbnail, product.code, product.category, product.status, product.stock)
    res.send({status: 'success', message:'Product updated successfully'})
})

router.delete('/:pid', async (req, res) => {
    const paramId = Object.values(req.params)[0];
    const id = parseInt(paramId);
    await productManager.deleteProduct(id)
    res.send({status: 'deleted', message: 'Product deleted successfully'})
})

export default router;

