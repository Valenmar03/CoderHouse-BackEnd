import { Router } from 'express';
import ProductManager from '../../manager/ProductManager.js';

const router = Router();

const productManager = new ProductManager();

const products = await productManager.getProducts();

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const parseLimit = parseInt(limit);
  if (!limit || parseLimit > products.length) {
    res.send(products)
  } else {
    res.send(products.slice(0, parseLimit));
  }
});

router.get("/:pid", async (req, res) => {
  const paramId = Object.values(req.params)[0];
  const id = parseInt(paramId);
  const product = await productManager.getProductById(id);
  res.send(product);
});

router.post('/', async (req, res) => {
    const product = req.body
    await productManager.addProducts(product)
    res.send({status: 'success', message: 'Product added successfully'})
})

export default router;

