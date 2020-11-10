import {IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React from 'react'

import {InfoCard} from '../../components/InfoCard.component'
import {MemberInfoHooks} from './MemberInfo.hooks'

const MemberInfoPage: React.FC = () => {
  const {member} = useMemberInfo()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Socios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{member && <InfoCard user={member} />}</IonContent>
    </IonPage>
  )
}

const {useMemberInfo} = MemberInfoHooks
export default MemberInfoPage
