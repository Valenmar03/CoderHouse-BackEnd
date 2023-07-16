import ProductManagerMongo from "../dao/mongo/manager/productsManager.js";
import CartManagerMongo from "../dao/mongo/manager/cartsManager.js";
import ViewUserDTO from "../dto/viewUserDTO.js";

const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();

const homePage = async (req, res) => {
  const { page = 1 } = req.query;
  const sort = req.query.sort;
  const category = req.query.category;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productService.getProducts(page, sort, category);

  const products = docs;
  res.render("home", {
    css: "home",
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
  const result = await productService.getAllProducts();
  res.render("realTimeProducts", {
    css: "realTimeProducts",
    prod: result,
  });
};

const chatPage = async (req, res) => {
  res.render("chat");
};

const productDetailPage = async (req, res) => {
  const { pid } = req.params;
  const product = await productService.getProductById({ _id: pid });
  res.render("prodDetails", {
    css: "product",
    prod: product,
  });
};

const cartPage = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartById({ _id: cid });
  res.render("carts", {
    css: "cart",
    prod: cart.products,
  });
};

const profilePage = async (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
};

const registerPage = async (req, res) => {
  res.render("register");
};

const loginPage = async (req, res) => {
  res.render("login");
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
