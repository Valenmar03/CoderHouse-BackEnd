import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import mongoose from "mongoose";

export default class CartManagerMongo {
  createCart = async (params) => {
    return await cartModel.create(params);
  };

  getCarts = async (params) => {
    return await cartModel.find().populate("products.product").lean();
  };

  getCartById = (cartId) => {
    return cartModel.findById(cartId).populate("products.product").lean();
  };

  addProductToCart = async (cartId, productId, quantity) => {
    const product = await productModel.findById(productId).lean();

    const cart = await cartModel.findOne({ _id: cartId }).lean();
    const prodToAdd = cart.products.find((e) => e.product == productId);

    if (prodToAdd) {
      const newProd = prodToAdd.qty + quantity;
      prodToAdd.qty = newProd;
      const newCart = cartModel.updateOne({ _id: cartId }, cart);
      return newCart;
    } else {
      return cartModel
        .findByIdAndUpdate(cartId, {
          $push: {
            products: {
              product: new mongoose.Types.ObjectId(product._id),
              qty: quantity,
            },
          },
        })
        .populate("products.product")
        .lean();
    }
  };

  updateProductToCart = async (cartId, productId, quantity) => {
    const product = await productModel.findById(productId).lean();

    const cart = await cartModel.findOne({ _id: cartId }).lean();
    const prodToAdd = cart.products.find((e) => e.product == productId);

    if (prodToAdd) {
      const newProd = quantity;
      prodToAdd.qty = newProd;
      const newCart = cartModel.updateOne({ _id: cartId }, cart);
      return newCart;
    } else {
      return cartModel
        .findByIdAndUpdate(cartId, {
          $push: {
            products: {
              product: new mongoose.Types.ObjectId(product._id),
              qty: quantity,
            },
          },
        })
        .populate("products.product")
        .lean();
    }
  };

  deleteCart = (cartId) => {
    return cartModel.findByIdAndDelete(cartId).lean();
  };

  deleteProductOfCart = async (cartId, productId) => {
    const cart = await this.getCartById(cartId);

    const products = cart.products;

    const ids = [];
    for (let index = 0; index < products.length; index++) {
      ids.push(products[index].product._id);
    }

    const productToDelete = ids.findIndex((id) => id == productId._id);

    if (productToDelete === -1) {

      return 'Product not found'
      
    }

    return await cartModel.updateOne(
      { _id: cartId },
      { $pull: { products: { product: productId } } }
    );
  };
}
