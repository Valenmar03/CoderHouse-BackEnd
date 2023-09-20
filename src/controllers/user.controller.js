import {
  userService,
  cartService,
  productsService,
} from "../services/repositories.js";
import { createHash, validatePassword } from "../utils.js";

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const regex = /[A-Za-z]+/g;

    const name = first_name.trim();
    const namesArray = name.match(regex);

    if (namesArray.length > 2)
      return res.send({
        status: "error",
        error: "You cant put more than 2 first names",
      });
    if (namesArray.length === 1 && name.length > namesArray[0].length)
      return res.send({ status: "error", error: "Invalid characters" });
    if (namesArray.length === 2) {
      const completeName = namesArray[0].length + namesArray[1].length;
      if (name.length - completeName > 1)
        return res.send({
          status: "error",
          error: "You put more than one space",
        });
    }

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

    res.send({ status: "success", payload: "User created succesfully" });
  } catch (error) {
    res.send({
      status: "error",
      error: "An user with that email already exists",
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await userService.getUsers();
  const detailUsers = [];
  for (let i = 0; i < users.length; i++) {
    const detailUser = {
      name: `${users[i].first_name} ${users[i].last_name}`,
      email: users[i].email,
      role: users[i].role,
    };

    detailUsers.push(detailUser);
  }
  res.send({ status: "success", payload: detailUsers });
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

const uploadDocuments = async (req, res) => {
  const { uid } = req.params;
  res.send({
    status: "success",
    message: "Document uploaded successfully",
    payload: uid,
  });
};

const upgradeUser = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.findUserBy({ _id: uid });

  if (!user) return res.send({ status: "error", error: "user not found" });

  if (user.role == "admin")
    return res.send({ status: "error", error: "You are the admin" });
  if (user.role == "premium")
    return res.send({
      status: "error",
      error: "Your account has already been upgraded",
    });

  if (user.role == "user") 
  
  user.role = "premium";

  const premiumUser = await userService.updateUser({ _id: uid }, user);

  res.send({ status: "success", payload: user });
};

const downgradeUser = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.findUserBy({ _id: uid });

  if (!user) return res.send({ status: "error", error: "user not found" });

  if (user.role == "admin")
    return res.send({ status: "error", error: "You are the admin" });
  if (user.role == "user")
    return res.send({
      status: "error",
      error: "Your account has already been downgraded",
    });

  for (let i = 0; i < user.products.length; i++) {
    const deleteProduct = await productsService.deleteProduct({
      _id: user.products[i],
    });
  }

  user.role = "user";
  user.products = [];

  const downgradeUser = await userService.updateUser({ _id: uid }, user);

  res.send({ status: "success", payload: user });
};

const changeRole = async (req, res) => {
  const email = req.body.email;

  const user = await userService.findUserBy({ email: email });

  if (user.role == "premium") {
    for (let i = 0; i < user.products.length; i++) {
      const deleteProduct = await productsService.deleteProduct({
        _id: user.products[i],
      });
    }

    user.role = "user";
    user.products = [];

    const downgradeUser = await userService.updateUser({ _id: user._id }, user);

    return res.send({ status: "success", message: "New role: user", payload: user.email });
  }

  if (user.role == "user") {
    user.role = "premium";

    const premiumUser = await userService.updateUser({ _id: user._id }, user);
  
    return res.send({ status: "success", message: "New role: premium", payload: user.email });
  }
};

const deleteFront = async (req, res) => {
  const email = req.body.email;

  const user = await userService.findUserBy({ email: email });

  console.log(user)

  res.send({ status: "success" })
}

export default {
  createUser,
  getAllUsers,
  getUserByEmailAndPass,
  getUserById,
  updateUser,
  deleteUser,
  uploadDocuments,
  upgradeUser,
  downgradeUser,
  changeRole,
  deleteFront, 
};
