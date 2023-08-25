import userModel from "../models/users.model.js";

export default class UserManagerMongo {

    create(user){
        return userModel.create(user)
    }

    get(){
        return userModel.find().lean()
    }

    find(email, pass){
        return userModel.findOne(email, pass).lean()
    }

    findBy(param){
        return userModel.findOne(param).lean()
    }

    update(id, newUser){
        return userModel.findByIdAndUpdate(id, { $set: newUser })
    }

    delete(userId) {
        return userModel.findByIdAndDelete(userId).lean()
    }
}