import {IonRouterOutlet} from '@ionic/react'
import React from 'react'

import {PrivateRoute} from '../components/PrivateRoute.component'
import DashboardPage from './Dashboard/Dashboard.page'
import MemberInfoPage from './Members/MemberInfo.page'
import MembersPage from './Members/Members.page'
import {MainRouteNames} from './Route.names'

export const MainRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      <PrivateRoute path={MainRouteNames.Dashboard} component={DashboardPage} />
      <PrivateRoute path={MainRouteNames.Members} component={MembersPage} />
      <PrivateRoute path={MainRouteNames.MemberInfo} component={MemberInfoPage} />
    </IonRouterOutlet>
  )
}
