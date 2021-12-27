const mongoose = require('mongoose')
const Post = require('../models/postModel')
const asyncWrapper = require('../middleware/async')

const getAllPosts = asyncWrapper(async (req, res, next) => {
  const posts = await Post.find({})
  if (posts) {
    res.status(200).json(posts)
  }
})
const createPost = asyncWrapper(async (req, res, next) => {
  const allPosts = req.body
  const newPost = new Post({
    ...allPosts,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  })
  await newPost.save()
  res.status(201).json({ newPost })
})

const updatePost = asyncWrapper(async (req, res, next) => {
  const { id: _id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('no post with that id')
  const updatedPost = await Post.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  )
  res.status(201).json({ updatedPost })
})

const deletePost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('no post with that id')
  await Post.findByIdAndRemove(id)

  res.status(201).json({ msg: 'Post deleted successfully' })
})

const likePost = asyncWrapper(async (req, res) => {
  const { id } = req.params

  if (!req.userId)
    return res.json({ message: 'Sign in or register to like post' })
  const post = req.body
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('no post with that id')
  const likePost = await Post.findById(id)

  const index = likePost.likes.findIndex((id) => id === String(req.id))
  if (index === -1) {
    likePost.likes.push(req.userId)
  } else {
    likePost.likes.filter((id) => id !== String(req.userId))
  }
  const likedPost = await Post.findByIdAndUpdate(id, likePost, { new: true })
  res.status(201).json({
    likedPost,
    msg: 'Post liked',
  })
})
module.exports = { getAllPosts, createPost, updatePost, deletePost, likePost }
