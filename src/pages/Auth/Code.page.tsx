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
import {informationCircleOutline} from 'ionicons/icons'
import React from 'react'

import {AuthHooks} from './Auth.hooks'

const CodePage: React.FC = () => {
  const {code, onChange, toLogin, onPress} = useCode()

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
          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" size="large" color="primary" />
            <IonLabel className="ion-text-wrap" color="tertiary">
              Le debe haber llegado un codigo al email ingresado anteriormente, ingreselo
            </IonLabel>
          </IonItem>
          <IonList class="ion-no-padding">
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Codigo
              </IonLabel>
              <IonInput type="tel" onIonChange={onChange} value={code} />
            </IonItem>
          </IonList>
        </IonCard>
        <IonButton class="ion-margin" color="secondary" expand="full" onClick={onPress}>
          Verificar
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

const {useCode} = AuthHooks
export default CodePage
