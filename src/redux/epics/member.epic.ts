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
      const state: TMembersState = {
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

export const memberEpics = e
