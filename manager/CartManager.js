import fs from "fs";

export default class CartManager {
  constructor() {
    this.path = "../Desafio/files/carts.json";
  }

  createCart = async () => {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, JSON.stringify([], null, "\t"));
    }

    const cart = {
      id: null,
      products: [],
    };
    const data = await fs.promises.readFile(this.path, "utf-8");
    const carts = JSON.parse(data);
    if (carts.length === 0) {
      cart.id = 1;
    } else {
      const lastCart = carts[carts.length - 1];
      cart.id = lastCart.id + 1;
    }

    carts.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
  };

  getCarts = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const carts = JSON.parse(data);
      return carts;
    }
    return [];
  };

  getCartById = async (cartId) => {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(
        (cart) => cart.id === cartId 
    )

    if(cartIndex === -1){
        console.log('Id no encontrado')
        return null
    }

    const cart = carts[cartIndex]
    return cart

  };
}

const cartManager = new CartManager()
