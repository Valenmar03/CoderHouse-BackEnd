

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

    existsUser(email){
        return this.dao.exists(email)
    }

    deleteUser(userId){
        return this.dao.delete(userId)
    }

}