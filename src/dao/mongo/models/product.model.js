import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'Products'

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
    stock: Number,
    owner: {
        type: String,
        ref: 'Users',
        default: 'admin'
    }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})


schema.plugin(mongoosePaginate)

const productModel = mongoose.model(collection, schema)

export default productModel

