import { productsService, userService } from "../services/repositories.js";
import config from "../config/env.config.js";

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
    const product = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      thumbnail: req.body.thumbnail
    };
    const email = req.body.email;

    if (product.category === " ") {
      product.category = null;
    }

    const session = req.session.user;

    if (!session) {
      if(!email || email.trim() == "")product.owner = "admin";
      else {
        const user = await userService.findUserBy({ email: email });
        if (user.role === "premium") product.owner = email;
      }
  

    } else if (session.role === "premium") {
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
    
    if(product.price < 1 || product.stock < 1) return res.send({status: 'error', error: 'Negative numbres aren´t allowed'})

    if(!isNaN(product.price) || !isNaN(product.stock)) return res.send({status: 'error', error: 'Invalid data type for stock or price'})


    const newProduct = await productsService.addProducts(product);

    if (!session) {
      if(!email || email.trim() == "") res.send({ status: "success", payload: product });
      else{

        const user = await userService.findUserBy({ email: email });
        const id = user._id
        user.products.push(newProduct._id);
        const newUser = await userService.updateUser(id, user);
      }

    }else if (session.role === "premium") {
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
    const email = req.body.email;
    const productToDelete = await productsService.getProductById({ _id: pid });

    if (!productToDelete) {
      ErrorService.createError({
        name: "Error buscando producto",
        cause: productErrorProdNotFound(),
        message: "Product not found",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }

    if(!email || email.trim() === '' ) return res.send({status: 'error', error: 'Incomplete email value'})
    const user = await userService.findUserBy({ email: email });
    if(!user) return res.send({status: 'error', error: 'User not found'});

    if (user.email === productToDelete.owner || email === config.adminEmail) {
      const deletedProduct = await productsService.deleteProduct({ _id: pid });
      res.send({ status: "success", message: "Product deleted succesfully" });
    } else {
      return res.send({
        status: "error",
        error: "This isn´t your product, you can´t delete it",
      });
    }
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
