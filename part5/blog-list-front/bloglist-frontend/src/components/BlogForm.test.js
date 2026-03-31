import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // Usamos placeholder ou labels para encontrar os inputs
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Testing React Forms')
  await user.type(authorInput, 'JS Master')
  await user.type(urlInput, 'http://react-testing.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing React Forms')
  expect(createBlog.mock.calls[0][0].author).toBe('JS Master')
  expect(createBlog.mock.calls[0][0].url).toBe('http://react-testing.com')
})