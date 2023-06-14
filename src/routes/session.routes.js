import { Router, response } from "express";
import UserManagerMongo from "../dao/mongo/manager/userManager.js";
import passport from "passport";

const router = Router();

const userService = new UserManagerMongo();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/registerFail",
    failureMessage: true,
  }),
  async (req, res) => {
    res.send({ status: "success", message: "Registered" });
  }
);

router.get("/registerFail", (req, res) => {
  console.log(req.session.message)
  res.status(400).send({ status: "error", error: req.session.message });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginFail",
    failureMessage: true,
  }),
  async (req, res) => {

    req.session.user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
    res.send({ status: "success" });
  }
);

router.get('/loginFail', (req, res) => {
  console.log(req.session.message)
  res.status(400).send({ status: "error", error: req.session.message });
})

export default router;
