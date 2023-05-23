require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('creator', {username: 1, name: 1, id: 1})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})
  
blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
  response.json(updatedBlog)
  
})
blogsRouter.delete('/:id', async(request, response) => {
  const decodedToken = jwt.verify(request.token, `${process.env.SECRET}`)
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  if (blogToDelete.creator.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(b => b.id !== blogToDelete.id)
    response.status(204).end()
  } else {
    response.status(401).json({error: "Only creator can delete"})
  }
  // await Blog.findByIdAndRemove(request.params.id)

  // response.status(204).end()

})

// const getTokenFrom = (request) => {
//   const authorization = request.get('Authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   } else {
//   return null
//   }
// }

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, `${process.env.SECRET}`)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'invalid token'})
    }

    const user = request.user

    if (body.title === undefined) {
      return response.status(400).json({error: "title missing"})
    }

    if (body.url === undefined) {
      return response.status(400).json({error: 'url missing'})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      creator: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    
    await user.save()
    response.status(201).json(savedBlog)
  })

module.exports = blogsRouter