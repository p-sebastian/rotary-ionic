import './Login.styles.css'

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'

import {AuthHooks} from './Auth.hooks'

const LoginPage: React.FC = () => {
  const {params, setValue} = useLoginAuth()
  const {email, password} = params

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Rotary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
        <IonCard>
          <IonCardContent class="ion-justify-content-center ion-no-padding">
            <IonIcon class="logo" src="assets/logo.svg" />
          </IonCardContent>
          <IonCardHeader color="primary">
            <IonCardTitle>Distrito 4400</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        <IonCard>
          <IonList class="ion-no-padding">
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Email
              </IonLabel>
              <IonInput type="email" onIonChange={setValue('email')} value={email} />
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Contraseña
              </IonLabel>
              <IonInput type="password" onIonChange={setValue('password')} value={password} />
            </IonItem>
          </IonList>
        </IonCard>
        <IonButton class="ion-margin" color="secondary" expand="full">
          Iniciar Sesion
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

const {useLoginAuth} = AuthHooks
export default LoginPage
