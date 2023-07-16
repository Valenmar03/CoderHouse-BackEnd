import PersistenceFactory from "../../dao/Factory.js";
import CartRepository from "../carts.service.js";


const cartDAO = await PersistenceFactory.getPersistence()
console.log(cartDAO)