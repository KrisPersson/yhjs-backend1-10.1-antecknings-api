const { Router } = require('express')
const router = Router()

const { getNotesCtrl, postNotesCtrl, editNotesCtrl, deleteNotesCtrl, searchNotesCtrl } = require('../controllers/notes.controller')

router.get('/', getNotesCtrl)
router.post('/', postNotesCtrl)
router.put('/', editNotesCtrl)
router.delete('/', deleteNotesCtrl)

router.get('/search', searchNotesCtrl)



module.exports = { notesRouter: router }
