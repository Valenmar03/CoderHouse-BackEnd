import ProductManager from "./manager/ProductManager.js";

const productManager = new ProductManager()

const context = async() => {
 
    let testProduct ={
        title: 'PC Gamer',
        description: 'TV LG 40"',
        price: 1500,
        thumbnail: 'imagen.jpg',
        code: 't463',
        stock: 15
    }

    await productManager.addProducts(testProduct)

    const newProducts = await productManager.getProducts()
    console.log(newProducts)
}

context()