import { cartErrorNotFound } from "../constants/cartErrors.js";
import ErrorService from "../services/error.service.js";
import { cartService, productsService } from "../services/repositories.js";
import EErrors from "../constants/EErrors.js";
import { productErrorProdNotFound } from "../constants/productsErrors.js";
import CartRepository from "../services/Repositories/CartsRepository.js";

const createCart = async (req, res) => {
  const cart = await cartService.createCart();
  res.send({ status: "success", payload: cart });
};

const getCarts = async (req, res) => {
  const carts = await cartService.getCarts();
  res.send({ status: "success", payload: carts });
};

const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById({ _id: cid });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    res.send({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
};

const addProductIntoCart = async (req, res, next) => {
  try {
    const data = req.body;
    const stock = data.stock;
    const pid = data.prod;
    const session = req.session.user;
    const cid = session.cart;
    const cart = await cartService.getCartById({ _id: cid });
    const product = await productsService.getProductById({ _id: pid });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    if (!product) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Producto no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    if (session.email === product.owner) {
      return res.send({
        status: "error",
        error: "No puede agregar un producto que te pertenece",
      });
    }

    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].product._id == pid && cart.products[i].qty > stock) {
        return res.send({
          status: "error",
          error: "No hay mas stock de este producto",
        });
      }
    }

    const newCart = await cartService.addProductToCart(cid, pid, 1);
    res.send({ status: "success", payload: "Producto añadido correctamente" });
  } catch (error) {
    next(error);
  }
};

const updateProductOnCart = async (req, res, next) => {
  try {
    const paramId = Object.values(req.params);
    const cartId = paramId[0];
    const productId = paramId[1];
    const qty = req.body.qty || 1;

    const cart = await cartService.getCartById({ _id: cartId });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    const product = await productsService.getProductById({ _id: productId });
    if (!product) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Producto no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }

    let productRepeatPosition;
    for (let i = 0; i < cart.products.length; i++) {
      if (cart.products[i].product.code === product.code) {
        productRepeatPosition = i;
      }
    }

    let newQty;
    if (!productRepeatPosition) {
      newQty = qty;
    } else {
      newQty = cart.products[productRepeatPosition].qty + qty;
    }

    const updateCart = await cartService.updateProductQty(
      cartId,
      productId,
      newQty
    );
    const newCart = await cartService.getCartById({ _id: cartId });

    res.send({ status: "success", payload: newCart });
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const { cid } = req.params;

    const cart = await cartService.getCartById({ _id: cid });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    await cartService.deleteCart({ _id: cid });
    res.send({ status: "success", message: "Cart deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteProdOfCart = async (req, res, next) => {
  try {
    const paramId = Object.values(req.params);
    const cartId = paramId[0];
    const productId = paramId[1];
    const qty = req.body;

    const cart = await cartService.getCartById({ _id: cartId });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    const product = await productsService.getProductById({ _id: productId });
    if (!product) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Producto no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }

    const newCart = await cartService.deleteProductInCart(
      { _id: cartId },
      { _id: productId }
    );

    res.send({ status: "success", message: newCart });
  } catch (error) {
    next(error);
  }
};

export default {
  createCart,
  getCarts,
  getCartById,
  addProductIntoCart,
  updateProductOnCart,
  deleteCart,
  deleteProdOfCart,
};
