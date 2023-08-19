import {
  cartService,
  productsService,
  userService,
} from "../services/repositories.js";
import ErrorService from "../services/error.service.js";

const homePage = async (req, res) => {
  const { page = 1 } = req.query;
  const sort = req.query.sort;
  const category = req.query.category;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productsService.getProducts(page, sort, category);

  const products = docs;
  res.render("mainPages/home", {
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
  const user = req.session.user;
  if (user.role === "admin") {
    const result = await productsService.getAllProducts();
    res.render("mainPages/realTimeProducts", {
      css: "realTimeProducts",
      title: "Crear Producto",
      prod: result,
      user: user,
      admin: true,
    });
  } else {
    const dbUser = await userService.findUserBy({ _id: user.id });

    let result = [];
    for (let i = 0; i < dbUser.products.length; i++) {
      const product = await productsService.getProductById(dbUser.products[i]);
      result.push(product);
    }

    res.render("mainPages/realTimeProducts", {
      css: "realTimeProducts",
      title: "Crear Producto",
      prod: result,
      user: user,
      admin: null,
    });
  }
};

const deleteProducts = async (req, res) => {
  res.render('deleteProducts', {
    title: 'Eliminar Productos'
  })
}

const chatPage = async (req, res) => {
  res.render("chat/chat", {
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
    next(error);
  }
};

const profilePage = async (req, res) => {
  const user = req.session.user;
  let premium;
  if (user.role === "premium") {
    premium = true;
  } else {
    premium = null;
  }
  res.render("profile", {
    title: `Perfil de ${user.name}`,
    user: user,
    premium: premium,
  });
};

const registerPage = async (req, res) => {
  res.render("registerLogin/register", {
    title: "Registrate",
  });
};

const loginPage = async (req, res) => {
  res.render("registerLogin/login", {
    title: "Inicia Sesión",
  });
};

const logoutPage = async (req, res) => {
  req.session.destroy((err) => {
    res.redirect("/login");
  });
};

const restoreRequest = async (req, res) => {
  res.render("password/restoreRequest", { title: "Restablecer Contraseña" });
};

const changePasswordPage = async (req, res) => {
  res.render("password/changePassword", {
    title: "Cambiar Contraseña",
  });
};

const mailSended = async (req, res) => {
  res.render("password/mailSended", {
    title: "Correo enviado",
  });
};

const restorePassword = async (req, res) => {
  res.render("password/restorePassword", { title: "Restablecer contraseña" });
};

const upgradeUser = async (req, res) => {
  res.render("upgradeUser", {
    title: "Hazte Premium",
  });
};

const changeRole = async (req, res) => {
  const { id } = req.session.user;
  const user = await userService.findUserBy({ _id: id });
  let premium;

  if (user.role === "premium") {
    user.role = "user";
    req.session.user.role = "user";
    user.products = [];
    const newUser = await userService.updateUser(user._id, user);
    premium = null;
  } else if (user.role === "user") {
    user.role = "premium";
    req.session.user.role = "premium";
    const newUser = await userService.updateUser(user._id, user);
    premium = true;
  }

  res.render("changeRole", {
    title: "Eres Premium!",
    premium,
  });
};

const makeUser = async (req, res) => {
  const { id } = req.session.user;
  const user = await userService.findUserBy({ _id: id });

  if (user.role === "user") {
    return res.redirect("/profile");
  } else if (user.role === "premium") {
    user.role = "user";
    const newUser = await userService.updateUser(user._id, user);
  }
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
  restoreRequest,
  changePasswordPage,
  mailSended,
  restorePassword,
  upgradeUser,
  changeRole,
};
