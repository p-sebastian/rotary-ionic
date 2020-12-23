import './Project.styles.css'

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

import {MainRouteNames} from '../Route.names'
import {ProjectHooks} from './Project.hooks'

const ProjectPage: React.FC = () => {
  const {toCreate, keys} = useProject()

  return (
    <IonPage id="rc-project-page">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={MainRouteNames.Dashboard} />
          </IonButtons>
          <IonTitle>Proyectos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
        <IonList className="ion-no-padding">
          {keys.map((key, i) => (
            <Item key={key} id={key} index={i} />
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="secondary" onClick={toCreate}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

const Item: React.FC<{id: string; index: number}> = ({id, index}) => {
  const {project, toView} = useProjectItem(id)
  const {name, amountGathered} = project

  return (
    <IonItem className="rc-project-item" button detail onClick={toView}>
      <IonNote slot="start" color="tertiary">
        {index + 1}
      </IonNote>
      <IonLabel>{name}</IonLabel>
      <IonNote slot="end" color="tertiary">
        ${amountGathered}
      </IonNote>
    </IonItem>
  )
}

const {useProject, useProjectItem} = ProjectHooks
export default ProjectPage
