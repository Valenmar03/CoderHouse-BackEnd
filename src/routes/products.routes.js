import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.post("/", productsController.addProduct);
router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

router.post('/mockingproducts', productsController.mockProds)

/* router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const parseLimit = parseInt(limit);
  if (!limit || parseLimit > products.length) {
    try {
      res.send({ status: "success", payload: products });
    } catch (error) {
      res.status(400).send({ status: "error", error: "Ocurrio un error" });
    }
  } else {
    const productsLimit = products.slice(0, parseLimit);
    try {
      res.send({ status: "success", payload: productsLimit });
    } catch (error) {
      res.status(400).send({ status: "error", error: "Ocurrio un error" });
    }
  }
}); */

//GETBYID de FILESYSTEM
/* router.get("/:pid", async (req, res) => {
  const paramId = Object.values(req.params)[0];
  const id = parseInt(paramId);
  const validateProd = await productManager.getProductById(id);
  if (validateProd === "Id not Found") {
    return res.status(400).send({ status: "error", error: `${validateProd}` });
  }
  res.send({ status: "success", payload: validateProd });
}); */

//POST de FILESYSTEM
/* router.post("/", async (req, res) => {
  const product = req.body;
  const validateProd = await productManager.addProducts(product);
  if (validateProd === "Code is repited") {
    return res.status(400).send({ status: "error", error: `${validateProd}` });
  }
  if (validateProd == "Missing Data") {
    return res.status(400).send({ status: "error", error: `${validateProd}` });
  }
  const products = await productManager.getProducts();
  console.log(products)
  req.io.emit("products-list", products);
  res.send({ status: "success", message: "Product added successfully" });
});  */

/* router.put("/:pid", async (req, res) => {
  const product = req.body;
  const paramId = Object.values(req.params)[0];
  const id = parseInt(paramId);
  const validateProd = await productManager.updateProduct(
    id,
    product.title,
    product.description,
    product.price,
    product.thumbnail,
    product.code,
    product.category,
    product.status,
    product.stock
  );
  if (validateProd === "Code is repited") {
    return res.status(400).send({ status: "error", error: `${validateProd}` });
  }
  if (validateProd === "Missing Data") {
    return res.status(400).send({ status: "error", error: `${validateProd}` });
  }
  if (validateProd === "Id not Found") {
    return res.status(400).send({ status: "error", error: `${validateProd}` });
  }

  res.send({ status: "success", message: "Product updated successfully" });
}); */

/* router.delete("/:pid", async (req, res) => {
  const paramId = Object.values(req.params)[0];
  const id = parseInt(paramId);
  const validateProd = await productManager.deleteProduct(id);
  if (validateProd === "Id not Found") {
    return res.status(400).send({ status: "error", error: `${validateProd}` });
  }
  res.send({ status: "deleted", message: "Product deleted successfully" });
}); */

export default router;
