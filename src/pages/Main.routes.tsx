import {IonRouterOutlet} from '@ionic/react'
import React from 'react'

import {PrivateRoute} from '../components/PrivateRoute.component'
import DashboardPage from './Dashboard/Dashboard.page'
import MemberInfoPage from './Members/MemberInfo.page'
import MembersPage from './Members/Members.page'
import ProjectPage from './Project/Project.page'
import ProjectCreatePage from './Project/ProjectCreate.page'
import SelectableMemberPage from './Project/SelectableMember.page'
import ViewProjectPage from './Project/ViewProject.page'
import {MainRouteNames} from './Route.names'

export const MainRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      <PrivateRoute path={MainRouteNames.Dashboard} component={DashboardPage} />
      <PrivateRoute path={MainRouteNames.Members} component={MembersPage} />
      <PrivateRoute path={MainRouteNames.MemberInfo} component={MemberInfoPage} />
      <PrivateRoute path={MainRouteNames.Projects} component={ProjectPage} />
      <PrivateRoute path={MainRouteNames.ProjectCreate} component={ProjectCreatePage} />
      <PrivateRoute path={MainRouteNames.SelectableMember} component={SelectableMemberPage} />
      <PrivateRoute path={MainRouteNames.ViewProject} component={ViewProjectPage} />
    </IonRouterOutlet>
  )
}
