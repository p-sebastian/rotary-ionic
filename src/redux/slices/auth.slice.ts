import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {AuthSignInPayload} from '../auth.interface'

export enum AuthStateEnum {
  None = 'none',
  SignedIn = 'signed_in',
  Registered = 'registered',
  Logoff = 'logoff',
}

type State = {
  status: AuthStateEnum
  sub: string
  email: string
}

const INITIAL_STATE: State = {
  status: AuthStateEnum.None,
  sub: '',
  email: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    signUp: (_, {}: PayloadAction<AuthSignInPayload>) => {},
    registered: state => {
      state.status = AuthStateEnum.Registered
    },
    login: (state, {payload}: PayloadAction<AuthSignInPayload>) => {
      state.email = payload.email
    },
    signedIn: (state, {payload}: PayloadAction<string>) => {
      state.status = AuthStateEnum.SignedIn
      state.sub = payload
    },
    logout: state => {
      state.status = AuthStateEnum.Logoff
    },
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
