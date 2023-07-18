

export default class ProductsRepository {
    constructor(dao){
        this.dao = dao
    }

    getAllProducts(){
        return this.dao.getAll()
    }
    
    getProducts(){
        return this.dao.get()
    }

    getProductById(prodId){
        return this.dao.getById(prodId)
    }

    addProducts(prod){
        return this.dao.add(prod)
    }

    updateProduct(prodId, product){
        return this.dao.update(prodId, product)
    }

    deleteProduct(prodId){
        return this.dao.delete(prodId)
    }
}