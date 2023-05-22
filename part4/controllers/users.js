const bcrypt = require('bcrypt')

const userRoute = require('express').Router()
const User = require('../models/user')

userRoute.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users)
})

userRoute.post('/', async (request, response) => {
    const {username, name, password} = request.body
    if (password.length < 3) {
        return response.status(400).json({ error: "Password must be at least 3 characters"})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User ({
        username: username,
        name: name,
        passwordHash: passwordHash
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
    
})

module.exports = userRoute



