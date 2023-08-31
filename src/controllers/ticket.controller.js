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
      } else if (stock >= 0) {
        product.stock = stock;
        await productsService.updateProduct(
          prodsInCart[i].product._id,
          product
        );
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
      }) */
    }

    const ticket = await ticketService.findTicketBy(cid);
    const ticketAmount = ticket.amount;
    const newAmount = ticketAmount - amountOfProdsWithoutStock;
    await ticketService.updateTicket(
      { _id: ticket._id },
      { amount: newAmount }
    );
    const newTicket = await ticketService.findTicketBy(cid);
    await ticketService.deleteTicket({ _id: ticket._id });
    
    if(newAmount === 0){
      return res.send({ status: "error", error:"No se pudo realizar la compra, producto/s fuera de stock"})
    }
    if(ticketAmount !== newAmount) {
      return res.send({ status: "success", message:"Compra realizada, algunos productos estan sin stock"})
    }

    res.send({ status: "success", payload: newTicket });
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
