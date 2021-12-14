const Post = require('../models/postModel')
const asyncWrapper = require('../middleware/async')

const getAllPosts = asyncWrapper(async (req, res, next) => {
  const posts = await Post.find({})
  if (posts) {
    res.status(200).json(posts)
  }
})
const createPost = asyncWrapper(async (req, res, next) => {
  const post = await Post.create(req.body)
  res.status(201).json({ post })
})

const updatePost = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('no post with that id')
  const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true })
  res.status(201).json({ updatedPost })
})
module.exports = { getAllPosts, createPost, updatePost }
