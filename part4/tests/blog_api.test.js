const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when the database is initialized', () => {
    test('get all blogs, should return the same number of blogs as the initials', async () => {
        const blogs = await api.get('/api/blogs')
        expect(blogs.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('get request returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('id is the name of the blog posts unique identifier property', async () => {
        const blogs = await api.get('/api/blogs')
        const blogsBody = blogs.body
        blogsBody.forEach((blog) => expect(blog.id).toBeDefined())
    })
})

describe('addition of new blogs', () => {
    test('a valid blog post is saved', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful 2 Edition',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 45
          }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAfter = await helper.blogsInDb()
    
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAfter.map(b => b.title)
        expect(titles).toContain('Go To Statement Considered Harmful 2 Edition')
    })
    
    test('a sent blog will have default 0 likes if likes is not submitted', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful 3 Edition',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          }
        await api
            .post('/api/blogs')
            .send(newBlog)
        
        const blogsAtEnd = await helper.blogsInDb()
        const filteredNewBlog = blogsAtEnd.filter(blog => blog.title === 'Go To Statement Considered Harmful 3 Edition' && blog.likes === 0)
        expect(filteredNewBlog).toHaveLength(1)
    })
    
    test('if url or title is missing, response status is 400 Bad Request', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          }
        await api.post('/api/blogs')
          .send(newBlog)
          .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    
})

describe('deleting a blog', () => {
    test('delete a blog using its id', async () =>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete =  blogsAtStart[0]
        const url = `/api/blogs/${blogToDelete.id}`
        await api.delete(url).expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('get request', () => {
    test('get a specific blog', async () =>{
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]
        console.log('blog to view', blogToView)
        const blog = await api.get(`/api/blogs/${blogToView.id}`).expect(200).expect('Content-Type', /application\/json/)
        console.log(blog.body)
        expect(blog.body).toEqual(blogToView)
    
    })
})

describe('put request', () => {
    test('updated likes of a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]
        const blogToUpdate = {...blog, likes: 40}
        const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
        const blogsAtEnd = await helper.blogsInDb()
        const filteredBlog = blogsAtEnd.filter(b => b.id === blogToUpdate.id && b.likes == blogToUpdate.likes )
        expect(filteredBlog).toHaveLength(1)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})