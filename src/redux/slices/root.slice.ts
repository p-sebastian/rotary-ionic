import {combineReducers} from 'redux'

import {authReducer} from './auth.slice'
import {errorReducer} from './error.slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
})

export type RootState = ReturnType<typeof rootReducer>
