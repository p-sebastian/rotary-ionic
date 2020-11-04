import {IonRouterOutlet} from '@ionic/react'
import React from 'react'
import {Route} from 'react-router'

import {AuthRouteNames} from '../Route.names'
import LoginPage from './Login.page'
import RegisterPage from './Register.page'

export const AuthRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route path={AuthRouteNames.Login} component={LoginPage} />
      <Route path={AuthRouteNames.Register} component={RegisterPage} />
    </IonRouterOutlet>
  )
}
