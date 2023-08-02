import { cartErrorNotFound } from "../constants/cartErrors.js";
import ErrorService from "../services/errorService.js";
import { cartService, productsService } from "../services/repositories.js";
import EErrors from "../constants/EErrors.js";
import { productErrorProdNotFound } from "../constants/productsErrors.js";

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
    const paramId = Object.values(req.params);
    const cartId = paramId[0];
    const productId = paramId[1];
    const qty = req.body;
    const cart = await cartService.getCartById({ _id: cartId });
    const product = await productsService.getProductById({ _id: productId });
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

    const newCart = await cartService.addProductToCart(
      cartId,
      productId,
      qty.qty
    );
    res.send({ status: "success", payload: newCart });
  } catch (error) {
    next(error);
  }
};

const updateProductOnCart = async (req, res, next) => {
  try {
    const paramId = Object.values(req.params);
    const cartId = paramId[0];
    const productId = paramId[1];
    const qty = req.body.quantity || 1;

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

    const newCart = await cartService.updateProductQty(cartId, productId, qty);
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
