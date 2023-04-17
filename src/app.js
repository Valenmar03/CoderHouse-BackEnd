import express from "express";
import ProductManager from "../manager/ProductManager.js";

const app = express();

const productManager = new ProductManager();

const products = await productManager.getProducts();

app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  const parseLimit = parseInt(limit);
  if (!limit || parseLimit > products.length) {
    res.send(products)
  } else {
    res.send(products.slice(0, parseLimit));
  }
});

app.get("/products/:pid", async (req, res) => {
  const paramId = Object.values(req.params)[0];
  const id = parseInt(paramId);
  const product = await productManager.getProductById(id);
  res.send(product);
});

app.listen(8080, () => console.log("Listening on Port 8080"));
