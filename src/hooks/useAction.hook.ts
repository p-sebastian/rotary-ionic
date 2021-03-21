import {useCallback} from 'react'
import {useDispatch} from 'react-redux'

import {authActions} from '../redux/slices/auth.slice'
import {clubActions} from '../redux/slices/club.slice'
import {meetingActions} from '../redux/slices/meeting.slice'
import {memberActions} from '../redux/slices/member.slice'
import {projectActions} from '../redux/slices/project.slice'
import {userActions} from '../redux/slices/user.slice'

/*
 * ** Usage **
 * const useAction = makeHook(authActions)
 * const action = useAction('confirmSignUp')
 */
function makeActionHook<T>(actions: T) {
  return <A extends keyof T>(action: A, isNull = false): T[A] => {
    const dispatch = useDispatch()
    const act = actions[action] as any
    const callback = isNull ? () => dispatch(act()) : (payload: any) => dispatch(act(payload))
    return useCallback(callback, []) as any
  }
}

export const useAuthAction = makeActionHook(authActions)
export const useUserAction = makeActionHook(userActions)
export const useMemberAction = makeActionHook(memberActions)
export const useClubAction = makeActionHook(clubActions)
export const useProjectAction = makeActionHook(projectActions)
export const useMeetingAction = makeActionHook(meetingActions)
