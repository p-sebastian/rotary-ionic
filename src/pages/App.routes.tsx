import {IonRouterOutlet} from '@ionic/react'
import React from 'react'
import {Redirect, Route, Switch} from 'react-router'

import {PrivateRoute} from '../components/PrivateRoute.component'
import {AuthRouter} from './Auth/Auth.routes'
import DashboardPage from './Dashboard/Dashboard.page'
import {AppRouteNames, AuthRouteNames} from './Route.names'

export const AppRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Switch>
        <PrivateRoute path={AppRouteNames.Dashboard} component={DashboardPage} />
        <Route path={AppRouteNames.Auth} component={AuthRouter} />
        <Route exact path="/" render={() => <Redirect to={AppRouteNames.Dashboard} />} />
        <Route path="*" render={() => <Redirect to={AuthRouteNames.Login} />} />
      </Switch>
    </IonRouterOutlet>
  )
}
