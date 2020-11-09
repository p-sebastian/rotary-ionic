import _ from 'lodash'
import {concatAll, filter, ignoreElements, map, switchMap, tap, withLatestFrom} from 'rxjs/operators'

import {TEpic} from '../../type/TEpic'
import {onError} from '../../utils/onError.util'
import {AuthStateEnum, authActions} from '../slices/auth.slice'
import {userActions} from '../slices/user.slice'
import {TUser} from '../user.interface'

const e: TEpic[] = []
e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(authActions.appLaunched.match),
    withLatestFrom(state$),
    tap(([, {auth}]) => (api.token = auth.token)),
    ignoreElements(),
    onError(state$),
  )

e[e.length] = (action$, state$, {amplify, api}) =>
  action$.pipe(
    filter(authActions.signUp.match),
    switchMap(async ({payload}) => {
      const {email, password, ...user} = payload
      const sub = await amplify.signUp({email, password})
      const data = _.omitBy({email, sub, ...user}, _.isNil)
      await api.createUser(data)
      return [userActions.init(data as TUser), authActions.changeStatus(AuthStateEnum.Code)]
    }),
    concatAll(),
    onError(state$),
  )

e[e.length] = (action$, state$, {amplify}) =>
  action$.pipe(
    filter(authActions.confirm.match),
    withLatestFrom(state$),
    switchMap(async ([{payload}, state]) => {
      const {email} = state.user.user!
      const {code} = payload
      await amplify.confirmSignUp(code, email)
      return authActions.changeStatus(AuthStateEnum.SignIn)
    }),
    onError(state$),
  )

e[e.length] = (action$, state$, {amplify, api}) =>
  action$.pipe(
    filter(authActions.login.match),
    switchMap(async ({payload}) => {
      const res = await amplify.signIn(payload)
      if (!res) {
        throw new Error('Unauthorized')
      }
      const {data} = await api.login(res.sub)
      const {token, user} = data
      return [userActions.init(user), authActions.signedIn(token)]
    }),
    concatAll(),
    onError(state$),
  )

e[e.length] = (action$, state$, {amplify, api}) =>
  action$.pipe(
    filter(authActions.logout.match),
    switchMap(amplify.logout),
    tap(() => (api.token = null)),
    ignoreElements(),
    onError(state$),
  )

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(authActions.verify.match),
    switchMap(({payload}) => api.verifyUser(payload)),
    map(({data}) => [userActions.init(data), authActions.changeStatus(AuthStateEnum.NeedsAccount)]),
    concatAll(),
    onError(state$),
  )

export const authEpics = e
