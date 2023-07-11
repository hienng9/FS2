import { createSlice } from '@reduxjs/toolkit'

const initialState = 'ALL'

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterChange(state, action) {
      return action.payload
    }
  }

})
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer