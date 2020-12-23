import {InputChangeEventDetail} from '@ionic/core'
import {useCallback, useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router'

import {useAuthAction} from '../../hooks/useAction.hook'
import {AuthSignUpPayload} from '../../redux/auth.interface'
import {AuthStateEnum} from '../../redux/slices/auth.slice'
import {TUser} from '../../redux/user.interface'
import {useASelector} from '../../utils/recipies.util'
import {AuthRouteNames, MainRouteNames} from '../Route.names'

const useLoginAuth = () => {
  const history = useHistory()
  const login = useAuthAction('login')
  const props = useParams()
  const status = useASelector(state => state.auth.status)

  const toVerify = useCallback(() => history.replace(AuthRouteNames.Verify), [])

  const onPress = () => {
    login(props.params)
  }

  useEffect(() => {
    if (status === AuthStateEnum.SignedIn) {
      history.replace(MainRouteNames.Dashboard)
    }
  }, [status])
  return {...props, onPress, toVerify}
}

const useRegisterAuth = () => {
  const register = useAuthAction('signUp')
  const history = useHistory()
  const toLogin = useCallback(() => history.push(AuthRouteNames.Login), [])
  const status = useASelector(state => state.auth.status)
  const user = useASelector(state => state.user.user)
  const [data, setData] = useState<TUser>(user ?? ({} as any))
  const props = useParams(data.email)

  if (!user) {
    history.replace(AuthRouteNames.Verify)
  }

  const onChange = (key: keyof TUser) => (e: CustomEvent<InputChangeEventDetail>) =>
    setData({...data, [key]: e.detail.value})

  const {email, password} = props.params
  const invalid = !email || !password || !data.birthday

  const onSubmit = () => {
    const user: AuthSignUpPayload = {...data, ...props.params}
    register(user)
  }

  useEffect(() => {
    if (status === AuthStateEnum.Code) {
      history.push(AuthRouteNames.Code)
    }
  }, [status])

  return {...props, toLogin, onChange, user: data as TUser, invalid, onSubmit}
}

const useVerify = () => {
  const history = useHistory()
  const verify = useAuthAction('verify')
  const status = useASelector(state => state.auth.status)
  const [identification, setIdentification] = useState('')
  const toLogin = useCallback(() => history.push(AuthRouteNames.Login), [])

  useEffect(() => {
    if (status === AuthStateEnum.NeedsAccount) {
      history.push(AuthRouteNames.Register)
    }
  }, [status])

  const onPress = useCallback(() => verify(identification), [identification])
  const onChange = useCallback((e: CustomEvent<InputChangeEventDetail>) => setIdentification(e.detail.value ?? ''), [])

  return {identification, onChange, toLogin, onPress}
}

export const useCode = () => {
  const history = useHistory()
  const confirm = useAuthAction('confirm')
  const status = useASelector(state => state.auth.status)
  const [code, setCode] = useState('')
  const toLogin = useCallback(() => history.replace(AuthRouteNames.Login), [])

  useEffect(() => {
    if (status === AuthStateEnum.SignIn) {
      history.replace(AuthRouteNames.Login)
    }
  }, [status])

  const onPress = useCallback(() => confirm({code}), [code])
  const onChange = useCallback((e: CustomEvent<InputChangeEventDetail>) => setCode(e.detail.value ?? ''), [])

  return {code, onChange, toLogin, onPress}
}

export const AuthHooks = {useLoginAuth, useRegisterAuth, useVerify, useCode}

const useParams = (email = '') => {
  const {state = {}} = useLocation<{email?: string; password?: string}>()
  const [params, setParams] = useState({
    email: '',
    password: '',
    ...(email ? {email} : state),
  })

  const setValue = (key: keyof typeof params) => (e: CustomEvent<InputChangeEventDetail>) =>
    setParams({...params, [key]: e.detail.value})

  return {params, setValue}
}
