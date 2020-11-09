import {menuController} from '@ionic/core'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {checkboxOutline, documentTextOutline, logOutOutline, peopleCircleOutline} from 'ionicons/icons'
import React, {useEffect} from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router'

import {PrivateRoute} from '../components/PrivateRoute.component'
import {useAuthAction} from '../hooks/useAction.hook'
import {AuthStateEnum} from '../redux/slices/auth.slice'
import {useASelector} from '../utils/recipies.util'
import {AuthRouter} from './Auth/Auth.routes'
import DashboardPage from './Dashboard/Dashboard.page'
import {AppRouteNames, AuthRouteNames} from './Route.names'

export const AppRouter: React.FC = () => {
  const {onLogout} = useInit()
  return (
    <>
      <IonMenu side="start" menuId="first" contentId="rotary-app" swipeGesture={false}>
        <IonHeader>
          <IonToolbar color="secondary">
            <IonTitle>Rotary</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem button detail>
              <IonIcon icon={peopleCircleOutline} slot="start" color="primary" />
              <IonLabel>Socios</IonLabel>
            </IonItem>
            <IonItem button detail>
              <IonIcon icon={checkboxOutline} slot="start" color="primary" />
              <IonLabel>Meetings</IonLabel>
            </IonItem>
            <IonItem button detail>
              <IonIcon icon={documentTextOutline} slot="start" color="primary" />
              <IonLabel>Proyectos</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar color="tertiary">
            <IonButtons slot="start">
              <IonButton onClick={onLogout}>
                <IonIcon slot="start" icon={logOutOutline} />
                Cerrar Session
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonMenu>
      <IonRouterOutlet id="rotary-app">
        <Switch>
          <PrivateRoute path={AppRouteNames.Dashboard} component={DashboardPage} />
          <Route path={AppRouteNames.Auth} component={AuthRouter} />
          <Route exact path="/" render={() => <Redirect to={AppRouteNames.Dashboard} />} />
          <Route path="*" render={() => <Redirect to={AuthRouteNames.Login} />} />
        </Switch>
      </IonRouterOutlet>
    </>
  )
}

const useInit = () => {
  const launched = useAuthAction('appLaunched')
  const history = useHistory()
  const status = useASelector(state => state.auth.status)
  const logout = useAuthAction('logout', true)

  useEffect(() => {
    launched()
  }, [])
  useEffect(() => {
    if (status === AuthStateEnum.Logoff) {
      history.replace(AuthRouteNames.Login)
    }
  }, [status])

  const onLogout = () => {
    logout()
    menuController.close('first')
  }

  return {onLogout}
}
