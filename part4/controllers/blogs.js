require("dotenv").config()
const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const Comment = require("../models/comment")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const query = [
    {
      path: "comments",
      select: "content",
    },
    {
      path: "creator",
      select: "name",
    },
  ]
  const blogs = await Blog.find({ creator: { $ne: null } }).populate(query)
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id) //.populate('creator', {username: 1, name: 1, id: 1})
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const newBlog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {
    new: true,
  })
  response.json(updatedBlog)
})
blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)
  try {
    if (blogToDelete.creator.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      user.blogs = user.blogs.filter((b) => b.id !== blogToDelete.id)
      await user.save()
      response.status(204).end()
    }
  } catch (error) {
    response.status(401).json({ error: error })
  }
})

blogsRouter.get("/:id/comments", async (request, response) => {
  const comments = await Blog.findById(request.params.id).populate("comments", {
    content: 1,
    id: 1,
  })
  console.log(comments)
  if (comments) {
    response.json(comments)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body
  console.log("body", body)
  const blogID = request.params.id
  const blog = await Blog.findById(blogID)
  if (body.content === undefined) {
    return response.status(400).json({ error: "title missing" })
  }
  const comment = new Comment({
    content: body.content,
    blog: blogID,
  })
  console.log("backend comment", comment)
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment.id)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, `${process.env.SECRET}`)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" })
  }

  const user = request.user

  if (body.title === undefined) {
    return response.status(400).json({ error: "title missing" })
  }

  if (body.url === undefined) {
    return response.status(400).json({ error: "url missing" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    creator: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)

  await user.save()
  response.status(201).json(savedBlog)
})
// blogsRouter.delete("/", async (request, response) => {
//   await Blog.deleteMany({})
//   response.json("delete all")
// })
module.exports = blogsRouter
