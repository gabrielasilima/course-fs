import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Full Stack Developer',
    url: 'http://testurl.com',
    likes: 10,
    user: { name: 'Test User' }
  }

  // 5.13: Teste de renderização inicial
  test('renders title and author, but not url or likes by default', () => {
    render(<Blog blog={blog} />)

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

    // Verificamos se os detalhes NÃO estão visíveis inicialmente
    const url = screen.queryByText(blog.url)
    const likes = screen.queryByText('likes', { exact: false })
    
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  // 5.14: Teste de clique para mostrar detalhes
  test('blog url and likes are shown when the view button is clicked', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText(blog.url)
    const likes = screen.queryByText('likes', { exact: false })

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
})