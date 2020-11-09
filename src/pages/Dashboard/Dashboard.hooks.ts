import {menuController} from '@ionic/core'
import {useCallback} from 'react'

import {useASelector} from '../../utils/recipies.util'

const useDashboard = () => {
  const onMenuToggle = useCallback(() => menuController.open('first'), [])
  const user = useASelector(state => state.user.user!)

  return {onMenuToggle, user}
}

export const DashboardHooks = {useDashboard}
