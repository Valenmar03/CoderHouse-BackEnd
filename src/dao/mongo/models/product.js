import mongoose from 'mongoose';

const collection = 'products'

const schema = new mongoose.Schema({
    title: String, 
    description: String,
    price: Number,
    thumbnail: {
        type: Array,
        default: []
    },
    code: {
        type: String,
        unique: true
    },
    category: String,
    status: {
        type: Boolean,
        default: true
    },
    stock: Number
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

const productModel = mongoose.model(collection, schema)

export default productModel

