import nodemailer from "nodemailer";
import envConfig from "../config/env.config.js";
import { createHash, validatePassword } from "../utils.js";
import { userService } from "../services/repositories.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 3000,
  auth: {
    user: envConfig.sendEmail,
    pass: envConfig.sendPass,
  },
});

const sendMailToChange = async (req, res) => {
  const user = req.session.user
  const result = await transport.sendMail({
    from: `Tienda de ropa <${envConfig.sendEmail}>`,
    to: user.email,
    subject: "Cambiar contraseña",
    html: `
      <a href="http://localhost:${envConfig.port}/changePassword">Ingrese aquí</a>`,
  });
  res.redirect('/mailSended')
  
};

const changePass = async (req, res) => {
  const email = req.session.user.email 
  const user = await userService.findUser({ email })
  const id = user._id
  const passwords = req.body
  const validPassword = await validatePassword(passwords.pass1, user.password);
  if(passwords.pass1 !== passwords.pass2) {
    return res.send({status: 'error', error: 'Las contraseñas no coinciden'})
  }
  if(validPassword){
    return res.send({status: 'error', error: 'Esta es tu contraseña actual'})
  } 
  const hashedPass = await createHash(passwords.pass1)
  user.password = hashedPass
  const newUser = await userService.updateUser(id, user)
  res.send({status: 'success', message: 'La contraseña fue cambiada correctamente'})
}

const sendMailToRestore = async (req, res) => {
  const email = req.body.email
  const result = await transport.sendMail({
    from: `Tienda de ropa <${envConfig.sendEmail}>`,
    to: email,
    subject: "Cambiar contraseña",
    html: `
      <a href="http://localhost:${envConfig.port}/restorePassword">Ingrese aquí</a>`,
  });
  res.redirect('/mailSended')
}

const restorePass = async (req, res) => {
  const email = req.body.email
  const passwords = req.body.passwords
  
  const user = await userService.findUser({ email })
  const id = user._id

  const validPassword = await validatePassword(passwords.pass1, user.password);
  if(passwords.pass1 !== passwords.pass2) {
    return res.send({status: 'error', error: 'Las contraseñas no coinciden'})
  }
  if(validPassword){
    return res.send({status: 'error', error: 'Esta es tu contraseña actual'})
  } 
  const hashedPass = await createHash(passwords.pass1)
  user.password = hashedPass
  const newUser = await userService.updateUser(id, user)

  res.send({status: 'success', message: 'Todo ok'})
}

export default {
  sendMailToChange,
  changePass,
  sendMailToRestore,
  restorePass
}