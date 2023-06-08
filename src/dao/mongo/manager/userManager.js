import userModel from "../models/users.js";

export default class UserManagerMongo {

    createUser(user){
        return userModel.create(user)
    }

    findUser(email, pass){
        return userModel.findOne(email, pass)
    }

    deleteUser(userId) {
        return userModel.findByIdAndDelete(userId).lean()
    }
}