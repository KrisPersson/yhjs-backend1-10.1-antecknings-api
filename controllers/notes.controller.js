const { findUser } = require('../models/user.model')
const { getNotes, insertNewNote, editNote, deleteNote, searchNote } = require('../models/notes.model')
const { getStatusCode } = require('../utils')

async function getNotesCtrl(request, response) {
    try {
        const userInDb = await findUser(request.headers.username)
        const notesFromDb = await getNotes(userInDb.id)
        const shavedNotes = notesFromDb.map(note => {
            return { id: note.id, title: note.title, text: note.text, createdAt: note.createdAt, modifiedAt: note.modifiedAt }
        })
        response.json({ success: true, notes: shavedNotes })
    } catch (error) {
        response.status(getStatusCode(error.message))
        .json({ success: false, message: error.message })
    }
}

async function postNotesCtrl(request, response) {
    try {
        const userInDb = await findUser(request.body.username)
        const insertedNote = await insertNewNote(request.body, userInDb.id)
        const newNote = { 
            noteId: insertedNote.id, 
            title: insertedNote.title, 
            text: insertedNote.text,
            createdAt: insertedNote.createdAt 
        }
        response.json({ success: true, newNote })
    } catch (error) {
        response.status(getStatusCode(error.message))
        .json({ success: false, message: error.message })
    }
}

async function editNotesCtrl(request, response) {
    const body = request.body
    try {
        await editNote(body)
        response.json({ success: true, message: 'Note updated successfully!' })
    } catch (error) {
        response.status(getStatusCode(error.message))
        .json({ success: false, message: error.message })
    }
}

async function deleteNotesCtrl(request, response) {
    const body = request.body
    try {
        await findUser(body.username)
        await deleteNote(body)
        response.json({ success: true, message: 'Note successfully deleted!' })
    } catch (error) {
        response.status(getStatusCode(error.message))
        .json({ success: false, message: error.message })
    }
}

async function searchNotesCtrl(request, response) {
    const username = request.headers.username
    const searchQuery = request.headers.searchquery
    
    try {
        const notes = await searchNote({ username, searchQuery })
        
        response.json({ success: true, notes })
    } catch (error) {
        response.status(getStatusCode(error.message))
        .json({ success: false, message: error.message })
    }
}

module.exports = { getNotesCtrl, postNotesCtrl, editNotesCtrl, deleteNotesCtrl, searchNotesCtrl }
