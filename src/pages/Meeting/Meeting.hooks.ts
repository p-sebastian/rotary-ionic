import {useCallback, useEffect} from 'react'
import {useHistory} from 'react-router'

import {useMeetingAction} from '../../hooks/useAction.hook'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useMeeting = () => {
  const history = useHistory()
  const action = useMeetingAction('get')
  const keys = useASelector(state => state.meeting.keys)
  const canCreate = useASelector(state => !!state.user?.user?.role)

  const toCreate = useCallback(() => history.push(MainRouteNames.MeetingsCreate), [])

  useEffect(() => {
    action()
  }, [])

  return {toCreate, keys, canCreate}
}

const useMeetingItem = (id: string) => {
  const meeting = useASelector(state => state.meeting.meetings[id], [id])
  const history = useHistory()
  const toView = useCallback(() => history.push(MainRouteNames.MeetingsView, {id}), [id])

  return {meeting, toView}
}

export const MeetingHooks = {useMeeting, useMeetingItem}
