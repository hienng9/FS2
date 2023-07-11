import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, voteAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'
const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation(
    voteAnecdote, {
      onSuccess: (response) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], anecdotes.map(anec => anec.id !== response.id ? anec : response))
        notificationDispatch({type: 'CREATE', payload: `you voted ${response.content}`})
      }
    }
  )
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery(
    ['anecdotes'],
    getAll,
    { retry: 1 }
  )

  if (result.isLoading) {
    return <div>loading</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
