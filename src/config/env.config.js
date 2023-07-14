import dotenv from 'dotenv'

dotenv.config()

export default {
    port: process.env.PORT || 8080,
    mongoUrl: process.env.MONGO_URL,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASS
}