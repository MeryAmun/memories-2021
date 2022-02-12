const mongoose = require('mongoose')
const Post = require('../models/postModel')
const asyncWrapper = require('../middleware/async')



const getAllPosts = asyncWrapper(async (req, res, next) => {

const {page} = req.query;
const LIMIT = 8;
const startIndex = (Number(page) - 1 ) * LIMIT; //get starting index of every page
const total = await Post.countDocuments({});

  const posts = await Post.find().sort({_id: -1 }).limit(LIMIT).skip(startIndex);
  res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)})

})

const getPost = asyncWrapper(async (req, res, next) => {

  const {id} = req.params;

    const post = await Post.findById(id)
    res.status(200).json(post)
  
  })

const getPostsBySearch = asyncWrapper(async (req, res, next) => {
  const {searchQuery, tags} = req.query
 const title = new RegExp(searchQuery, 'i');
 const posts = await Post.find({$or:[{title}, {tags:{$in: tags.split('.')}}]})
 res.status(200).json({data:posts})
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
module.exports = { getAllPosts,getPostsBySearch, createPost, updatePost, deletePost, likePost, getPost }
