import './Register.styles.css'

import {
  IonButton,
  IonCard,
  IonContent,
  IonDatetime,
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

import {InfoCard} from '../../components/InfoCard.component'
import {AuthHooks} from './Auth.hooks'

const RegisterPage: React.FC = () => {
  const {user, onChange, setValue, params, invalid, onSubmit} = useRegisterAuth()
  const {email, password} = params
  const {birthday, profession, phone, prefix, suffix, activity, affiliate} = user

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
        <InfoCard user={user} />

        <IonCard>
          <IonList class="ion-no-padding">
            <IonItem>
              <IonIcon icon={informationCircleOutline} slot="start" size="large" color="primary" />
              <IonLabel className="ion-text-wrap">
                Los siguientes campos son opcionales. Si desea puede cambiarlos despues dentro de configuracion
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>

        <IonCard>
          <IonList class="ion-no-padding">
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Profesion
              </IonLabel>
              <IonInput onIonChange={onChange('profession')} value={profession} />
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Telefono
              </IonLabel>
              <IonInput type="tel" onIonChange={onChange('phone')} value={phone} />
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Prefijo
              </IonLabel>
              <IonInput onIonChange={onChange('prefix')} value={prefix} />
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Sufijo
              </IonLabel>
              <IonInput onIonChange={onChange('suffix')} value={suffix} />
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Actividad
              </IonLabel>
              <IonInput onIonChange={onChange('activity')} value={activity} />
            </IonItem>
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Afiliacion
              </IonLabel>
              <IonInput onIonChange={onChange('affiliate')} value={affiliate} />
            </IonItem>
          </IonList>
        </IonCard>

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
            <IonItem>
              <IonLabel color="tertiary" position="floating">
                Fecha de Nacimiento
              </IonLabel>
              <IonDatetime value={birthday ?? ''} onIonChange={onChange('birthday')} />
            </IonItem>
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

        <IonButton class="ion-margin" color="secondary" expand="full" disabled={invalid} onClick={onSubmit}>
          Registrar
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

const {useRegisterAuth} = AuthHooks
export default RegisterPage
