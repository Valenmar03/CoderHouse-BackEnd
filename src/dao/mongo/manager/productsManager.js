import productModel from "../models/product.model.js";

export default class ProductManagerMongo {
  getAll = async (params) => {
    return productModel.find().lean();
  };

  get = async (page, sort, category) => {
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

  getById = (id) => {
    return productModel.findOne(id).lean();
  };

  add = (product) => {
    return productModel.create(product);
  };

  update = (id, product) => {
    return productModel.findByIdAndUpdate(id, { $set: product }).lean();
  };

  delete = (prodId) => {
    return productModel.findByIdAndDelete(prodId).lean();
  };
}
