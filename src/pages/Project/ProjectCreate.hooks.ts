import {InputChangeEventDetail} from '@ionic/core'
import {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router'

import {useMemberAction, useProjectAction} from '../../hooks/useAction.hook'
import {TProject} from '../../redux/project.interface'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useProjectCreate = () => {
  const [data, setData] = useState<TProject>(initialProject)
  const clubs = useASelector(state => state.club)
  const selectedMembers = useASelector(state => state.member.selected)
  const users = useASelector(state => state.member.members)
  const clear = useMemberAction('clearFilter')
  const clearSelected = useMemberAction('clearSelected')
  const select = useMemberAction('select')
  const history = useHistory()
  const create = useProjectAction('create')

  const onChange = (key: keyof TProject) => (e: CustomEvent<InputChangeEventDetail>) =>
    setData({...data, [key]: e.detail.value})

  const onMember = useCallback(() => history.push(MainRouteNames.SelectableMember, {clubId: data.club}), [data.club])

  const remove = useCallback((key: string) => () => select({key, enabled: false}), [])
  const selected = Object.keys(selectedMembers).filter(x => selectedMembers[x])
  const invalid = validate(selected)

  useEffect(() => {
    clearSelected()
  }, [data.club])

  const onSubmit = () => {
    const project = {...data}
    project.members = [...selected]
    project.benefactorAmount = Number(project.benefactorAmount)
    project.budget = Number(project.budget)
    project.amountGathered = Number(project.amountGathered)
    project.volunteerHours = Number(project.volunteerHours)
    project.numberOfVolunteers = Number(project.numberOfVolunteers)
    create(project)
    clear()
    clearSelected()
    history.goBack()
  }

  useEffect(() => {
    return () => {
      clearSelected()
      clear()
    }
  }, [])

  return {onChange, data, onSubmit, clubs, onMember, selected, remove, users, invalid}

  function validate(s: string[] = []) {
    const {club, name, startDate, endDate} = data
    return !club || s.length === 0 || !name.trim() || !startDate || !endDate
  }
}

export const ProjectCreateHooks = {useProjectCreate}
const initialProject: TProject = {
  _id: '',
  name: '',
  club: '',
  budget: 0,
  endDate: '',
  members: [],
  duration: 0,
  startDate: '',
  amountGathered: 0,
  volunteerHours: 0,
  benefactorAmount: 0,
  numberOfVolunteers: 0,
  otherInstructions: '',
}
