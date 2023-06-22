import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog list tests', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Hien Nguyen',
        url: 'yahoo.com',
        creator: '12345'
      }
    let container
    beforeEach(() => {
        container = render(<Blog
            blog={blog}
            handleLikes={() => console.log('handle likes')}
            deleteFunc = {() => console.log('delete')}
            userID = '12345'
        />).container
    })
    test('renders content', () => {
        // console.log('CONTAINER', container)
        const element = container.querySelector('.details')
        // console.log('ELEMENT', element)
        expect(element).toHaveTextContent('Component testing is done with react-testing-library by Hien Nguyen' )
        
        const info = container.querySelector('.info')
        expect(info).toHaveStyle('display: none')
        
    })
      
    test('blogs URL and likes are shown when button is clicked', async () =>{

        const button = container.querySelector('.button')
        // console.log('button', button)
        const user = userEvent.setup()
        await user.click(button)
    
        const div = container.querySelector('.details')
        expect(div).not.toHaveStyle('display: none')
    
        const blogUrl = container.querySelector('.blogUrl')
        expect(blogUrl).toHaveTextContent('yahoo.com')
    
        const element = screen.queryByText('likes')
        expect(element).not.toBeNull()

        expect(screen.getByText('hide')).toBeInTheDocument()
    
    })
})

describe('Testing like button', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Hien Nguyen',
        url: 'yahoo.com',
        creator: '12345'
      }

    const mockHandler = jest.fn()

    let container
    beforeEach(() => {
        container = render(<Blog
            blog={blog}
            handleLikes={mockHandler}
            deleteFunc = {() => console.log('delete')}
            userID = '12345'
        />).container
    })
    
    test('event handler is called twice when like button is clicked twice', async ()=>{
        const user = userEvent.setup()
        const button = container.querySelector('.like')
        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
