import './MeetingCreate.styles.css'

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
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {informationCircleOutline, trashOutline} from 'ionicons/icons'
import React from 'react'

import {MainRouteNames} from '../Route.names'
import {MeetingCreateHooks} from './MeetingCreate.hooks'

const MeetingCreatePage: React.FC = () => {
  const {users, data, selected, onMember, remove, invalid, onSubmit, onChange, club} = useMeetingCreate()
  const {duration, name, startDate} = data
  // const {name} = club

  return (
    <IonPage id="rc-meeting-create-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={MainRouteNames.Meetings} />
          </IonButtons>
          <IonTitle>Nueva Reunion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
        <IonCard>
          <IonList class="ion-no-padding">
            <IonItemDivider color="tertiary">Informacion de Club</IonItemDivider>
            <IonItem>
              <IonLabel>
                {club.name} ({club.code})
              </IonLabel>
            </IonItem>
            <IonItem button detail onClick={onMember}>
              Socios
            </IonItem>
          </IonList>

          {selected.length === 0 ? null : (
            <>
              <IonItemDivider color="primary">Seleccionados</IonItemDivider>
              <IonList className="ion-no-padding member">
                {selected.map(id => (
                  <Member key={id} fullName={users[id].fullName} remove={remove(id)} />
                ))}
              </IonList>
            </>
          )}
        </IonCard>

        <IonCard>
          <IonList class="ion-no-padding">
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Nombre de Reunion
              </IonLabel>
              <IonInput onIonChange={onChange('name')} value={name} />
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard>
          <IonItemDivider color="tertiary">Fechas</IonItemDivider>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              Fecha de Inicio
            </IonLabel>
            <IonDatetime value={startDate} onIonChange={onChange('startDate')} />
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              Duracion (horas)
            </IonLabel>
            <IonInput type="number" onIonChange={onChange('duration')} value={duration} />
          </IonItem>
        </IonCard>

        <IonCard className="ion-no-padding">
          <IonButton color="secondary" className="rc-submit" expand="block" disabled={invalid} onClick={onSubmit}>
            Crear
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

type TMProps = {fullName: string; remove: () => void}
const Member: React.FC<TMProps> = ({fullName, remove}) => (
  <IonItem>
    <IonLabel>{fullName}</IonLabel>
    <IonButton slot="end" color="danger" onClick={remove}>
      <IonIcon slot="icon-only" icon={trashOutline} />
    </IonButton>
  </IonItem>
)

const {useMeetingCreate} = MeetingCreateHooks
export default MeetingCreatePage
