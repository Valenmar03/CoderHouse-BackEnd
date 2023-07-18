

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTicket(amount, purchaser){
        return this.dao.create(amount, purchaser)
    }

    getTicketById(ticketId){
        return this.dao.get(ticketId)
    }

    deleteTicket(ticketId){
        return this.dao.delete(ticketId)
    }
}