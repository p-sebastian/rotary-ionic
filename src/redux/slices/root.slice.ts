import {combineReducers} from 'redux'

import {authReducer} from './auth.slice'
import {errorReducer} from './error.slice'
import {memberReducer} from './member.slice'
import {userReducer} from './user.slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  member: memberReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type TMembersState = ReturnType<typeof memberReducer>
