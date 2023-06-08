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

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productService.getProductById({ _id: pid });
  res.render("prodDetails", {
    css: "product",
    prod: product,
  });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartById({ _id: cid });
  res.render("carts", {
    css: "cart",
    prod: cart.products,
  });
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

export default router;
