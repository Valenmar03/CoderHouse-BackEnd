import fs from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./src/dao/fileSystem/files/products.json";
  }

  getProducts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(data);
      return products;
    }
    return [];
  };

  addProducts = async ({
    title,
    description,
    price,
    thumbnail = [],
    code,
    category,
    status = true,
    stock,
  }) => {
    const products = await this.getProducts();

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      category,
      status,
      stock,
    };

    const validation = Object.values(product);
    const empty = validation.some((e) => e === undefined);
    if (empty) {
      return "Missing Data";
    }

    for (let i = 0; i < products.length; i++) {
      if (products[i].code.includes(product.code)) {
        return "Code is repited";
      }
    }

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
      return "Id not Found";
    }
    const product = products[productIndex];
    return product;
  };

  updateProduct = async (
    productId,
    title,
    description,
    price,
    thumbnail,
    code,
    category,
    status,
    stock
  ) => {
    const products = await this.getProducts();

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      category,
      status,
      stock,
    };

    const validation = Object.values(product);
    const empty = validation.some((e) => e === undefined);
    if (empty) {
      return `Missing Data`;
    }

    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    if (productIndex === -1) {
      return "Id not Found";
    }

    if (product.code === products[productIndex].code) {
    } else {
      for (let i = 0; i < products.length; i++) {
        if (products[i].code.includes(product.code)) {
          return "Code is repited";
        }
      }
    }

    const productToUpdate = products[productIndex];
    productToUpdate.title = title;
    productToUpdate.description = description;
    productToUpdate.price = price;
    productToUpdate.thumbnail = thumbnail;
    productToUpdate.code = code;
    productToUpdate.stock = stock;

    products.splice(productIndex, 1, productToUpdate);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(products, null, "\t")
    );
  };

  deleteProduct = async (...productIds) => {
    const products = await this.getProducts();

    for (const productId of productIds) {
      const productIndex = products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        return "Id not Found"
      }
      
      products.splice(productIndex, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    }
  };
}

const hola = new ProductManager();
