const { Router } = require('express')
const router = Router()

const { getNotesCtrl, postNotesCtrl, editNotesCtrl, deleteNotesCtrl, searchNotesCtrl } = require('../controllers/notes.controller')
const { checkGetNotes, checkSearch, checkPostNewNote, checkEditNote, checkDeleteNote } = require('../middlewares/notes.middleware')
const { auth } = require('../middlewares/user.middleware')

router.get('/', checkGetNotes, auth, getNotesCtrl)
router.post('/', checkPostNewNote, auth, postNotesCtrl)
router.put('/', checkEditNote, auth, editNotesCtrl)
router.delete('/', checkDeleteNote, auth, deleteNotesCtrl)

router.get('/search', checkSearch, auth, searchNotesCtrl)

module.exports = { notesRouter: router }
