
export default class CartRepository{
    constructor(dao){
        this.dao = dao
    }

    getAllCarts = () => {
        console.log(this.dao)
        return this.dao.getCarts()
    }
}

const hola = new CartRepository()

hola.getAllCarts()
