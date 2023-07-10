import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterChange(state, action) {
      console.log('action', action)
      return action.payload
    }
  }

})
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload
//         default:
//             return state
//     }

// }

// export const filterChange = filter => {
//     return {
//         type: 'SET_FILTER',
//         payload: filter
//     }
// }

// export default filterReducer