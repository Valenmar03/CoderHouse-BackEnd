

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
    
    updateUser(email, user){
        return this.dao.update(email, user)
    }

    deleteUser(userId){
        return this.dao.delete(userId)
    }

}