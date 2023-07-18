require("dotenv").config()
const commentsRouter = require("express").Router()
const Comment = require("../models/comment")
const Blog = require("../models/blog")

commentsRouter.get("/", async (request, response) => {
  const comments = await Blog.find({
    id: request.params.id,
    comments: { $ne: null },
  })
  console.log("comments", comments)
  response.json(comments)
})

commentsRouter.post("/", async (request, response) => {
  const body = request.body
  const blogID = request.params.id
  const blog = await Blog.findById(blogID)
  if (body.content === undefined) {
    return response.status(400).json({ error: "title missing" })
  }
  const comment = new Comment({
    content: body.content,
    blog: blogID,
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment.id)
  await blog.save()
  response.status(201).json(savedComment)
})

module.exports = commentsRouter
