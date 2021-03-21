import {InputChangeEventDetail} from '@ionic/core'
import Fuse from 'fuse.js'
import {cashOutline, clipboardOutline, ribbonOutline} from 'ionicons/icons'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useHistory} from 'react-router'

import {useMemberAction} from '../../hooks/useAction.hook'
import {RoleTitleEnum, TRole} from '../../redux/role.interface'
import {TUser} from '../../redux/user.interface'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useMembers = () => {
  const action = useMemberAction('get')
  const [text, setText] = useState('')
  const keys = useASelector(state => state.member.keys)
  const members = useASelector(state => state.member.members)
  const didFilter = useASelector(state => state.member.didFilter)
  const filterKeys = useASelector(state => state.member.filtered)
  const [filtered, setFiltered] = useState(keys ?? [])

  const fuse = useMemo(
    () => new Fuse(Object.values(members), {keys: [{name: 'fullName', weight: 2}, 'club.code', 'club.type']}),
    [members],
  )

  useEffect(() => {
    if (!text.trim()) {
      setFiltered(keys)
    } else {
      const searched = fuse.search(text)
      setFiltered(searched.map(({item: {_id}}) => _id))
    }
  }, [text, fuse])

  useEffect(() => {
    action()
  }, [])

  useEffect(() => {
    if (didFilter) {
      setFiltered(filterKeys)
    } else {
      setFiltered(keys)
    }
  }, [didFilter, filterKeys])

  const onSearch = (e: CustomEvent<InputChangeEventDetail>) => setText(e.detail.value ?? '')

  return {keys: filtered, members, text, onSearch, didFilter}
}

const useModal = () => {
  const [open, setOpen] = useState(false)
  const didFilter = useASelector(state => state.member.didFilter)
  const reset = useMemberAction('clearFilter')

  const onClose = useCallback(() => setOpen(false), [])
  const onOpen = useCallback(() => (didFilter ? reset() : setOpen(true)), [didFilter])

  return {open, onClose, onOpen}
}

const useMemberItem = (index: number, data: TItemData) => {
  const history = useHistory()
  const {members, keys} = data
  const id = keys[index]
  const member = members[id]

  const toInfo = useCallback(() => history.push(MainRouteNames.MemberInfo, {memberId: id}), [id])

  return {member, toInfo}
}

export const MembersHooks = {useMembers, useMemberItem, useModal}
export type TItemData = {members: {[id: string]: TUser}; keys: string[]}
