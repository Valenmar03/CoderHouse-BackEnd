import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { privacy } from "../middlewares/auth.js";

const router = Router();

router.get("/", viewsController.homePage);
router.get("/realTimeProducts", privacy('ADMIN'), viewsController.realTimeProductsPage);
router.get("/chat",privacy('USER'), viewsController.chatPage);
router.get("/products/:pid", privacy('USER'), viewsController.productDetailPage);
router.get("/carts/:cid", privacy('USER'), viewsController.cartPage);
router.get('/profile', privacy('USER','ADMIN'), viewsController.profilePage);
router.get("/register", privacy('NO_AUTH'), viewsController.registerPage);
router.get("/login", privacy('NO_AUTH'), viewsController.loginPage);
router.get('/logout', privacy('USER'), viewsController.logoutPage);

export default router;
