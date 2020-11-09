import {IonRouterOutlet} from '@ionic/react'
import React from 'react'
import {Route} from 'react-router'

import {AuthRouteNames} from '../Route.names'
import CodePage from './Code.page'
import LoginPage from './Login.page'
import RegisterPage from './Register.page'
import VerifyPage from './Verify.page'

export const AuthRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route path={AuthRouteNames.Login} component={LoginPage} />
      <Route path={AuthRouteNames.Verify} component={VerifyPage} />
      <Route path={AuthRouteNames.Register} component={RegisterPage} />
      <Route path={AuthRouteNames.Code} component={CodePage} />
    </IonRouterOutlet>
  )
}
