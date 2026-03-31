import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null, type: '' }), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notify(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    } catch (exception) {
      notify('error adding blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>username <input value={username} onChange={({ target }) => setUsername(target.value)} /></div>
          <div>password <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} /></div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App