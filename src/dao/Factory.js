import config from '../config/env.config.js'
import mongoose from 'mongoose'

export default class PersistenceFactory {
    static async getPersistence(){
        let usersDAO
        switch (config.persistence) {
            case 'FS':
                
                break;
        
            case 'MONGO':
                mongoose.connect(config.mongoUrl);
                const {default: MongoDAO} = await import('./mongo/manager/cartsManager.js')
                usersDAO = new MongoDAO()
                break;
        }
        return usersDAO
    }
}