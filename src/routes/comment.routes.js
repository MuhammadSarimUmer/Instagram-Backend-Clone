const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const commentController = require('../controllers/comment.controller')

const router = express.Router()

router.post('/create-comment/:id', authMiddleware, commentController.createComment)
router.get('/comments/:id', authMiddleware, commentController.getAllComments)
router.get('/comment/:id', authMiddleware, commentController.getCommentById)
router.delete('/comment/:id', authMiddleware, commentController.deleteComment)
router.patch('/comment/:id', authMiddleware, commentController.updateComment)






module.exports = router