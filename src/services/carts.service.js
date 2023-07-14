import CartManagerMongo from "../dao/mongo/manager/cartsManager.js"

export default class CartsService {
    constructor(dao){
        this.dao = dao
    }

    getCarts = () => {
        return this.dao.getCarts()
    }
}
