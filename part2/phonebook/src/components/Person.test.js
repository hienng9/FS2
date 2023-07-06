import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Name from './Persons'
import Togglable from  './Togglable'
// import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const person = {
        name: 'Hien', 
        number: "040-1234567",
        id: '1'
    }

    render(<Name person={person} deleteClick={() => console.log('delete')}/>)

    const div = container.querySelector('.person')
    // const element = screen.getByText('Hien')
    
    expect(div).toHaveTextContent('Hien')
})

describe('<Toggable />', () => {
    let container

    beforeEach(() => {
        container = render(
            <Togglable buttonLabel='show...'>
                <div className='testDv'>toggable content</div>
            </Togglable>
        ).container
    })
    test('render its children', async () => {
        await screen.findAllByAltText('toggable content')
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.toggableContent')
        expect(div).toHaveStyle('display: none')
    })

})

test('clicking the button calls event handler once', async () => {
    
    const user = userEvent.setup()
    
    const person = {
        name: 'Hien', 
        number: "040-1234567",
        id: '1'
    }

    const mockHandler = jest.fn()

    render(
        <Name person={person} deleteClick={mockHandler} />
    )
    
    const button = screen.getByText('delete')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})