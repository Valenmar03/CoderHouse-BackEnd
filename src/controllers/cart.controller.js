import { cartService } from "../services/repositories.js";

const createCart = async (req, res) => {
    const cart = await cartService.createCart();
    res.send({ status: "success", payload: cart });
}

const getCarts = async (req, res) => {
    const carts = await cartService.getCarts();
    res.send({ status: "success", payload: carts });
}

const getCartById = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartService.getCartById({ _id: cid });
    res.send({ status: "success", payload: cart });
}  

const addProductIntoCart = async (req, res) => {
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
}

const updateProductOnCart = async (req, res) => {
    const paramId = Object.values(req.params);
    const cartId = paramId[0];
    const productId = paramId[1];
    const qty = req.body.quantity || 1
    const cart = await cartService.updateProductQty(
      cartId,
      productId,
      qty 
    );
    res.send({ status: "success", payload: cart });
}

const deleteCart = async (req, res) => {
    const { cid } = req.params;
    await cartService.deleteCart({ _id: cid });
  
    try {
      res.send({ status: "success", message: "Cart deleted successfully" });
    } catch (error) {
      res.status(404).send({ status: "erros", message: "Id not found" });
    }
}

const deleteProdOfCart = async (req, res) => {
    const paramId = Object.values(req.params);
    const cartId = paramId[0];
    const productId = paramId[1];
    const qty = req.body
    const cart = await cartService.deleteProductInCart(
      { _id: cartId },
      { _id: productId } 
    );
    console.log(productId)
    res.send({ status: "success", message: cart });
}



export default {
    createCart,
    getCarts,
    getCartById,
    addProductIntoCart,
    updateProductOnCart,
    deleteCart,
    deleteProdOfCart,
}