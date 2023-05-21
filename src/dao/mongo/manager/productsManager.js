import productModel from "../models/product.js"

export default class ProductManagerMongo {
    getProducts = (params) => {
        return productModel.find(params).lean()
    }

    getProductById = (id) => {
        return productModel.findOne(id).lean()
    }

    addProducts = (product) => {
        return productModel.create(product).lean()
    }

    updateProduct = (id, product) => {
        return productModel.findByIdAndUpdate(id, { $set: product }).lean()
    }

    deleteProduct = (id) => {
        return productModel.findByIdAndDelete(id).lean()
    }
}