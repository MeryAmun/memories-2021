const Post = require('../models/postModel')
const asyncWrapper = require('../middleware/async')

const getAllPosts = asyncWrapper(async (req, res, next) => {
  const posts = await Post.find({})
  if (posts) {
    res.status(200).json({ posts })
  }
})
const createPost = asyncWrapper(async (req, res, next) => {
  const post = await Post.create(req.body)
  res.status(201).json({ post })
})
module.exports = { getAllPosts, createPost }
