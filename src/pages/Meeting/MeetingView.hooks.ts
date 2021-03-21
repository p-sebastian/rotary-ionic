import {useLocation} from 'react-router'

import {useASelector} from '../../utils/recipies.util'

const useMeetingView = () => {
  const {state = {id: ''}} = useLocation<{id: string}>()
  const {id} = state
  const meeting = useASelector(state => state.meeting.meetings[id], [id])

  return {meeting}
}

const useMember = (id: string) => {
  const member = useASelector(state => state.member.members[id], [id])

  return {member}
}

export const MeetingViewHooks = {useMeetingView, useMember}
