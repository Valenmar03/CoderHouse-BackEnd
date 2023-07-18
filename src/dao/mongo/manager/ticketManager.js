import ticketModel from "../models/ticket.model.js";

export default class TicketMangerMongo {
    create = async (ticket) => {
        return await ticketModel.create(ticket);
      };

    get = async () => {
        return await ticketModel.find().lean();
    }

    findBy = async (ticketId) => {
        return await ticketModel.findById(ticketId);
    }

    update = async (ticketId, amount) => {
        return await ticketModel.findByIdAndUpdate(ticketId, { amount: amount})
    }

    delete = async (ticketId) => {
        return await ticketModel.findByIdAndDelete(ticketId).lean()
    }
}