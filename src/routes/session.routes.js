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


export default router;
