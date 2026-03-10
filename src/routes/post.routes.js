const express = require('express')
const postController = require('../controllers/posts.controller')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router()

router.post('/create-post', authMiddleware, upload.single('image'), postController.createPost)

router.post('/like-post/:id', authMiddleware, postController.toggleLikePost)

router.get('/posts', authMiddleware, postController.getAllPosts)

router.get('/post/:id', authMiddleware, postController.getPostById)

router.get('/posts/:id', authMiddleware, postController.getPostByUser)

router.delete('/post/:id', authMiddleware, postController.deletePost)

router.patch('/post/:id', authMiddleware, postController.updatePost)

module.exports = router