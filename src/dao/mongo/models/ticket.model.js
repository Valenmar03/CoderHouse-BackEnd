import mongoose, { mongo } from "mongoose";

const collection = 'Tickets'

const schema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    amount: Number,    
    purchaser: String, 
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Carts'
    }
},{timestamps: {createdAt: 'purchase_datetime', updatedAt: 'updated_at'}})



const ticketModel = mongoose.model(collection, schema)

export default ticketModel