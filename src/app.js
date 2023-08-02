import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import sessionRouter from "./routes/session.routes.js";
import viewsRouter from "./routes/views.routes.js";
import ticketsRouter from "./routes/tickets.routes.js";

import ProductManager from "./dao/fileSystem/manager/ProductManager.js";
import registerChatHandler from "./listeners/chatHandler.js";
import errorHandler from './middlewares/error.js'

import __dirname from "./utils.js";
import initializePassportStrategies from "./config/passport.config.js";
import config from "./config/env.config.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);
const connection = mongoose.connect(config.mongoUrl);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  session({
    store: new MongoStore({
      mongoUrl: config.mongoUrl,
      ttl: 3600 // Sin ttl se guarda 14 dias
    }),
    secret: "E-Commerce",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
initializePassportStrategies()


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/tickets", ticketsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

app.use(errorHandler)

io.on("connection", (socket) => {
  registerChatHandler(io, socket);
});
