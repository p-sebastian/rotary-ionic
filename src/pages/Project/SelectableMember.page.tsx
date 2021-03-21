import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {checkmarkDoneOutline, refreshOutline} from 'ionicons/icons'
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeList as List, ListChildComponentProps, ListItemKeySelector} from 'react-window'

import Skeleton from '../../components/Skeleton.component'
import {TRole} from '../../redux/role.interface'
import {checkRole} from '../../utils/helpers.util'
import {SelectableMemberHooks, TItemData} from './SelectableMember.hooks'

const SelectableMemberPage: React.FC = () => {
  const {text, onSearch, members, keys, refresh, onRightClick} = useSelectableMember()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Socios</IonTitle>
          <IonButtons slot="end">
            <IonButton color="light" onClick={onRightClick}>
              <IonIcon slot="icon-only" icon={refresh ? refreshOutline : checkmarkDoneOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar placeholder="Busqueda" value={text} onIonChange={onSearch} />
        {keys.length ? null : <Skeleton />}
        <AutoSizer>
          {({height, width}) => (
            <List
              height={height}
              itemData={{members, keys}}
              width={width}
              itemCount={keys.length}
              itemSize={48}
              itemKey={keyExtract}>
              {Row}
            </List>
          )}
        </AutoSizer>
      </IonContent>
    </IonPage>
  )
}

const keyExtract: ListItemKeySelector = (i, data: TItemData) => data.members[data.keys[i]]._id
const Row: React.FC<ListChildComponentProps> = React.memo(props => {
  const {index, style} = props
  const {member, onSelect, selected} = useMemberItem(index, props.data)
  const {fullName, club, role} = member
  const {type} = club
  const icon = checkRole(role as TRole)

  return (
    <IonItem button className={type} style={style} onClick={onSelect} detail={false}>
      {icon ? <IonIcon icon={icon} slot="start" color="primary" /> : null}
      <IonLabel>{fullName}</IonLabel>
      {selected ? (
        <IonNote color="warning" slot="end">
          Añadido
        </IonNote>
      ) : null}
    </IonItem>
  )
})

const {useMemberItem, useSelectableMember} = SelectableMemberHooks
export default SelectableMemberPage
