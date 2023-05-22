import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";

import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import viewsRouter from "./routes/views.routes.js";

import ProductManager from "./dao/fileSystem/manager/ProductManager.js";
import registerChatHandler from "./listeners/chatHandler.js";

import __dirname from "./utils.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);
const connection =  mongoose.connect('mongodb+srv://ValenMar03:waZn1UqPdmKITDv3@clustercoder.d2v3oms.mongodb.net/E-Commerce?retryWrites=true&w=majority')

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next)=>{
    req.io = io;
    next();
})

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);


io.on("connection", (socket) => {
  registerChatHandler(io, socket);
});
