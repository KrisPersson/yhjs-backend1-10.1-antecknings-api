const { Router } = require('express')
const router = Router()

const { loginCtrl, signupCtrl, verifyTokenCtrl } = require('../controllers/user.controller')
const { checkUserInput } = require('../middlewares/user.middleware')

router.post('/login', checkUserInput, loginCtrl)
router.post('/signup', checkUserInput, signupCtrl)
router.get('/verify', verifyTokenCtrl)

module.exports = { userRouter: router }
