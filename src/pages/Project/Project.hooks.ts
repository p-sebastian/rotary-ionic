import {useCallback, useEffect} from 'react'
import {useHistory} from 'react-router'

import {useMemberAction, useProjectAction} from '../../hooks/useAction.hook'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useProject = () => {
  const history = useHistory()
  const action = useProjectAction('get')
  const getMembers = useMemberAction('get')
  const keys = useASelector(state => state.project.keys)

  const toCreate = useCallback(() => history.push(MainRouteNames.ProjectCreate), [])

  useEffect(() => {
    action()
    getMembers()
  }, [])

  return {toCreate, keys}
}

const useProjectItem = (id: string) => {
  const project = useASelector(state => state.project.projects[id], [id])
  const history = useHistory()
  const toView = useCallback(() => history.push(MainRouteNames.ViewProject, {id}), [id])

  return {project, toView}
}

export const ProjectHooks = {useProject, useProjectItem}
