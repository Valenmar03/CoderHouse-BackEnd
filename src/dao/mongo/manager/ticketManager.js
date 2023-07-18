import ticketModel from "../models/ticket.model.js";

export default class TicketMangerMongo {
    create = async (amount, purchaser) => {
        return await ticketModel.create(amount, purchaser);
    };

    get = async () => {
        return await ticketModel.find().lean();
    }

    delete = async (ticketId) => {
        return await ticketModel.findByIdAndDelete(ticketId).lean()
    }
}