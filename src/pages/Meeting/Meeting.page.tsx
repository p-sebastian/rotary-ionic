import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React from 'react'

import {MainRouteNames} from '../Route.names'

const MeetingPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={MainRouteNames.Dashboard} />
          </IonButtons>
          <IonTitle>Reunion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  )
}

export default MeetingPage
