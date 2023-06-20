import productModel from "../models/product.js";

export default class ProductManagerMongo {

  getAllProducts = async (params) => {
    return productModel.find().lean()
  }

  getProducts = async (page, sort, category) => {
    if (category !== undefined) {
      return await productModel.paginate(
        { category: category },
        { page: page, limit: 10, lean: true, sort: { price: sort } }
      );
    }

    return await productModel.paginate(
      {},
      { page: page, limit: 10, lean: true, sort: { price: sort } }
    );
  };

  getProductById = (id) => {
    return productModel.findOne(id).lean();
  };

  addProducts = (product) => {
    return productModel.create(product);
  };

  updateProduct = (id, product) => {
    return productModel.findByIdAndUpdate(id, { $set: product }).lean();
  };

  deleteProduct = (id) => {
    return productModel.findByIdAndDelete(id).lean();
  };
}
