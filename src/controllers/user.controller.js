import { userService, cartService } from "../services/repositories.js";
import { createHash, validatePassword } from "../utils.js";

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.send({ status: "error", error: "Incomplete values" });
    }

    const cart = await cartService.createCart();

    const hashedPass = await createHash(password);
    const user = {
      first_name,
      last_name,
      cart,
      email,
      hashedPass,
    };

    const createdUser = await userService.createUser(user);
    await cartService.updateCart({ _id: cart._id }, createdUser._id);

    res.send({ status: "success", payload: createdUser });
  } catch (error) {
    res.send({
      status: "error",
      error: "An user with that email already exists",
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.send({ status: "success", payload: users });
};

const getUserByEmailAndPass = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findUser({ email });

  const validPassword = await validatePassword(password, user.password);

  if (!validPassword) {
    return res.send({ status: "error", error: "Invalid password" });
  }

  res.send({ status: "success", payload: user });
};

const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.findUserBy({ _id: uid });
    if (!user) return res.send({ status: "error", error: "User not found" });

    res.send({ status: "success", payload: user });
  } catch (err) {
    res.send({ status: "error", error: "User not found" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { first_name, last_name } = req.body;

    const userToUpdate = await userService.findUserBy({ _id: uid });
    if (!userToUpdate)
      return res.send({ status: "error", error: "User not found" });

    if (!first_name || !last_name)
      return res.send({ status: "error", error: "Incomplete values" });

    userToUpdate.first_name = first_name;
    userToUpdate.last_name = last_name;

    const userUpdated = await userService.updateUser(
      { _id: uid },
      userToUpdate
    );
    res.send({ status: "success", error: "User updated" });
  } catch (error) {
    res.send({ status: "error", error: "User not found" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.findUserBy({ _id: uid });
    if (!user) return res.send({ status: "error", error: "User not found" });

    const cid = user.cart;
    const deletedUser = await userService.deleteUser({ _id: uid });
    const deletedCart = await cartService.deleteCart({ _id: cid });

    res.send({ status: "success", message: "User deleted succesfully" });
  } catch (error) {
    res.send({ status: "error", error: "User not found" });
  }
};

export default {
  createUser,
  getAllUsers,
  getUserByEmailAndPass,
  getUserById,
  updateUser,
  deleteUser,
};
