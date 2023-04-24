const { insertNewUser, login, findUser } = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = 'kjhasdkjasf'

async function signupCtrl(request, response) {
    const body = request.body
    try {
        const insertedNewUser = await insertNewUser(body)
        response.json({ success: true, message: 'New user signed up successfully!', username: insertedNewUser.username })
    } catch (error) {
        let status = 500
        if (error.message === 'Username already exists in database') {
            status = 200
        } 
        response.status(status).json({ success: false, message: error.message })
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
        let status = 500
        if (
            error.message === 'Username does not exist in database' ||
            error.message === 'Wrong password'
        ) {
            status = 200
        } 
        response.status(status).json({ success: false, message: error.message })
    }

}

module.exports = { signupCtrl, loginCtrl }
