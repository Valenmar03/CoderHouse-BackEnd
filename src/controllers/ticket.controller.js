import { cartService, ticketService } from "../services/repositories.js";


const createTicket = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartService.getCartById({ _id: cid })
    const products = cart.products

    let amount = 0

    for (let i = 0; i < products.length; i++) {
        amount+= (products[i].product.price * products[i].qty)     
    }

    
    res.send({ status: "success", payload: cart });
}

const getTicketById = async (req, res) => {
    
    const ticket = await ticketService.getTicketById()
    res.send({ status: "success", payload: ticket });
}



export default {
    createTicket,
    getTicketById,

}