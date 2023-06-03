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

  addProductToCart = async (cartId, productId, qty) => {
    const product = await productModel.findById(productId).lean();

    const cart = await this.getCartById(cartId);

    if(cart){
      const prodsInCart = cart.products
      
      for (let i = 0; i < prodsInCart.length; i++) {
        
      }

      const productInCart = prodsInCart.find(({product}) => product._id == productId)

      return productInCart
      

    }

    /* return cartModel
      .findByIdAndUpdate(cartId, {
        $push: {
          products: {
            product: new mongoose.Types.ObjectId(product._id),
            qty: qty,
          },
        },
      })
      .populate("products.product")
      .lean(); */
  };

  deleteCart = (cartId) => {
    return cartModel.findByIdAndDelete(cartId).lean();
  };

  deleteProductOfCart = async (cartId, productId) => {
    const cart = await this.getCartById(cartId);

    const products = cart.products;

    const ids = [];
    for (let i = 0; i < products.length; i++) {
      ids.push(products[i].product._id);
    }

    const newCart = ids.filter((id) => id != productId._id);

    cart.products = newCart;

    return await cartModel
      .findByIdAndUpdate(cartId, { products: newCart })
      .lean();
  };
}
