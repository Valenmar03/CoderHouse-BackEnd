

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createUser(user) {
        return this.dao.create(user)
    }

    findUser(email, pass){
        return this.dao.find(email, pass)
    }

    findUserBy(param){
        return this.dao.findBy(param)
    }

    deleteUser(userId){
        return this.dao.delete(userId)
    }

}