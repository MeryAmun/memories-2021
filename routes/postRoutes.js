const express = require('express')
const router = express.Router()
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} = require('../controllers/postController.js')

router.get('/', getAllPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/likePost', likePost)

module.exports = router
