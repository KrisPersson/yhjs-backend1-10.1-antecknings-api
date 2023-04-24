const { Router } = require('express')
const router = Router()

const { loginCtrl, signupCtrl } = require('../controllers/user.controller')
const { checkUserInput } = require('../middlewares/user.middleware')

router.post('/login', checkUserInput, loginCtrl)
router.post('/signup', checkUserInput, signupCtrl)

module.exports = { userRouter: router }
