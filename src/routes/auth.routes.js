const express = require('express')
const authController = require('../controllers/auth.controller')
const validationMiddleware = require('../middleware/validation.middleware')

const router = express.Router()

router.post('/register', validationMiddleware.registerValidation, authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/logout', authController.logoutUser)

module.exports = router