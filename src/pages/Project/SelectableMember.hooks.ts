import {InputChangeEventDetail} from '@ionic/core'
import Fuse from 'fuse.js'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useHistory, useLocation} from 'react-router'

import {useMemberAction} from '../../hooks/useAction.hook'
import {TUser} from '../../redux/user.interface'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useSelectableMember = () => {
  const filterBy = useMemberAction('fiterBy')
  const action = useMemberAction('get')
  const clear = useMemberAction('clearFilter')
  const clearSelected = useMemberAction('clearSelected')
  const {state = {clubId: ''}} = useLocation<{clubId: string}>()
  const [text, setText] = useState('')
  const keys = useASelector(state => state.member.filtered)
  const members = useASelector(state => state.member.members)
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
    clear()
    const {clubId} = state
    if (clubId) {
      action()
      filterBy({club: [clubId]})
    }
  }, [])

  const onSearch = (e: CustomEvent<InputChangeEventDetail>) => setText(e.detail.value ?? '')

  return {keys: filtered, members, text, onSearch, clearSelected}
}

const useMemberItem = (index: number, data: TItemData) => {
  const select = useMemberAction('select')
  const {members, keys} = data
  const id = keys[index]
  const selected = useASelector(state => state.member.selected[id], [id])
  const member = members[id]

  const onSelect = useCallback(() => select({key: id, enabled: !selected}), [id, selected])

  return {member, onSelect, selected}
}

export const SelectableMemberHooks = {useSelectableMember, useMemberItem}
export type TItemData = {members: {[id: string]: TUser}; keys: string[]}
