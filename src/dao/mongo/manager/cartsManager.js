import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import mongoose from "mongoose";

export default class CartManagerMongo {
  createCart = async (params) => {
    return await cartModel.create(params);
  };

  getCarts = async (params) => {
    return await cartModel.find().populate().lean();
  };

  getCartById = (cartId) => {
    return cartModel.findById(cartId).populate("products.product").lean();
  };

  addProductToCart = async (cartId, productId) => {
    const product = await productModel.findById(productId).lean();
    return cartModel
      .findByIdAndUpdate(cartId, {
        $push: {
          products: { product: new mongoose.Types.ObjectId(product._id) },
        },
      })
      .populate("products.product")
      .lean();
  };

  deleteCart = (cartId) => {
    const cart = cartModel.findByIdAndDelete(cartId).lean();

    if (cart) {
    }
  };

  deleteProductOfCart = async (cartId, productId) => {
    const cart = await this.getCartById(cartId);

    const products = cart.products;

    const ids = []
    for (let i = 0; i < products.length; i++) {
      ids.push(products[i].product._id)
    }

    const productIndex = ids.findIndex(id => id == productId);

    console.log(ids)
    console.log(productId)
    return ids
    return productIndex

  };
}
