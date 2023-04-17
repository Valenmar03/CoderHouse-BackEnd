import ProductManager from "./manager/ProductManager.js";

const productManager = new ProductManager();

const context = async () => {
  let testProduct = {
    title: "Toyota Hilux",
    description: "Toyota Hilux modelo 2020",
    price: 15000,
    thumbnail: "imagen.jpg",
    code: "127814",
    stock: 1,
  };

  await productManager.addProducts(testProduct)

  //await productManager.deleteProduct(6, 5, 4, 3);

  // await productManager.updateProduct(1, 'Ford F-150', 'Ford F-150 Raptor',  20000, 'imagen.jpg', '124h143g32', 1)

};

context();
