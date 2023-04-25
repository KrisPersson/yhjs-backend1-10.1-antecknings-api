const { Router } = require('express')
const router = Router()

const { getNotesCtrl, postNotesCtrl, editNotesCtrl, deleteNotesCtrl, searchNotesCtrl } = require('../controllers/notes.controller')
const { checkGetNotes, checkSearch } = require('../middlewares/notes.middleware')
const { auth } = require('../middlewares/user.middleware')


router.get('/', checkGetNotes, auth, getNotesCtrl)
router.post('/', auth, postNotesCtrl)
router.put('/', auth, editNotesCtrl)
router.delete('/', auth, deleteNotesCtrl)

router.get('/search', checkSearch, auth, searchNotesCtrl)



module.exports = { notesRouter: router }
