const { insertNewUser, login, findUser } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { secret } = require('../middlewares/user.middleware')
const { getStatusCode } = require('../utils')

async function signupCtrl(request, response) {
    const body = request.body
    try {
        const insertedNewUser = await insertNewUser(body)
        response.json({ success: true, message: 'New user signed up successfully!', username: insertedNewUser.username })
    } catch (error) {
        response.status(getStatusCode(error.message)).json({ success: false, message: error.message })
    }
}

async function loginCtrl(request, response) {
    const body = request.body
    try {
        await login(body)
        const userInDb = await findUser(body.username)
        const token = jwt.sign({ id: userInDb.id }, secret, {
            expiresIn: 6000
        })

        response.json({ 
            success: true, 
            message: "Successfully logged in!", 
            username: userInDb.username, 
            token: token 
        })

    } catch (error) {
        response.status(getStatusCode(error.message)).json({ success: false, message: error.message })
    }
}

async function verifyTokenCtrl(request, response) {
    const token = request.headers.authorization.replace('Bearer ', '')
    try {
        const data = jwt.verify(token, secret)
        response.json({ success: true, message: 'Token valid' })
    } catch (error) {
        response.status(498).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { signupCtrl, loginCtrl, verifyTokenCtrl }
