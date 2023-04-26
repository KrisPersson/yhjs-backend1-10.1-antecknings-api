const Joi = require('joi')
const secret = 'kjhasdkjasf'
const jwt = require('jsonwebtoken')





const signupLoginBodySchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(3).max(30).required()
})

async function checkUserInput(request, response, next) {
    const { body } = request
    const { error } = signupLoginBodySchema.validate(body)

    if (error) {
        response.status(400).json({ success: false, error })
    } else {
        next()
    }
}

async function auth(request, response, next) {
    
    const token = request.headers.authorization.replace('Bearer ', '')
    try {
        const data = jwt.verify(token, secret)
        next()
    } catch (error) {
        response.status(498).json({ success: false, message: 'Invalid token' })
    }
}

module.exports = { checkUserInput, auth, secret }
