import './MemberFilter.styles.css'

import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonToolbar,
} from '@ionic/react'
import {ReactOverlayProps} from '@ionic/react/dist/types/components/createOverlayComponent'
import {ReactModalOptions} from '@ionic/react/dist/types/components/IonModal'
import {informationCircleOutline, refreshOutline, trashOutline} from 'ionicons/icons'
import React from 'react'

import {TClub} from '../../redux/club.interface'
import {MemberFilterHooks} from './MemberFilter.hooks'

type Props = Omit<ReactOverlayProps & ReactModalOptions, 'children'>
const MemberFilterModal: React.FC<Props> = props => {
  const {onFilter, close, clubs, onSelect, onClear, selected, remove, openPicker} = useMemberFilter()

  return (
    <IonModal {...props} id="rc-filter-modal">
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton color="light" onClick={onClear}>
              <IonIcon slot="icon-only" icon={refreshOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="light" onClick={close}>
              Cerrar
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonList class="ion-no-padding">
            <IonItem>
              <IonIcon icon={informationCircleOutline} slot="start" size="large" color="primary" />
              <IonLabel className="ion-text-wrap">Los siguientes campos filtraran la lista de socios</IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard>
          <IonItem button detail={false} onClick={openPicker}>
            <IonLabel>Tipo de Club</IonLabel>
            <IonNote slot="end" className="ion-no-padding ion-align-self-center">
              {selected.type}
            </IonNote>
          </IonItem>
        </IonCard>
        <IonCard>
          <IonList className="ion-no-padding">
            <IonItem>
              <IonLabel>Clubs</IonLabel>
              <IonSelect value={selected.club} multiple placeholder="Seleccione un Club" onIonChange={onSelect('club')}>
                {clubs.keys.map(id => (
                  <IonSelectOption key={id} value={id}>
                    ({clubs.clubs[id].code}) {clubs.clubs[id].name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
          {selected.club.length === 0 ? null : (
            <>
              <IonItemDivider color="primary">Seleccionados</IonItemDivider>
              <IonList className="ion-no-padding club">
                {selected.club.map(id => (
                  <Club key={id} {...clubs.clubs[id]} remove={remove(id)} />
                ))}
              </IonList>
            </>
          )}
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel>Filtrar por edad?</IonLabel>
            <IonToggle checked={selected.ageEnabled} onIonChange={onSelect('ageEnabled')} />
          </IonItem>
          {selected.ageEnabled ? (
            <IonRange pin dualKnobs snaps debounce={500} min={18} max={100} step={3} onIonChange={onSelect('range')}>
              <IonLabel slot="start">{selected.range.lower}</IonLabel>
              <IonLabel slot="end">{selected.range.upper}</IonLabel>
            </IonRange>
          ) : null}
        </IonCard>
        <IonButton color="secondary" expand="block" className="rc-btn-bottom" onClick={onFilter}>
          Filtrar
        </IonButton>
      </IonContent>
    </IonModal>
  )
}

type TCProps = TClub & {remove: () => void}
const Club: React.FC<TCProps> = ({name, code, remove}) => (
  <IonItem>
    <IonLabel>
      ({code}) - {name}
    </IonLabel>
    <IonButton slot="end" color="danger" onClick={remove}>
      <IonIcon slot="icon-only" icon={trashOutline} />
    </IonButton>
  </IonItem>
)

const {useMemberFilter} = MemberFilterHooks
export default MemberFilterModal
