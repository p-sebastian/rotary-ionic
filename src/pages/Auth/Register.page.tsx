import './Login.styles.css'

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
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

const RegisterPage: React.FC = () => {
  const {params, toLogin, setValue} = useRegisterAuth()
  const {email, password} = params

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Registro</IonTitle>
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
          Registrar
        </IonButton>
      </IonContent>
      <IonFooter class="ion-no-border">
        <IonButton color="tertiary" class="footer ion-no-margin" expand="full" onClick={toLogin}>
          Ya tienes una cuenta? presiona aqui
        </IonButton>
      </IonFooter>
    </IonPage>
  )
}

const {useRegisterAuth} = AuthHooks
export default RegisterPage
