import { productsService } from "../services/repositories.js";

const getProducts = async (req, res) => {
    const category = req.query.category
    const products = await productsService.getProducts();
      res.send({ status: "success", payload: products }); 
}

const getProductById = async (req, res) => {
    const { pid } = req.params;
    const product = await productsService.getProductById({ _id: pid });
    if (!product)
      return res
        .status(404)
        .send({ status: "error", error: "Product not found" });
  
    res.send({ status: "success", payload: product });
}

const addProduct = async (req, res) => {
    const product = req.body;
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.category ||
      !product.stock
    )
      return res
        .status(400)
        .res.send({ status: "error", error: "Incomplete values" });
  
    try {
      await productsService.addProducts(product);
      res.send({ status: "success", payload: product})
    } catch (error) {
      res.status(400).send({ message: "error", error: error });
    }
}

const updateProduct = async (req, res) => {
    const product = req.body;
    const { pid } = req.params;
    const productToUpdate = await productsService.updateProduct(pid, product);
    if (!productToUpdate)
      return res
        .status(404)
        .send({ message: "error", error: "Product not Found" });
  
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.category ||
      !product.stock
    )
      return res
        .status(400)
        .send({ message: "error", error: "Incomplete values" });
  
    res.send({ status: "success", payload: productToUpdate });
}

const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    const product = await productsService.deleteProduct(pid);
    if (!product)
      return res
        .status(404)
        .send({ status: "error", error: "Product not found" });
  
    res.send({ status: "success", message: "Product deleted successfully" });
}



export default {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
}