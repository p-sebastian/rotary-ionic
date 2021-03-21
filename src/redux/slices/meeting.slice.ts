import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TMeeting, TMeetingCreate} from '../meeting.interface'

type State = {
  meetings: {[id: string]: TMeeting}
  keys: string[]
}
const INITIAL_STATE: State = {
  meetings: {},
  keys: [],
}

export const meetingSlice = createSlice({
  name: 'meeting',
  initialState: INITIAL_STATE,
  reducers: {
    get: () => {},
    set: (_, {payload}: PayloadAction<State>) => payload,
    create: (_, {}: PayloadAction<TMeetingCreate>) => {},
  },
})

export const meetingReducer = meetingSlice.reducer
export const meetingActions = meetingSlice.actions
