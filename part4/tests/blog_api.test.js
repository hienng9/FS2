const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')


beforeEach(async () => {
    await User.deleteMany({})
    const users = helper.initialUsers.map(user => api.post('/api/users').send(user))
    // const promiseArray = users.map(user => user.save())
    await Promise.all(users)

    const user = await helper.oneUserInDb(helper.oneUser.username)
    await Blog.deleteMany({})
    helper.initialBlogs.map(blog =>  blog.creator = user[0].id)
    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray2 = blogs.map(blog => blog.save())
    await Promise.all(promiseArray2)

    // token

    // const loginedUser = await api.post('/api/login').send(helper.oneUser)
    // console.log("LOGIN USER", loginedUser)
    // const token = loginedUser.token
    // console.log("Tokent", token)
})

const getToken = async () => {
    const loginedUser = await api.post('/api/login').send(helper.oneUser)
    return JSON.parse(loginedUser.text).token
}

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
        // const user = {
        //     username: "hnguyen",
        //     password: "ngu123"
        // }
        // const returnedUser = await api.post('api/login').send(user).expect(200)
        // console.log("Returned User", returnedUser)
        
        const token = await getToken()
        const newBlog = {
            title: 'Go To Statement Considered Harmful 2 Edition',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 45
          }
        await api
            .post('/api/blogs')
            .set({
                'Authorization': `Bearer ${token}`
            })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAfter = await helper.blogsInDb()
    
        expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAfter.map(b => b.title)
        expect(titles).toContain('Go To Statement Considered Harmful 2 Edition')
    })
    
    test('a sent blog will have default 0 likes if likes is not submitted', async () => {
        const token = await getToken()

        const newBlog = {
            title: 'Go To Statement Considered Harmful 3 Edition',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          }
        await api
            .post('/api/blogs')
            .set({
                'Authorization': `Bearer ${token}` })
            .send(newBlog)
            .expect(201)
        
        const blogsAtEnd = await helper.blogsInDb()
        const filteredNewBlog = blogsAtEnd.filter(blog => blog.title === 'Go To Statement Considered Harmful 3 Edition' && blog.likes === 0)
        expect(filteredNewBlog).toHaveLength(1)
    })
    
    test('if url or title is missing, response status is 400 Bad Request', async () => {
        const token = await getToken()
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          }
        await api.post('/api/blogs')
          .send(newBlog)
          .set({
            'Authorization': `Bearer ${token}` })
          .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test("if a request does not contain a valid token, the request will fail with 401 unauthorized", async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful 3 Edition',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          }
        
          await api.post('/api/blogs')
          .send(newBlog)
          .expect(401)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    
})

describe('deleting a blog', () => {
    test('delete a blog using its id', async () =>{
        const blogsAtStart = await helper.blogsInDb()
        
        const blogToDelete =  blogsAtStart[0]
        const url = `/api/blogs/${blogToDelete.id}`

        const token = await getToken()
        await api
            .delete(url)
            .set({
                'Authorization': `Bearer ${token}` })
            .expect(204)
            

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
        const blog = await api.get(`/api/blogs/${blogToView.id}`).expect(200).expect('Content-Type', /application\/json/)
        expect(blog.body).toEqual(blogToView)
    
    })
})

describe('put request', () => {
    test('updated likes of a blog', async () => {
        const blogsAtStart = await helper.blogsDbNoPopulate()
        const blog = blogsAtStart[0]
        const blogToUpdate = {...blog, likes: 40}
        const saveblog = await api.put(`/api/blogs/${blog.id}`).send(blogToUpdate)
        const blogsAtEnd = await helper.blogsDbNoPopulate()
        const filteredBlog = blogsAtEnd.filter(b => b.id === blogToUpdate.id && b.likes == blogToUpdate.likes )
        expect(filteredBlog).toHaveLength(1)
    })
})

describe("test user database", () => {
    test ("users database exists a specific user when initialized", async () => {
        const usersAtStart = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
        expect(usersAtStart.body).toHaveLength(helper.initialUsers.length)
        const usernames = usersAtStart.body.map(u => u.username)
        expect(usernames).toContain(helper.oneUser.username)
    })

    test("username length less than 3 is not saved", async () => {
        const faultyUser = {
            username: 'hi',
            name: "Hien",
            password: "hoho"
        }
        await api.post('/api/users').send(faultyUser).expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
    test("password with length less than 3 is not saved in database", async () => {
        const faultyUser = {
            username: 'hien',
            name: "Hien",
            password: "hi"
        }
        await api.post('/api/users').send(faultyUser).expect(400)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
    test("A valid username and password will be saved in database", async () => {
        const rightUser = {
            username: 'hien',
            name: "Hien",
            password: "hi2345"
        }
        await api.post('/api/users').send(rightUser).expect(201).expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain("hien")
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})