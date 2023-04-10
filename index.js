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

  //await productManager.addProducts(testProduct)

  //await productManager.getProducts();

  //const id1 = await productManager.getProductById(2)
  //console.log(id1)

  //await productManager.deleteProduct(6, 5, 4, 3);

  await productManager.updateProduct(2, 'Ford F-150', 'Ford F-150 Raptor',  20000, 'imagen.jpg', '124h143g32', 1)

  //console.log(await productManager.getProducts())

};

context();
