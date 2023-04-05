import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "../desafios/files/products.json";
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    }
    return [];
  };

  addProducts = async (product) => {
    const products = await this.getProducts();

    const validation = Object.values(product);
    const empty = validation.some((e) => e === undefined);
    if (empty) {
      console.log("Falta ingresar datos");
      return null;
    }

    /* const codeValidation = products.some((e) => e.code === code);
    if (codeValidation) {
      throw new Error("El codigo esta repetido");
    } */

    if (products.length === 0) {
      product.id = 1;
    } else {
      const lastProduct = products[products.length - 1];
      product.id = lastProduct.id + 1;
    }

    products.push(product);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
  };

  getProductById = async (productId) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      throw new Error("Id no encontrado");
    }
    const product = products[productIndex];
    return product;
  };

  deleteProduct = async (productId) => {
    const products = await this.getProducts();
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      throw new Error("Id no encontrado");
    }
    products.splice(productIndex, 1);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
  };
}
