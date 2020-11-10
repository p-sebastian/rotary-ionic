import './Members.styles.css'

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import {FixedSizeList as List, ListChildComponentProps, ListItemKeySelector} from 'react-window'

import {TUser} from '../../redux/user.interface'
import {MembersHooks} from './Members.hooks'

const MembersPage: React.FC = () => {
  const {keys, text, onSearch, members} = useMembers()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Socios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar placeholder="Busqueda" value={text} onIonChange={onSearch} />
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

type TItemData = {members: {[id: string]: TUser}; keys: string[]}
const keyExtract: ListItemKeySelector = (i, data: TItemData) => data.members[data.keys[i]]._id
const Row: React.FC<ListChildComponentProps> = React.memo(props => {
  const {index, style} = props
  const {member, toInfo} = useMemberItem(index)
  const {fullName, club} = member
  const {type} = club

  return (
    <IonItem button className={type} style={style} onClick={toInfo} detail>
      <IonLabel>{fullName}</IonLabel>
    </IonItem>
  )
})

const {useMembers, useMemberItem} = MembersHooks
export default MembersPage
