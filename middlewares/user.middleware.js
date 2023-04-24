const Joi = require('joi')

const signupBodySchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(3).max(30).required()
})

async function checkUserInput(request, response, next) {
    const { body } = request
    const { error } = signupBodySchema.validate(body)

    if (error) {
        response.status(400).json({ success: false, error })
    }
    next()
}



module.exports = { checkUserInput }
