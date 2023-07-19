
export default class CartRepository {
    constructor(dao){
        this.dao = dao;
    }

    createCart(params){
        return this.dao.create(params);
    }

    updateCart(cartId, userId) {
        return this.dao.update(cartId, userId)
    }

    getCarts(params){
        return this.dao.get(params);
    }
    
    getCartById(cartId){
        return this.dao.getById(cartId);
    }

    addProductToCart(cartId, prodId, quantity){
        return this.dao.addProduct(cartId, prodId, quantity)
    }

    updateProductQty(cartId, prodId, quantity){
        return this.dao.updateProduct(cartId, prodId, quantity)
    }

    deleteAllProducts(cartId){
        return this.dao.deleteProducts(cartId)
    }
    
    deleteCart(cartId){
        return this.dao.delete(cartId)
    }

    deleteProductInCart(cartId, prodId){
        return this.dao.deleteProduct(cartId, prodId)
    }
}