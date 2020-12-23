import {filter, map, mapTo, mergeMap} from 'rxjs/operators'

import {TEpic} from '../../type/TEpic'
import {onError} from '../../utils/onError.util'
import {projectActions} from '../slices/project.slice'
import {TProjectState} from '../slices/root.slice'

const e: TEpic[] = []

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(projectActions.get.match),
    mergeMap(api.getProjects),
    map(({data}) => {
      const state: TProjectState = {
        keys: [],
        projects: {},
      }
      data.forEach(project => {
        state.keys.push(project._id)
        state.projects[project._id] = project
      })

      return projectActions.set(state)
    }),
    onError(state$),
  )

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(projectActions.create.match),
    map(({payload}) => payload),
    mergeMap(api.createProject),
    mapTo(projectActions.get()),
    onError(state$),
  )

export const projectEpics = e
