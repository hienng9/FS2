import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'



const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter === '') {
            return anecdotes
        }
        return anecdotes.filter(anecdote => {
            return anecdote.content.includes(filter)
            })
        
        }).slice().sort((a1, a2) => a1.votes - a2.votes)
    const dispatch = useDispatch()

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
                            dispatch(notify(`you voted ${anecdote.content}`))
                            }}>vote</button>
                    </div>
                </div>
          )}
        </div>
      )
}
export default AnecdoteList;