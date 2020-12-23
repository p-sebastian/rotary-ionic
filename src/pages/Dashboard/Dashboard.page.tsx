import './Dashboard.styles.css'

import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {gridOutline} from 'ionicons/icons'
import React from 'react'

import {BUTTONS} from '../../utils/constants.util'
import {DashboardHooks} from './Dashboard.hooks'

const DashboardPage: React.FC = () => {
  const {onMenuToggle} = useDashboard()
  const {navigate} = useNav()

  return (
    <IonPage className="rc-dashboard-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={onMenuToggle}>
              <IonIcon slot="icon-only" icon={gridOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent class="ion-justify-content-center ion-no-padding">
            <IonIcon class="logo" src="assets/logo.svg" />
          </IonCardContent>
        </IonCard>
        <IonGrid>
          <IonRow className="ion-justify-content-between">
            {BUTTONS.map(({icon, key, label}) => (
              <IonCol size="6" key={key}>
                <IonButton color="primary" onClick={navigate(key)}>
                  <div className="vertical">
                    <IonIcon icon={icon} color="warning" slot="start" />
                    <span>{label}</span>
                  </div>
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

const {useDashboard, useNav} = DashboardHooks
export default DashboardPage
