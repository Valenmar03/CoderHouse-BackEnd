import LoggerService from "../services/logger.service.js"

const logger = new LoggerService('dev')

const attachLogger = (req, res, next) => {
    req.logger = logger.logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

export default attachLogger