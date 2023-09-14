import mongoose from "mongoose";

const collection = 'Users'

const schema = new mongoose.Schema({
    first_name: String, 
    last_name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Carts'
    },
    products: {
        type: Array, 
        default: []
    },
    documents: {
        type: Array,
        default: [],
    },
    last_connection: {
        type: String,
        deafult: Date.now().toLocaleString()
    }
},{timestamps:true})

const userModel = mongoose.model(collection, schema)

export default userModel