import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TFilterSelected} from '../../pages/Members/MemberFilter.hooks'
import {TUser} from '../user.interface'

type State = {
  members: {[id: string]: TUser}
  keys: string[]
  filtered: string[]
  selected: {[id: string]: boolean}
  didFilter: boolean
}
const INITIAL_STATE: State = {
  members: {},
  keys: [],
  filtered: [],
  selected: {},
  didFilter: false,
}

export const memberSlice = createSlice({
  name: 'member',
  initialState: INITIAL_STATE,
  reducers: {
    get: () => {},
    set: (state, {payload}: PayloadAction<Pick<State, 'keys' | 'members'>>) => {
      return {...state, ...payload}
    },
    fiterBy: (_, {}: PayloadAction<Partial<TFilterSelected>>) => {},
    filtered: (state, {payload}: PayloadAction<string[]>) => {
      state.filtered = payload
      state.didFilter = true
    },
    clearFilter: state => {
      state.filtered = []
      state.didFilter = false
    },
    clearSelected: state => {
      state.selected = {}
    },
    selectAll: state => {
      const obj: typeof state.selected = {}
      state.filtered.forEach(id => (obj[id] = true))
      state.selected = obj
    },
    select: (state, {payload}: PayloadAction<{key: string; enabled: boolean}>) => {
      const {enabled, key} = payload
      state.selected = {...state.selected, [key]: enabled}
    },
  },
})

export const memberReducer = memberSlice.reducer
export const memberActions = memberSlice.actions
