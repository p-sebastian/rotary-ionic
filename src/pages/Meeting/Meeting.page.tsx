import './Meeting.styles.css'

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {addOutline} from 'ionicons/icons'
import React from 'react'

import {parseDate} from '../../utils/helpers.util'
import {MainRouteNames} from '../Route.names'
import {MeetingHooks} from './Meeting.hooks'

const MeetingPage: React.FC = () => {
  const {keys, toCreate, canCreate} = useMeeting()

  return (
    <IonPage id="rc-meeting-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={MainRouteNames.Dashboard} />
          </IonButtons>
          <IonTitle>Reuniones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
        <IonList className="ion-no-padding">
          {keys.map((key, i) => (
            <Item key={key} id={key} index={i} />
          ))}
        </IonList>
        {canCreate ? (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton color="secondary" onClick={toCreate}>
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        ) : null}
      </IonContent>
    </IonPage>
  )
}

const Item: React.FC<{id: string; index: number}> = ({id, index}) => {
  const {meeting, toView} = useMeetingItem(id)
  const {name, startDate} = meeting

  return (
    <IonItem className="rc-meeting-item" button detail onClick={toView}>
      <IonNote slot="start" color="tertiary">
        {index + 1}
      </IonNote>
      <IonLabel>{name}</IonLabel>
      <IonNote slot="end" color="tertiary">
        {parseDate(startDate)}
      </IonNote>
    </IonItem>
  )
}

const {useMeeting, useMeetingItem} = MeetingHooks

export default MeetingPage
