class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProducts({ title, description, thumbnail, price, code, stock }) {
    if (!title || !description || !thumbnail || !price || !code || !stock) {
      console.log("Falta ingresar datos");
      return null;
    }

    const product = {
      title,
      description,
      thumbnail,
      price,
      code,
      stock,
    };

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code.includes(code)) {
        throw new Error("Code is repited");
      }
    }
    if (this.products.length === 0) {
      product.id = 1;
    } else {
      const lastProduct = this.products[this.products.length - 1];
      product.id = lastProduct.id + 1;
    }

    this.products.push(product);
  }

  getProductById(productId) {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );

   

    if (productIndex === -1) {
      throw new Error("Not Found");
    } else {
      const product = this.products[productIndex];
      console.log(product);
    }
  }
}

const productManager = new ProductManager();

const product = {
  title: "Lenovo Ideapad flex 5",
  description: "Notebook Lenovo 2-in-1",
  thumbnail: "url.jpg",
  price: 900,
  code: "hola",
  stock: 10,
};

const product2 = {
  title: "Play Station 5",
  description: "Sony Play Station 5 God Of War version",
  thumbnail: "url.jpg",
  price: 1000,
  code: "chau",
  stock: 5,
};

const product3 = {
  title: "Play Station 4",
  description: "Sony Play Station 4 God Of War version",
  thumbnail: "url.jpg",
  price: 800,
  code: "Buen Dia",
  stock: 5,
};

productManager.addProducts(product);
productManager.addProducts(product2);
//console.log(productManager.getProducts());
productManager.addProducts(product3)

console.log('METODO getProducts')
console.log(productManager.getProducts());

console.log(`
METODO getProductById(3)`)
productManager.getProductById(3);
