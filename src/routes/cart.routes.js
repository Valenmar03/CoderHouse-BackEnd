import { Router } from "express";
import CartManager from "../dao/fileSystem/manager/CartManager.js";
import CartManagerMongo from "../dao/mongo/manager/cartsManager.js";

const router = Router();

//const cartManager = new CartManager()
//const carts = cartManager.getCarts()

const cartService = new CartManagerMongo();

router.post("/", async (req, res) => {
  const cart = await cartService.createCart();
  res.send({ status: "success", payload: cart });
});

router.get("/", async (req, res) => {
  const carts = await cartService.getCarts();
  res.send({ status: "success", payload: carts });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartById({ _id: cid });
  res.send({ status: "success", payload: cart });
});

router.post("/:cid/products/:pid", async (req, res) => {
  const paramId = Object.values(req.params);
  const cartId = paramId[0];
  const productId = paramId[1];
  const qty = req.body
  console.log(qty.qty)
  const cart = await cartService.addProductToCart(
    cartId,
    productId,
    qty.qty 
  );
  res.send({ status: "success", payload: cart });
});

router.put('/:cid/products/:pid', async (req, res) => {
  const paramId = Object.values(req.params);
  const cartId = paramId[0];
  const productId = paramId[1];
  const qty = req.body
  const cart = await cartService.addProductToCart(
    cartId,
    productId,
    qty.qty 
  );
  res.send({ status: "success", payload: cart });
})

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cartToDelte = await cartService.deleteCart({ _id: cid });

  try {
    res.send({ status: "success", message: "Cart deleted successfully" });
  } catch (error) {
    res.status(404).send({ status: "erros", message: "Id not found" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const paramId = Object.values(req.params);
  const cartId = paramId[0];
  const productId = paramId[1];
  const qty = req.body
  const cart = await cartService.deleteProductOfCart(
    { _id: cartId },
    { _id: productId } 
  );
  res.send({ status: "success", message: cart });
});

/* router.post('/', async (req, res) => {
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
}) */

export default router;
