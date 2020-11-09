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
import {DateTime} from 'luxon'
import React from 'react'

import {GenderEnum} from '../../redux/user.interface'
import {AuthHooks} from './Auth.hooks'

const RegisterPage: React.FC = () => {
  const {user, onChange, setValue, params, invalid, onSubmit} = useRegisterAuth()
  const {email, password} = params
  const {
    fullName,
    club,
    country,
    province,
    city,
    memberId,
    admissionDate,
    registered,
    gender,
    birthday,
    profession,
    phone,
    prefix,
    suffix,
    activity,
    affiliate,
  } = user
  const {name, type} = club
  const since = DateTime.fromISO(admissionDate).year

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
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
