import phonebookReducer from "./phonebookReducer";
import deepFreeze from 'deep-freeze'

describe('phonebookReducer', () => {
    test('return new state with action NEW_PERSON', () => {
        const state = []
        const action = {
            type: 'NEW_PERSON',
            payload: {
                name: 'Luong',
                number: '012-234235'
            }
        }
        deepFreeze(state)
        const newState = phonebookReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.payload)
    }) 

    test('returns new state with action TOGGLE_IMPORTAN')
})