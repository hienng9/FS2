const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) { return {} }
    else {
   return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
    }   
}

const mostBlogs = (blogs) => {
    if (blogs.length == 0) {
        return {}
    } else {
        return(
        _.reduce(
            _.map(
              _.countBy(blogs, "author")
              , (value, key) =>( {author: key, blogs: value}))
            , (prev, current) => (prev.blogs > current.blogs) ? prev : current)
            )
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        return (blogs.map(value => ({author: value.author, likes: value.likes}))
        .reduce((prev, current) => (prev.likes > current.likes) ? prev : current))
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}