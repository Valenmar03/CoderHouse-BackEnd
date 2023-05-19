import productModel from "../models/product.js"

export default class ProductManagerMongo {
    getProducts = (params) => {
        return productModel.find(params)
    }

    getProductById = (params) => {
        return productModel.findOne(params).lean()
    }

    addProducts = (product) => {
        return productModel.create(product)
    }
}