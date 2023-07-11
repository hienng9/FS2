import { useDispatch } from "react-redux";
import { createNew } from "../reducers/noteReducer";
const NewNote = () => {
    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createNew(content))
    }
    return (
        <form onSubmit={addNote}>
            <input name='note' />
            <button type='submit'>add</button>
        </form>
    )
}

export default NewNote