const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../controllers/postController.js')

router.get('/', getAllPosts)
router.post('/', authMiddleware, createPost)
router.patch('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.patch('/:id/likePost', authMiddleware, likePost)

module.exports = router
