import { cartService, productsService } from "../services/repositories.js";
import ErrorService from "../services/error.service.js";

const homePage = async (req, res) => {
  const { page = 1 } = req.query;
  const sort = req.query.sort;
  const category = req.query.category;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productsService.getProducts(page, sort, category);

  const products = docs;
  res.render("home", {
    css: "home",
    title: "Home",
    prod: products,
    user: req.session.user,
    page: rest.page,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  });
};

const realTimeProductsPage = async (req, res) => {
  const result = await productsService.getAllProducts();
  res.render("realTimeProducts", {
    css: "realTimeProducts",
    title: "Administrador",
    prod: result,
  });
};

const chatPage = async (req, res) => {
  res.render("chat", {
    title: "Chat",
  });
};

const productDetailPage = async (req, res, next) => {
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
    res.render("prodDetails", {
      css: "product",
      title: product.title,
      prod: product,
    });
    
  } catch (error) {
    next(error);
  }
};

const cartPage = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getCartById({ _id: cid });
    if (!cart) {
      ErrorService.createError({
        name: "Error buscando carrito",
        cause: cartErrorNotFound(),
        message: "Carrito no encontrado",
        code: EErrors.NOT_FOUND,
        status: 404,
      });
    }
    
    res.render("carts", {
      css: "cart",
      title: "Carrito",
      prod: cart.products,
    });
    
  } catch (error) {
    next(error)  
  }
};

const profilePage = async (req, res) => {
  const user = req.session.user;
  res.render("profile", {
    title: `Perfil de ${user.name}`,
    user: user,
  });
};

const registerPage = async (req, res) => {
  res.render("register", {
    title: "Registrate",
  });
};

const loginPage = async (req, res) => {
  res.render("login", {
    title: "Inicia Sesión",
  });
};

const logoutPage = async (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};

export default {
  homePage,
  realTimeProductsPage,
  chatPage,
  productDetailPage,
  cartPage,
  profilePage,
  registerPage,
  loginPage,
  logoutPage,
};
