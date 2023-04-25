function getStatusCode(errorMessage) {
    const statusCode = errorMessage.split(' ')[0]
    const numifiedCode = Number(statusCode)

    return !numifiedCode ? 500 : numifiedCode
}


module.exports = { getStatusCode }
