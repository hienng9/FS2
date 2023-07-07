const phonebookReducer = (state = [], action) => {
    if (action.type === 'NEW_PERSON') {
      return state.concat(action.payload)
    }
    return state
  }

export default phonebookReducer;