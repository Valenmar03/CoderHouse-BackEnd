import ProductManager from "./manager/ProductManager.js";

const productManager = new ProductManager();

const context = async () => {
  let testProduct = {
    title: "Chevrolet Corsa",
    description: "Chevrolet Corsa modelo 2005",
    price: 3000,
    thumbnail: "imagen.jpg",
    code: "27437814",
    stock: 2,
  };

  await productManager.addProducts(testProduct)

  //await productManager.getProducts();

  //const id1 = await productManager.getProductById(2)
  //console.log(id1)

  //await productManager.deleteProduct(5);

  console.log(await productManager.getProducts())

};

context();
