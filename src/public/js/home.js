import ProductManager from "../../../manager/ProductManager";

const productManager = new ProductManager();

const products = await productManager.getProducts();

const ul = document.getElementById("products-list");

let productsList = "";
console.log()
