import {useLocation} from 'react-router'

import {useASelector} from '../../utils/recipies.util'

const useViewProject = () => {
  const {state = {id: ''}} = useLocation<{id: string}>()
  const {id} = state
  const project = useASelector(state => state.project.projects[id], [id])

  return {project}
}

const useMember = (id: string) => {
  const member = useASelector(state => state.member.members[id], [id])

  return {member}
}

export const ViewProjectHooks = {useViewProject, useMember}
