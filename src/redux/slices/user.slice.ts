import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TUser} from '../user.interface'

type State = {
  user: TUser | null
}
const INITIAL_STATE: State = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    init: (state, {payload}: PayloadAction<TUser>) => {
      state.user = payload
    },
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
