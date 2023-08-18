import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import { privacy } from "../middlewares/auth.js";

const router = Router();

router.get("/", viewsController.homePage);
router.get("/realTimeProducts", privacy('PREMIUM-ADMIN'), viewsController.realTimeProductsPage);
router.get("/chat",privacy('USER-PREMIUM'), viewsController.chatPage);
router.get("/products/:pid", privacy('USER-PREMIUM'), viewsController.productDetailPage);
router.get("/carts/:cid", privacy('USER-PREMIUM'), viewsController.cartPage);
router.get('/profile', privacy('LOGUED'), viewsController.profilePage);
router.get("/register", privacy('NO_AUTH'), viewsController.registerPage);
router.get("/login", privacy('NO_AUTH'), viewsController.loginPage);
router.get('/logout', privacy('LOGUED'), viewsController.logoutPage);
router.get('/restoreRequest', privacy('NO_AUTH'), viewsController.restoreRequest);
router.get('/changePassword', privacy('USER-PREMIUM'), viewsController.changePasswordPage);
router.get('/mailSended', viewsController.mailSended)
router.get('/restorePassword', viewsController.restorePassword)
router.get('/upgradeUser',privacy('USER'), viewsController.upgradeUser)
router.get('/changeRole', privacy('USER-PREMIUM'), viewsController.changeRole)

export default router;
