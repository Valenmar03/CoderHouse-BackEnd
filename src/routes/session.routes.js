import { Router, response } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/registerFail",
    failureMessage: true,
  }),
  sessionController.register
);

router.get("/registerFail", sessionController.registerFail);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginFail",
    failureMessage: true,
  }),
  sessionController.login
);

router.get("/loginFail", sessionController.loginFail);

router.get("/github", passport.authenticate("github"), (req, res) => {});

router.get("/githubcallback", passport.authenticate("github"), sessionController.github);

export default router;
