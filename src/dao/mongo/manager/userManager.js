import userModel from "../models/users.model.js";

export default class UserManagerMongo {

    create(user){
        return userModel.create(user)
    }

    find(email, pass){
        return userModel.findOne(email, pass).lean()
    }

    findBy(param){
        return userModel.findOne(param).lean()
    }

    delete(userId) {
        return userModel.findByIdAndDelete(userId).lean()
    }
}