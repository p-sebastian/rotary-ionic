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
import {logOutOutline} from 'ionicons/icons'
import React, {useCallback, useEffect} from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router'

import {PrivateRoute} from '../components/PrivateRoute.component'
import {useAuthAction} from '../hooks/useAction.hook'
import {AuthStateEnum} from '../redux/slices/auth.slice'
import {BUTTONS, ButtonEnum} from '../utils/constants.util'
import {useASelector} from '../utils/recipies.util'
import {AuthRouter} from './Auth/Auth.routes'
import {MainRouter} from './Main.routes'
import {AppRouteNames, AuthRouteNames, MainRouteNames} from './Route.names'

export const AppRouter: React.FC = () => {
  const {onLogout, navigate} = useInit()

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
            {BUTTONS.map(({icon, key, label}) => (
              <IonItem button detail key={key} onClick={navigate(key)}>
                <IonIcon icon={icon} slot="start" color="primary" />
                <IonLabel>{label}</IonLabel>
              </IonItem>
            ))}
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
          <PrivateRoute path={AppRouteNames.Main} component={MainRouter} />
          <Route path={AppRouteNames.Auth} component={AuthRouter} />
          <Route exact path="/" render={() => <Redirect to={MainRouteNames.Dashboard} />} />
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

  const navigate = useCallback(
    (where: ButtonEnum) => () => {
      switch (where) {
        case ButtonEnum.Socios:
          history.push(MainRouteNames.Members)
          break
        case ButtonEnum.Meetings:
          history.push(MainRouteNames.Meetings)
          break
        case ButtonEnum.Projects:
          history.push(MainRouteNames.Projects)
          break
        case ButtonEnum.Publications:
          history.push(MainRouteNames.Publications)
          break
      }
      menuController.close('first')
    },
    [],
  )

  const onLogout = useCallback(() => {
    logout()
    menuController.close('first')
  }, [])

  return {onLogout, navigate}
}
