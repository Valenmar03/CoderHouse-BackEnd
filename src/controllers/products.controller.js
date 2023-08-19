import { productsService, userService } from "../services/repositories.js";

import { generateMockProds } from "../mocks/products.mock.js";
import ErrorService from "../services/error.service.js";
import {
  productErrorIncompleteValues,
  productErrorProdNotFound,
} from "../constants/productsErrors.js";
import EErrors from "../constants/EErrors.js";

const getProducts = async (req, res) => {
  const category = req.query.category;
  const products = await productsService.getProducts();
  res.send({ status: "success", payload: products });
};

const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productsService.getProductById({ _id: pid });
    if (!product) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Producto no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }

    res.send({ status: "success", payload: product });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = req.body;

    const session = req.session.user;
    if (session.role === "premium") {
      const id = req.session.user.id;
      const user = await userService.findUserBy({ _id: id });
      product.owner = user.email;
    }

    product.code = Math.floor(Math.random() * 1000000 + 1);

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.category ||
      !product.stock
    ) {
      ErrorService.createError({
        name: "Error de creacion de producto",
        cause: productErrorIncompleteValues(product),
        message: "Falta completar campos",
        code: EErrors.INCOMPLETE_VALUES,
        status: 400,
      });
    }
    const newProduct = await productsService.addProducts(product);

    if (session.role === "premium") {
      const id = req.session.user.id;
      const user = await userService.findUserBy({ _id: id });
      user.products.push(newProduct._id);
      const newUser = await userService.updateUser(id, user);
    }

    res.send({ status: "success", payload: product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const { pid } = req.params;
    const productToUpdate = await productsService.updateProduct(pid, product);
    if (!productToUpdate) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Producto no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.category ||
      !product.stock
    ) {
      ErrorService.createError({
        name: "Error de creacion de producto",
        cause: productErrorIncompleteValues(product),
        message: "Falta completar campos",
        code: EErrors.INCOMPLETE_VALUES,
        status: 400,
      });
    }

    res.send({ status: "success", payload: productToUpdate });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productToDelete = await productsService.getProductById({ _id: pid})

    if (!productToDelete) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Producto no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    const deletedProduct = await productsService.deleteProduct({ _id: pid });
    
    res.send({ status: "success", message: "Product deleted succesfully" });
  } catch (error) {
    next(error);
  }
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
