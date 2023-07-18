import CartRepository from "./Repositories/CartsRepository.js";
import ProductsRepository from "./Repositories/ProductsRepository.js";
import UserRepository from "./Repositories/UserRepository.js";

import CartManagerMongo from "../dao/mongo/manager/cartsManager.js";
import ProductManagerMongo from "../dao/mongo/manager/productsManager.js";
import UserManagerMongo from "../dao/mongo/manager/userManager.js";

export const cartService = new CartRepository(new CartManagerMongo());
export const productsService = new ProductsRepository(new ProductManagerMongo());
export const userService = new UserRepository(new UserManagerMongo());