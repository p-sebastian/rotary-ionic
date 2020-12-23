import {menuController} from '@ionic/core'
import {useCallback} from 'react'
import {useHistory} from 'react-router'

import {ButtonEnum} from '../../utils/constants.util'
import {useASelector} from '../../utils/recipies.util'
import {MainRouteNames} from '../Route.names'

const useDashboard = () => {
  const onMenuToggle = useCallback(() => menuController.open('first'), [])
  const user = useASelector(state => state.user.user!)

  return {onMenuToggle, user}
}

const useNav = () => {
  const history = useHistory()

  const navigate = useCallback(
    (where: ButtonEnum) => () => {
      switch (where) {
        case ButtonEnum.Socios:
          history.push(MainRouteNames.Members)
          break
        case ButtonEnum.Meetings:
          history.push(MainRouteNames.Meetings)
          break
        case ButtonEnum.Projects:
          history.push(MainRouteNames.Projects)
          break
        case ButtonEnum.Publications:
          history.push(MainRouteNames.Publications)
          break
      }
    },
    [],
  )

  return {navigate}
}

export const DashboardHooks = {useDashboard, useNav}
