import {InputChangeEventDetail} from '@ionic/core'
import {useCallback, useState} from 'react'
import {useHistory, useLocation} from 'react-router'

import {AuthRouteNames} from '../Route.names'

const useLoginAuth = () => {
  const props = useParams()

  return {...props}
}

const useRegisterAuth = () => {
  const history = useHistory()
  const props = useParams()
  const toLogin = useCallback(() => history.push(AuthRouteNames.Login, props.params), [props.params])

  return {...props, toLogin}
}

const useParams = () => {
  const {state = {}} = useLocation<{email?: string; password?: string}>()
  const [params, setParams] = useState({
    email: '',
    password: '',
    ...state,
  })

  const setValue = (key: keyof typeof params) => (e: CustomEvent<InputChangeEventDetail>) =>
    setParams({...params, [key]: e.detail.value})

  return {params, setValue}
}

export const AuthHooks = {useLoginAuth, useRegisterAuth}
