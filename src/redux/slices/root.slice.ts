import {combineReducers} from 'redux'

import {authReducer} from './auth.slice'
import {clubReducer} from './club.slice'
import {errorReducer} from './error.slice'
import {meetingReducer} from './meeting.slice'
import {memberReducer} from './member.slice'
import {projectReducer} from './project.slice'
import {userReducer} from './user.slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  member: memberReducer,
  club: clubReducer,
  project: projectReducer,
  meeting: meetingReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type TMembersState = ReturnType<typeof memberReducer>
export type TClubState = ReturnType<typeof clubReducer>
export type TProjectState = ReturnType<typeof projectReducer>
export type TMeetingState = ReturnType<typeof meetingReducer>
