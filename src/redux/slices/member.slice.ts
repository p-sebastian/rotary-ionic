import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TUser} from '../user.interface'

type State = {
  members: {[id: string]: TUser}
  keys: string[]
}
const INITIAL_STATE: State = {
  members: {},
  keys: [],
}

export const memberSlice = createSlice({
  name: 'member',
  initialState: INITIAL_STATE,
  reducers: {
    get: () => {},
    set: (_, {payload}: PayloadAction<State>) => payload,
  },
})

export const memberReducer = memberSlice.reducer
export const memberActions = memberSlice.actions
