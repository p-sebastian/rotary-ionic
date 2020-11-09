import {IonCard, IonItem, IonLabel} from '@ionic/react'
import {DateTime} from 'luxon'
import React from 'react'

import {GenderEnum, TUser} from '../redux/user.interface'

type Props = {user: TUser}
export const InfoCard: React.FC<Props> = ({user}) => {
  const {fullName, club, country, province, city, memberId, admissionDate, registered, gender} = user
  const {name, type} = club
  const since = DateTime.fromISO(admissionDate).year
  return (
    <IonCard>
      <IonItem color="tertiary">
        <IonLabel className="ion-text-wrap">{fullName}</IonLabel>
      </IonItem>
      <IonItem className="info">
        <span className="title">ID</span>
        <IonLabel slot="end" className="ion-text-wrap">
          {memberId}
        </IonLabel>
      </IonItem>
      <IonItem className="info">
        <span className="title">Miembro desde</span>
        <IonLabel slot="end">{since}</IonLabel>
      </IonItem>
      <IonItem className="info">
        <span className="title">Genero</span>
        <IonLabel slot="end">{gender === GenderEnum.Female ? 'Mujer' : 'Hombre'}</IonLabel>
      </IonItem>
      <IonItem className="info">
        <span className="title">Registrado</span>
        <IonLabel slot="end">{registered ? 'Si' : 'No'}</IonLabel>
      </IonItem>
      <IonItem className="info">
        <span className="title">Ubicacion</span>
        <IonLabel slot="end" className="ion-text-wrap">
          {country}, {province}, {city}
        </IonLabel>
      </IonItem>
      <IonItem color="tertiary" className="info">
        <span>Club</span>
        <IonLabel slot="end">{type}</IonLabel>
      </IonItem>
      <IonItem className="info">
        <IonLabel className="ion-text-wrap">{name}</IonLabel>
      </IonItem>
    </IonCard>
  )
}
