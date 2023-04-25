
const Joi = require('joi')

const postNewNoteBodySchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    title: Joi.string().min(1).max(50).required(),
    text: Joi.string().min(1).max(200).required(),
})

const editNoteBodySchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    noteId: Joi.string().required(),
    title: Joi.string().min(1).max(50).required(),
    text: Joi.string().min(1).max(200).required(),
})

const deleteNoteBodySchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    noteId: Joi.string().required()
})

async function checkGetNotes(request, response, next) {
    const username = request.headers.username
    if (!username) {
        response.status(400).json({ success: false, message: '400 No username in header' })
    } else {
        next()
    }
}

async function checkPostNewNote(request, response, next) {
    const { body } = request
    const { error } = postNewNoteBodySchema.validate(body)

    if (error) {
        response.status(400).json({ success: false, error })
    } else {
        next()
    }
}

async function checkEditNote(request, response, next) {
    const { body } = request
    const { error } = editNoteBodySchema.validate(body)

    if (error) {
        response.status(400).json({ success: false, error })
    } else {
        next()
    }
}

async function checkDeleteNote(request, response, next) {
    const { body } = request
    const { error } = deleteNoteBodySchema.validate(body)

    if (error) {
        response.status(400).json({ success: false, error })
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

module.exports = { checkGetNotes, checkSearch, checkPostNewNote, checkEditNote, checkDeleteNote }
