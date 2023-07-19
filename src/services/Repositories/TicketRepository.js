

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTicket(ticket){
        return this.dao.create(ticket)
    }

    findTicketBy(value){
        return this.dao.findBy(value)
    }

    updateTicket(ticketId, amount){
        return this.dao.update(ticketId, amount)
    }

    getTickets(){
        return this.dao.get()
    }

    deleteTicket(ticketId){
        return this.dao.delete(ticketId)
    }
}