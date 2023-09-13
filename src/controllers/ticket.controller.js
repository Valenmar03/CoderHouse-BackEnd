import {
  cartService,
  productsService,
  ticketService,
  userService,
} from "../services/repositories.js";
import EErrors from "../constants/EErrors.js";
import { productErrorProdNotFound } from "../constants/productsErrors.js";
import { cartErrorNotFound } from "../constants/cartErrors.js";
import ErrorService from "../services/error.service.js";

const createTicket = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById({ _id: cid });
    const userId = cart.user;
    const user = await userService.findUserBy({ _id: userId });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    if (!user) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Producto no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }

    const tickets = await ticketService.getTickets()
    for (let i = 0; i < tickets.length; i++) {
      console.log(tickets[i].cart._id)
      console.log(cart._id)
      if(tickets[i].cart._id = cart._id){
        const tid = tickets[i]._id
        console.log(tid)
        const deletedTicket = await ticketService.deleteTicket({ _id: tid })
      }  
    }


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
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res) => {
  const tickets = await ticketService.getTickets();
  res.send({ status: "success", payload: tickets });
};

const purchase = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById({ _id: cid });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }

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
        amountOfProdsWithoutStock =
          prodsInCart[i].product.price * prodsInCart[i].qty;
      }
    }
    if(prodsWithNoStock.length > 0){
      console.log(prodsWithNoStock)
      if(cart.products.length === prodsWithNoStock.length){
        return res.send({ status: "error", error:"El/los producto/s estan sin stock"})
      }

      let prodTitles = []
      for (let i = 0; i < prodsWithNoStock.length; i++) {
        const product = await productsService.getProductById({ _id: prodsWithNoStock[i]})
        prodTitles.push(product.title)
      }

      return res.send({ status: "error", error:"Algunos de tus productos estan sin stock", payload: prodTitles})
    }

    const cartWithoutProds = await cartService.deleteAllProducts({ _id: cid });
    
    stock = 0;

    for (let i = 0; i < prodsInCart.length; i++) {
      stock = prodsInCart[i].product.stock - prodsInCart[i].qty;
      const product = await productsService.getProductById(
        prodsInCart[i].product._id
      );
      
      product.stock = stock;
        await productsService.updateProduct(
          prodsInCart[i].product._id,
          product
        );
    }

    const ticket = await ticketService.findTicketBy(cid);
    await ticketService.deleteTicket({ _id: ticket._id });

    res.send({ status: "success", payload: 'Compra realizada correctamente' });
  } catch (error) {
    next(error);
  }
};

const deleteTicket = async (req, res) => {
  const { tid } = req.params;
  const ticket = await ticketService.deleteTicket({ _id: tid });
  res.send({ status: "success", message: "Ticket deleted successfully" });
};

export default {
  createTicket,
  getTickets,
  purchase,
  deleteTicket,
};
