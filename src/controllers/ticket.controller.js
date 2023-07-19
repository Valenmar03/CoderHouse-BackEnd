import {
  cartService,
  productsService,
  ticketService,
  userService,
} from "../services/repositories.js";

const createTicket = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartById({ _id: cid });
  const userId = cart.user;
  const user = await userService.findUserBy({ _id: userId });

  const purchaser = user.email;
  let amount = 0;
  const products = cart.products;
  for (let i = 0; i < products.length; i++) {
    amount += products[i].product.price * products[i].qty;
  }

  const ticket = {
    code: "" + Math.floor(Math.random() * 1000000 + 1),
    amount: amount,
    purchaser: purchaser,
    cart: cid,
  };

  const result = await ticketService.createTicket(ticket);
  res.send({ status: "success", payload: result });
};

const getTickets = async (req, res) => {
  const tickets = await ticketService.getTickets();
  res.send({ status: "success", payload: tickets });
};

const purchase = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartById({ _id: cid });
  const prodsInCart = cart.products;
  let stock = 0;
  let prodsWithNoStock = [];
  let amountOfProdsWithoutStock = 0;

  for (let i = 0; i < prodsInCart.length; i++) {
    stock = prodsInCart[i].product.stock - prodsInCart[i].qty;
    const product = await productsService.getProductById(
      prodsInCart[i].product._id
    );
    if (stock < 0) {
        prodsWithNoStock.push(prodsInCart[i].product._id);
        amountOfProdsWithoutStock = prodsInCart[i].product.price * prodsInCart[i].qty;
        console.log(amountOfProdsWithoutStock);
    } else if (stock >= 0) {
        product.stock = stock;
        await productsService.updateProduct(prodsInCart[i].product._id, product);
    }
  }

  const cartWithoutProds = await cartService.deleteAllProducts({ _id: cid });
  if (prodsWithNoStock.length > 0) {
    for (let i = 0; i < prodsWithNoStock.length; i++) {
      await cartService.addProductToCart(cid, prodsWithNoStock[i], 1);
    }

    /* return res.send({
      status: "success",
      message: "Some products are out of stock",
    }) */;
  }

  console.log(amountOfProdsWithoutStock)
  const ticket = await ticketService.findTicketBy(cid);
  const ticketAmount = ticket.amount;
  const newAmount = ticketAmount - amountOfProdsWithoutStock;
  const newTicket = await ticketService.updateTicket(
    { _id: ticket._id },
    {amount: newAmount} 
  );

  await ticketService.deleteTicket({ _id: ticket._id });

  res.send({ status: "success", payload: newTicket });
};


const deleteTicket= async (req, res) => {
    const { tid } = req.params;
    const ticket = await ticketService.deleteTicket({ _id: tid })
    res.send({ status: "success", message: 'Ticket deleted successfully'});
}

export default {
  createTicket,
  getTickets,
  purchase,
  deleteTicket
};
