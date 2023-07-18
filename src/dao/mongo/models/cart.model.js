import mongoose from "mongoose";

const collection = "Carts";

const schema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Products",
        },
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Users",
    default: undefined
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const cartModel = mongoose.model(collection, schema);

export default cartModel;
