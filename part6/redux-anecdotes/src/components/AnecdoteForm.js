import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const notificationDispatch = useNotificationDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNewAnecdote(anecdote))
        notificationDispatch({ type:"CREATE", payload: `You created ${anecdote}`})
        
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                <input 
                    name='anecdote'/>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm;