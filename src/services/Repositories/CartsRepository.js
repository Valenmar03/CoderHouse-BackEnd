
export default class CartRepository {
    constructor(dao){
        this.dao = dao;
    }

    createCart(params){
        return this.dao.create(params);
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
    
    deleteCart(cartId){
        return this.dao.delete(cartId)
    }

    deleteProductInCart(cartId, prodId){
        return this.dao.deleteProduct(cartId, prodId)
    }
}