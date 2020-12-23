import {filter, map, mergeMap} from 'rxjs/operators'

import {TEpic} from '../../type/TEpic'
import {onError} from '../../utils/onError.util'
import {memberActions} from '../slices/member.slice'
import {TMembersState} from '../slices/root.slice'

const e: TEpic[] = []

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(memberActions.get.match),
    mergeMap(api.getMembers),
    map(({data}) => {
      const state: Pick<TMembersState, 'keys' | 'members'> = {
        keys: [],
        members: {},
      }
      data.forEach(member => {
        state.keys.push(member._id)
        state.members[member._id] = member
      })

      return memberActions.set(state)
    }),
    onError(state$),
  )

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(memberActions.fiterBy.match),
    map(({payload}) => payload),
    mergeMap(api.filterMembers),
    map(({data}) => memberActions.filtered(data)),
    onError(state$),
  )

export const memberEpics = e
