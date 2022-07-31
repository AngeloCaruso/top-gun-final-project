const response = require('../utils/response');

exports.logErrors = (err, req, res, next)=> {
    console.error(err.stack,err.message);
    next(err);
}

exports.errorHandler = (err, req, res, next)=> {
    response.error(res,err,500)
}

exports.boomErrorHandler = (err, req, res, next)=> {
    if (err.isBoom) {
        const { output } = err;
        response.error(res,output.payload.message,output.statusCode);
    }
    next(err);
}