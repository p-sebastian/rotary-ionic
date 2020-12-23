import './ProjectCreate.styles.css'

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
import {ProjectCreateHooks} from './ProjectCreate.hooks'

const ProjectCreatePage: React.FC = () => {
  const {users, onChange, clubs, data, onSubmit, onMember, selected, remove, invalid} = useProjectCreate()
  const {
    club,
    name,
    budget,
    endDate,
    startDate,
    amountGathered,
    volunteerHours,
    benefactorAmount,
    numberOfVolunteers,
    otherInstructions,
  } = data

  return (
    <IonPage id="rc-project-create-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={MainRouteNames.Projects} />
          </IonButtons>
          <IonTitle>Nuevo Proyecto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
        <IonCard>
          <IonList class="ion-no-padding">
            <IonItem>
              <IonIcon icon={informationCircleOutline} slot="start" size="large" color="danger" />
              <IonLabel className="ion-text-wrap">Todos los campos siguientes son requeridos</IonLabel>
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard>
          <IonList class="ion-no-padding">
            <IonItemDivider color="tertiary">Informacion de Club</IonItemDivider>
            <IonItem>
              <IonLabel>Clubs</IonLabel>
              <IonSelect value={club} placeholder="Seleccione un Club" onIonChange={onChange('club')}>
                {clubs.keys.map(id => (
                  <IonSelectOption key={id} value={id}>
                    ({clubs.clubs[id].code}) {clubs.clubs[id].name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {club ? (
              <IonItem button detail onClick={onMember}>
                Socios
              </IonItem>
            ) : null}
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
                Nombre de Proyecto
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
              Fecha de Finalizacion
            </IonLabel>
            <IonDatetime value={endDate} onIonChange={onChange('endDate')} />
          </IonItem>
        </IonCard>
        <IonCard>
          <IonItemDivider color="tertiary">Presupuesto</IonItemDivider>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              # de Beneficiarios
            </IonLabel>
            <IonInput type="tel" onIonChange={onChange('benefactorAmount')} value={benefactorAmount} />
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              Presupuesto
            </IonLabel>
            <IonInput type="tel" onIonChange={onChange('budget')} value={budget} />
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              Dinero Recaudado
            </IonLabel>
            <IonInput type="tel" onIonChange={onChange('amountGathered')} value={amountGathered} />
          </IonItem>
        </IonCard>
        <IonCard>
          <IonItemDivider color="tertiary">Voluntariado</IonItemDivider>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              # de Voluntarios
            </IonLabel>
            <IonInput type="tel" onIonChange={onChange('numberOfVolunteers')} value={numberOfVolunteers} />
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              Horas de Voluntariado
            </IonLabel>
            <IonInput type="tel" onIonChange={onChange('volunteerHours')} value={volunteerHours} />
          </IonItem>
        </IonCard>
        <IonCard>
          <IonItemDivider color="tertiary">Otros</IonItemDivider>
          <IonItem>
            <IonLabel color="tertiary" position="floating">
              Instrucciones
            </IonLabel>
            <IonTextarea onIonChange={onChange('otherInstructions')} value={otherInstructions} />
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

const {useProjectCreate} = ProjectCreateHooks
export default ProjectCreatePage
