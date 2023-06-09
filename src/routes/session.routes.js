import { Router } from "express";
import UserManagerMongo from "../dao/mongo/manager/userManager.js";

const router = Router();

const userService = new UserManagerMongo();

router.post("/register", async (req, res) => {
  const user = req.body;

  if (!user.first_name || !user.password || !user.email || !user.last_name) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  }

  const result = await userService.createUser(user);
  res.send({ status: "success", payload: result });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.user = {
      name: "adminCoder",
      email: "adminCoder@coder.com",
      password: "adminCod3r123",
      role: "admin",
    };

    return res.send({ status: "success", message: "admin" });
  }

  const user = await userService.findUser({ email, password });
  if (!user) {
    res.status(401).send({ status: "error", error: "Incorrect Credentials" });
  }

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: `${user.email}`,
    role: `${user.role}`,
  };
  res.send({ status: "success" });
});

export default router;
