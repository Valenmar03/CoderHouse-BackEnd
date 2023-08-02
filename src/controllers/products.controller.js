import { productsService } from "../services/repositories.js";

import { generateMockProds } from "../mocks/products.mock.js";
import ErrorService from "../services/errorService.js";
import { productErrorIncompleteValues } from "../constants/productsErrors.js";
import EErrors from "../constants/EErrors.js";

const getProducts = async (req, res) => {
  const category = req.query.category;
  const products = await productsService.getProducts();
  res.send({ status: "success", payload: products });
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  const product = await productsService.getProductById({ _id: pid });
  if (!product)
    return res
      .status(404)
      .send({ status: "error", error: "Product not found" });

  res.send({ status: "success", payload: product });
};

const addProduct = async (req, res) => {
  const product = req.body;
  product.code = Math.floor(Math.random() * 1000000 + 1);
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.category ||
    !product.stock
  ) {
    const err = ErrorService.createError({
      name: "Error de creacion de producto",
      cause: productErrorIncompleteValues(product),
      message: "Falta completar campos",
      code: EErrors.INCOMPLETE_VALUES,
      status: 400,
    });
    return res.send({ status: "error", error: err });
  }
  await productsService.addProducts(product);
  res.send({ status: "success", payload: product });
};

const updateProduct = async (req, res) => {
  const product = req.body;
  const { pid } = req.params;
  const productToUpdate = await productsService.updateProduct(pid, product);
  if (!productToUpdate)
    return res
      .status(404)
      .send({ message: "error", error: "Product not Found" });

  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.code ||
    !product.category ||
    !product.stock
  )
    return res
      .status(400)
      .send({ message: "error", error: "Incomplete values" });

  res.send({ status: "success", payload: productToUpdate });
};

const deleteProduct = async (req, res) => {
  const pid = req.body;
  for (let i = 0; i < pid.length; i++) {
    const product = await productsService.deleteProduct(pid[i]);
    if (!product)
      return res
        .status(404)
        .send({ status: "error", error: "Product not found" });
  }

  res.send({ status: "success", message: "Product/s deleted succesfully" });
};

const mockProds = async (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push(generateMockProds());
  }
  res.send({ status: "success", payload: products });
};

export default {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  mockProds,
};
