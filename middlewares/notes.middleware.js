
const Joi = require('joi')

const signupBodySchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(3).max(30).required()
})

async function checkGetNotes(request, response, next) {
    const username = request.headers.username
    if (!username) {
        response.status(400).json({ success: false, message: '400 No username in header' })
    } else {
        next()
    }
}

async function checkSearch(request, response, next) {
    const query = request.headers.searchquery
    const username = request.headers.username
    if (!username) {
        response.status(400).json({ success: false, message: '400 No username in header' })
    } else if (!query) {
        response.status(400).json({ success: false, message: '400 No search query in header' })
    } else {
        next()
    }
}

module.exports = { checkGetNotes, checkSearch }
