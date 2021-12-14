const express = require('express')
const router = express.Router()
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController.js')

router.get('/', getAllPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.patch('/:id', deletePost)

module.exports = router
