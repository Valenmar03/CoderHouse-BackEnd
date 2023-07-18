

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTicket(ticket){
        return this.dao.create(ticket)
    }

    findTicketById(ticketId){
        return this.dao.findBy(ticketId)
    }

    updateTicket(ticketId, amount){
        return this.dao.update(ticketId, amount)
    }

    getTicketById(ticketId){
        return this.dao.get(ticketId)
    }

    deleteTicket(ticketId){
        return this.dao.delete(ticketId)
    }
}