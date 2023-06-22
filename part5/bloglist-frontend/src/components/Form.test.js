import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogCreate from './CreateBlog'
import userEvent from '@testing-library/user-event'

describe('Testing Form', () => {
  test('<BlogCreate /> calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
  
    render(<BlogCreate handleCreateBlogF={createBlog} />)
  
    const title = screen.getByPlaceholderText('write blog title here')
    const author = screen.getByPlaceholderText('write blog author here')
    const url = screen.getByPlaceholderText('write url here')
    const createButton = screen.getByText('create')
  
    await user.type(title, 'testing a form...')
    await user.type(author, 'test')
    await user.type(url, 'test.com')
    await user.click(createButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  })
})
