
export default (error, req, res, next) => {
    req.logger.error(`${error.name}: ${error.message}. Status: ${error.status}`)
    res.status(error.status).send({status: 'error', error: error.name})
}