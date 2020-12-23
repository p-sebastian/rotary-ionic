import './Members.styles.css'

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {filterOutline, refreshOutline} from 'ionicons/icons'
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeList as List, ListChildComponentProps, ListItemKeySelector} from 'react-window'

import Skeleton from '../../components/Skeleton.component'
import {MainRouteNames} from '../Route.names'
import MemberFilterModal from './MemberFilter.modal'
import {MembersHooks, TItemData} from './Members.hooks'

const MembersPage: React.FC = () => {
  const {keys, text, onSearch, members, didFilter} = useMembers()
  const {open, onOpen, onClose} = useModal()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref={MainRouteNames.Dashboard} />
          </IonButtons>
          <IonTitle>Socios</IonTitle>
          <IonButtons slot="end">
            <IonButton color="light" onClick={onOpen}>
              <IonIcon slot="icon-only" icon={didFilter ? refreshOutline : filterOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {didFilter ? null : <IonSearchbar placeholder="Busqueda" value={text} onIonChange={onSearch} />}
        {keys.length ? <IonItemDivider>Total ({keys.length})</IonItemDivider> : <Skeleton />}
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
        <MemberFilterModal isOpen={open} swipeToClose onDidDismiss={onClose} />
      </IonContent>
    </IonPage>
  )
}

const keyExtract: ListItemKeySelector = (i, data: TItemData) => data.members[data.keys[i]]._id
const Row: React.FC<ListChildComponentProps> = React.memo(props => {
  const {index, style} = props
  const {member, toInfo} = useMemberItem(index, props.data)
  const {fullName, club} = member
  const {type} = club

  return (
    <IonItem button className={type} style={style} onClick={toInfo} detail>
      <IonLabel>{fullName}</IonLabel>
    </IonItem>
  )
})

const {useMembers, useMemberItem, useModal} = MembersHooks
export default MembersPage
