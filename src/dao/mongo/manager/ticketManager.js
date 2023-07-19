import ticketModel from "../models/ticket.model.js";

export default class TicketMangerMongo {
    create = async (ticket) => {
        return await ticketModel.create(ticket);
      };

    get = async () => {
        return await ticketModel.find().populate('cart').lean();
    }

    findBy = async (value) => {
        return await ticketModel.findOne({cart: {$gte: value}}).populate('cart').lean();
    }

    update = async (ticketId, amount) => {
        return await ticketModel.findByIdAndUpdate(ticketId, amount).lean()
    }

    delete = async (ticketId) => {
        return await ticketModel.findByIdAndDelete(ticketId).lean()
    }
}