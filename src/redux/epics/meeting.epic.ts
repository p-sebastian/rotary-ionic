import {filter, map, mapTo, mergeMap} from 'rxjs/operators'

import {TEpic} from '../../type/TEpic'
import {onError} from '../../utils/onError.util'
import {meetingActions} from '../slices/meeting.slice'
import {TMeetingState} from '../slices/root.slice'

const e: TEpic[] = []

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(meetingActions.get.match),
    mergeMap(api.getMeetings),
    map(({data}) => {
      const state: TMeetingState = {
        keys: [],
        meetings: {},
      }
      data.forEach(meeting => {
        state.keys.push(meeting._id)
        state.meetings[meeting._id] = meeting
      })

      return meetingActions.set(state)
    }),
    onError(state$),
  )

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(meetingActions.create.match),
    map(({payload}) => payload),
    mergeMap(api.createMeeting),
    mapTo(meetingActions.get()),
    onError(state$),
  )

export const meetingEpics = e
