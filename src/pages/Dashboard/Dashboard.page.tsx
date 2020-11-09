import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {gridOutline} from 'ionicons/icons'
import React from 'react'

import {InfoCard} from '../../components/InfoCard.component'
import {DashboardHooks} from './Dashboard.hooks'

const DashboardPage: React.FC = () => {
  const {onMenuToggle, user} = useDashboard()

  return (
    <IonPage>
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
        <InfoCard user={user} />
      </IonContent>
    </IonPage>
  )
}

const {useDashboard} = DashboardHooks
export default DashboardPage
