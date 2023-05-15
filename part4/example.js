const _ = require('lodash')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]


// let fav = blogs1.reduce((c, current) => {
//   if (c.length == 0) {
//     c.push({
//       author: current.author,
//       blogs: 1
//     })}
//   else {
//     c.map(value => {
//       console.log(value)
//       return (value.author == current.author) ? value.blogs + 1 : value.blogs})
//     // const currentAuthors = c.map(value => value.author)
//     // if (currentAuthors.includes(current.author)) {
//     //   c.filter(value => value.author === current.author).map(value => value.blogs + 1)
//     //   // currentValue[0].blogs = currentValue[0].blogs + 1 
//     // } 
//     // else {
//     //   c.push({
//     //     author: current.author,
//     //     blogs: 1
//     //   })
//     // }
//   }
//   return c
// }, []).reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current)
let fav = blogs.map(value => ({author: value.author, likes: value.likes}))
.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
console.log(fav)