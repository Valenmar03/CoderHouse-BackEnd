
const register = async (req, res) => {
    res.send({ status: "success", message: "Registered" });
}

const registerFail = (req, res) => {
    res.status(400).send({ status: "error", error: req.session.messages[req.session.messages.length - 1] });
}

const login = async (req, res) => {
    req.session.user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      cart: req.user.cart
    };
    if (req.session.user.role === "admin") {
      res.send({ status: "success", message: "Admin is login" });
    } else {
      res.send({ status: "success" });
    }
}

const loginFail = (req, res) => {
  console.log(req.session.messages)
    res.status(400).send({
      status: "error",
      error: req.session.messages[req.session.messages.length - 1],
    });
}  

const github = (req, res) => {
    const user = req.user;
  
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  
    res.send({ status: "success" });
}


export default {
    register,
    registerFail,
    login,
    loginFail,
    github,

}