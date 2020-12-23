import './ViewProject.styles.css'

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
import {TClub} from '../../redux/club.interface'
import {MainRouteNames} from '../Route.names'
import {ViewProjectHooks} from './ViewProject.hooks'

const ViewProjectPage: React.FC = () => {
  const {project} = useViewProject()
  if (!project) {
    return null
  }
  const {
    name,
    club,
    members,
    endDate,
    startDate,
    budget,
    amountGathered,
    volunteerHours,
    benefactorAmount,
    numberOfVolunteers,
    otherInstructions,
  } = project
  const {type, code, name: clubName} = club as TClub

  return (
    <IonPage id="rc-view-project-page">
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
            <IonItem className={type}>
              <IonLabel>{clubName}</IonLabel>
              <IonNote slot="end" color="tertiary">
                ({code})
              </IonNote>
            </IonItem>
          </IonList>
          <IonItemDivider color="tertiary">Socios ({members.length})</IonItemDivider>
          <IonList className="member ion-no-padding">
            {members.map((id, i) => (
              <Member key={id} id={id} index={i} />
            ))}
          </IonList>
        </IonCard>

        <IonCard>
          <IonList className="ion-no-padding">
            <IonItemDivider color="tertiary">Fechas</IonItemDivider>
            <IonItem>
              <IonLabel color="tertiary">Inicio</IonLabel>
              {parseDate(startDate)}
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary">Fin</IonLabel>
              {parseDate(endDate)}
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard>
          <IonList className="ion-no-padding">
            <IonItemDivider color="tertiary">Presupuesto</IonItemDivider>
            <IonItem>
              <IonLabel color="tertiary">Presupuesto</IonLabel>
              <IonNote slot="end">${budget.toFixed(2)}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary">Total Recaudado</IonLabel>
              <IonNote slot="end">${amountGathered.toFixed(2)}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary"># de Beneficiarios</IonLabel>
              <IonNote slot="end">{benefactorAmount}</IonNote>
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard>
          <IonList className="ion-no-padding">
            <IonItemDivider color="tertiary">Voluntariado</IonItemDivider>
            <IonItem>
              <IonLabel color="tertiary"># de voluntarios</IonLabel>
              <IonNote slot="end">{numberOfVolunteers}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary">Horas</IonLabel>
              <IonNote slot="end">{volunteerHours} horas</IonNote>
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard>
          <IonItemDivider color="tertiary">Instrucciones</IonItemDivider>
          <IonCardContent>{otherInstructions}</IonCardContent>
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

const {useViewProject, useMember, parseDate} = ViewProjectHooks
export default ViewProjectPage
