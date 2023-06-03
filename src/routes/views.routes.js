import { Router } from "express";
import ProductManager from "../dao/fileSystem/manager/ProductManager.js";
import ProductManagerMongo from "../dao/mongo/manager/productsManager.js";
import CartManagerMongo from "../dao/mongo/manager/cartsManager.js";

const productService = new ProductManagerMongo();

const cartService = new CartManagerMongo();

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const { page = 1 } = req.query;
  const sort = req.query.sort;
  const category = req.query.category;

  console.log(sort);
  console.log(category);
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productService.getProducts(page, sort, category);

  const products = docs;
  res.render("home", {
    css: "home",
    prod: products,
    page: rest.page,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  });
});

router.get("/realTimeProducts", async (req, res) => {
  const result = await productService.getProducts();
  console.log(result);
  res.render("realTimeProducts", {
    css: "realTimeProducts",
    prod: result.docs,
  });
});

router.get("/chat", async (req, res) => {
  res.render("chat");
});

router.get("/carts/:cid", async (req, res) => {
  const { cid} = req.params;
  const cart = await cartService.getCartById({ _id: cid })
  res.render("carts", {
    css: "cart",
    prod: cart.products,
  });
});

export default router;
