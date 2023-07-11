import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { useNotificationDispatch } from '../NotificationContext'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const notificationDispatch = useNotificationDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        
        }).slice().sort((a1, a2) => a1.votes - a2.votes)
    

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            dispatch(addVote(anecdote.id))
                            notificationDispatch({type: "CREATE", payload: `you voted ${anecdote.content}`})
                            }}>vote</button>
                    </div>
                </div>
          )}
        </div>
      )
}
export default AnecdoteList;