exports.success = (res, data, message, status = 200) => {
    res.status(status).send({
        success: true,
        data: data,
        message: message
    })
}

exports.error = (res, message, status = 422) => {
    res.status(status).send({
        success: false,
        message: message
    })
}