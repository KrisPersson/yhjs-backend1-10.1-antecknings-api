const { db } = require('../database')
const { v4: uuidv4 } = require('uuid');
const { findUser } = require('./user.model');


async function getNotes(userId) {
    return await db.notes.find({ userId })
}

async function insertNewNote(input, userId) {

    const newNote = {
        id: uuidv4(),
        userId: userId,
        title: input.title,
        text: input.text,
        createdAt: new Date(),
        modifiedAt: ''
    }

    return await db.notes.insert(newNote)
}

async function editNote(input) {
    const noteInDb = await db.notes.findOne({ id: input.noteId })
    if (!noteInDb) {
        throw new Error('404 Note with this ID not found')
    }
    const updateSetter = {
        $set: {
            title: input.title ? input.title : noteInDb.title,
            text: input.text ? input.text : noteInDb.text,
            modifiedAt: new Date()
        }
    }
    const result = await db.notes.update({ id: input.noteId }, updateSetter)
    if (result == 0) {
        throw new Error('500 Edit failed - server error')
    }
    return
}

async function deleteNote(input) {
    const itemIdExists = await db.notes.findOne({ id: input.noteId })
    if (!itemIdExists) {
        throw new Error('404 Item with this ID not found')
    }
    const result = await db.notes.remove({ id: input.noteId })
    if (result == 0) {
        throw new Error('500 Delete failed - server error')
    }
    return
}

async function searchNote(input) {
    const userInDb = await findUser(input.username)
    const allUsersNotes = await db.notes.find({ userId: userInDb.id })
    const query = input.searchQuery.toLowerCase()

    return allUsersNotes.filter((note) => note.title.toLowerCase().includes(query))
}

module.exports = { getNotes, insertNewNote, editNote, deleteNote, searchNote }
