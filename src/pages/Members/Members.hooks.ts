import {InputChangeEventDetail} from '@ionic/core'
import Fuse from 'fuse.js'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useHistory} from 'react-router'

import {useMemberAction} from '../../hooks/useAction.hook'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useMembers = () => {
  const action = useMemberAction('get')
  const [text, setText] = useState('')
  const keys = useASelector(state => state.member.keys)
  const members = useASelector(state => state.member.members)
  const [filtered, setFiltered] = useState(keys ?? [])

  const fuse = useMemo(
    () =>
      new Fuse(Object.values(members), {keys: [{name: 'firstName', weight: 2}, 'lastName', 'club.code', 'club.type']}),
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

  const onSearch = (e: CustomEvent<InputChangeEventDetail>) => setText(e.detail.value ?? '')

  return {keys: filtered, members, text, onSearch}
}

const useMemberItem = (index: number) => {
  const history = useHistory()
  const id = useASelector(state => state.member.keys[index], [index])
  const member = useASelector(state => state.member.members[id], [id])

  const toInfo = useCallback(() => history.push(MainRouteNames.MemberInfo, {memberId: id}), [id])

  return {member, toInfo}
}

export const MembersHooks = {useMembers, useMemberItem}
