import {combineReducers} from 'redux'

import {authReducer} from './auth.slice'
import {errorReducer} from './error.slice'
import {userReducer} from './user.slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
