import {combineReducers} from 'redux'

import {authReducer} from './auth.slice'
import {clubReducer} from './club.slice'
import {errorReducer} from './error.slice'
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
})

export type RootState = ReturnType<typeof rootReducer>
export type TMembersState = ReturnType<typeof memberReducer>
export type TClubState = ReturnType<typeof clubReducer>
export type TProjectState = ReturnType<typeof projectReducer>
