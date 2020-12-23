import {filter, map, mergeMap} from 'rxjs/operators'

import {TEpic} from '../../type/TEpic'
import {onError} from '../../utils/onError.util'
import {clubActions} from '../slices/club.slice'
import {TClubState} from '../slices/root.slice'

const e: TEpic[] = []

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(clubActions.get.match),
    mergeMap(api.getClubs),
    map(({data}) => {
      const state: TClubState = {
        keys: [],
        clubs: {},
      }
      data.forEach(club => {
        state.keys.push(club._id)
        state.clubs[club._id] = club
      })

      return clubActions.set(state)
    }),
    onError(state$),
  )

export const clubEpics = e
