import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TProject} from '../project.interface'

type State = {
  projects: {[id: string]: TProject}
  keys: string[]
}
const INITIAL_STATE: State = {
  projects: {},
  keys: [],
}

export const projectSlice = createSlice({
  name: 'project',
  initialState: INITIAL_STATE,
  reducers: {
    get: () => {},
    set: (_, {payload}: PayloadAction<State>) => payload,
    create: (_, {}: PayloadAction<TProject>) => {},
  },
})

export const projectReducer = projectSlice.reducer
export const projectActions = projectSlice.actions
