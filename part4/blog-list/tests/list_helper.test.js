const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  { _id: "1", title: "React patterns", author: "Michael Chan", url: "http://...", likes: 7 },
  { _id: "2", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://...", likes: 5 },
  { _id: "3", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://...", likes: 12 },
  { _id: "4", title: "First class tests", author: "Robert C. Martin", url: "http://...", likes: 10 },
  { _id: "5", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://...", likes: 0 },
  { _id: "6", title: "Type wars", author: "Robert C. Martin", url: "http://...", likes: 2 }
]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [blogs[1]]
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favorite blog', () => {
  test('finds the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('author with most total likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})