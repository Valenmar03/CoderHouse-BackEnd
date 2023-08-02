

export default (error, req, res, next) => {
    console.log(error)
    res.status(error.status).send({status: 'error', error: error.name})
}