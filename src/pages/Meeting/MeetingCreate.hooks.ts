import {InputChangeEventDetail} from '@ionic/core'
import {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router'

import {useMeetingAction, useMemberAction} from '../../hooks/useAction.hook'
import {TMeeting, TMeetingCreate} from '../../redux/meeting.interface'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useMeetingCreate = () => {
  const [data, setData] = useState<TMeetingCreate>(initialMeeting)
  const selectedMembers = useASelector(state => state.member.selected)
  const club = useASelector(state => state.user.user?.club)

  const clear = useMemberAction('clearFilter')
  const users = useASelector(state => state.member.members)
  const clearSelected = useMemberAction('clearSelected')
  const select = useMemberAction('select')
  const history = useHistory()
  const create = useMeetingAction('create')

  const remove = useCallback((key: string) => () => select({key, enabled: false}), [])
  const onMember = useCallback(() => history.push(MainRouteNames.SelectableMember, {clubId: club?._id}), [club])
  const selected = Object.keys(selectedMembers).filter(x => selectedMembers[x])
  const onChange = (key: keyof TMeeting) => (e: CustomEvent<InputChangeEventDetail>) =>
    setData({...data, [key]: e.detail.value})

  const invalid = !validate()

  const onSubmit = () => {
    create({...data, members: selected, duration: Number(data.duration)})
    history.goBack()
  }

  useEffect(() => {
    return () => {
      clearSelected()
      clear()
    }
  }, [])

  return {data, selected, remove, users, invalid, onMember, onSubmit, onChange, club: club!}

  function validate() {
    const {name, startDate, duration} = data
    return selected.length > 0 && !!name.trim() && !!startDate.trim() && !isNaN(duration) && duration > 0
  }
}

export const MeetingCreateHooks = {useMeetingCreate}

const initialMeeting: TMeetingCreate = {
  name: '',
  duration: 1,
  members: [],
  startDate: '',
}
