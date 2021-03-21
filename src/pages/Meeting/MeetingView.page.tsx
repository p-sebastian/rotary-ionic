import './MeetingView.styles.css'

import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'

import Skeleton from '../../components/Skeleton.component'
import {MainRouteNames} from '../Route.names'
import {MeetingViewHooks} from './MeetingView.hooks'

const MeetingViewPage: React.FC = () => {
  const {meeting} = useMeetingView()
  if (!meeting) {
    return null
  }
  const {name, members} = meeting

  return (
    <IonPage id="rc-meeting-view-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={MainRouteNames.Projects} />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
        <IonCard>
          <IonList className="ion-no-padding">
            <IonItem>
              <IonLabel>{name}</IonLabel>
            </IonItem>
            <IonItemDivider color="tertiary">Informacion de Club</IonItemDivider>
          </IonList>
          <IonItemDivider color="tertiary">Socios ({members.length})</IonItemDivider>
          <IonList className="member ion-no-padding">
            {members.map((u: any, i) => (
              <Member key={u._id} id={u._id} index={i} />
            ))}
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

const Member: React.FC<{id: string; index: number}> = ({id, index}) => {
  const {member} = useMember(id)

  if (!member) {
    return index === 0 ? <Skeleton /> : null
  }
  const {fullName} = member

  return (
    <IonItem>
      <IonLabel>{fullName}</IonLabel>
    </IonItem>
  )
}

const {useMeetingView, useMember} = MeetingViewHooks
export default MeetingViewPage
