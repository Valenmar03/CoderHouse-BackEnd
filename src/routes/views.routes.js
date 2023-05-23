import { Router } from "express";
import ProductManager from "../dao/fileSystem/manager/ProductManager.js";
import ProductManagerMongo from "../dao/mongo/manager/productsManager.js";

const productService = new ProductManagerMongo();

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productService.getProducts(page);

    console.log(await productService.getProducts(page))
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

export default router;
