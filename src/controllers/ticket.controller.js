import { cartService, ticketService, userService } from "../services/repositories.js";


const createTicket = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartService.getCartById({ _id: cid })
    const userId = cart.user
    const user = await userService.findUserBy({ _id: userId })
    
    const purchaser = user.email
    let amount = 0
    const products = cart.products
    for (let i = 0; i < products.length; i++) {
        amount+= (products[i].product.price * products[i].qty)     
    }
    
    const ticket = {
        code: '' + Math.floor(Math.random() * 1000000 + 1),
        amount: amount,
        purchaser: purchaser
    }

    
    
    const result = await ticketService.createTicket(ticket)
    
    res.send({ status: "success", payload: result });
}

const getTicketById = async (req, res) => {
    const ticket = await ticketService.getTicketById()
    res.send({ status: "success", payload: ticket });
}



export default {
    createTicket,
    getTicketById,

}