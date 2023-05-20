import productModel from "../models/product.js"

export default class ProductManagerMongo {
    getProducts = (params) => {
        return productModel.find(params)
    }

    getProductById = (id) => {
        return productModel.findOne(id).lean()
    }

    addProducts = (product) => {
        return productModel.create(product)
    }

    updateProduct = (id, product) => {
        return productModel.findByIdAndUpdate(id, { $set: product })
    }

    deleteProduct = (id) => {
        return productModel.findByIdAndDelete(id)
    }
}