import userModel from "../models/users.js";

export default class UserManagerMongo {

    createUser(user){
        return userModel.create(user)
    }

    deleteUser(userId) {
        return userModel.findByIdAndDelete(userId).lean()
    }
}