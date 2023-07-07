import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state).sort((a1, a2) => a1.votes - a2.votes)
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
                        <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
                    </div>
                </div>
          )}
        </div>
      )
}
export default AnecdoteList;