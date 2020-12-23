import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TClub} from '../club.interface'

type State = {
  clubs: {[id: string]: TClub}
  keys: string[]
}
const INITIAL_STATE: State = {
  clubs: {},
  keys: [],
}

export const clubSlice = createSlice({
  name: 'club',
  initialState: INITIAL_STATE,
  reducers: {
    get: () => {},
    set: (_, {payload}: PayloadAction<State>) => payload,
  },
})

export const clubReducer = clubSlice.reducer
export const clubActions = clubSlice.actions
