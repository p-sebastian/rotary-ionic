import {cashOutline, clipboardOutline, ribbonOutline} from 'ionicons/icons'
import {DateTime} from 'luxon'

import {RoleTitleEnum, TRole} from '../redux/role.interface'

export const parseDate = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY as any)
}

export const checkRole = (role?: TRole) => {
  if (!role) {
    return null
  }
  if (president()) {
    return ribbonOutline
  }

  if (secretary()) {
    return clipboardOutline
  }

  if (RoleTitleEnum.ClubTreasurer === role.title) {
    return cashOutline
  }

  return null

  function president() {
    return [RoleTitleEnum.RotaractPresident, RoleTitleEnum.ClubPresident].some(x => x === role?.title)
  }
  function secretary() {
    return [RoleTitleEnum.RotaractAdvisor, RoleTitleEnum.ClubSecretary, RoleTitleEnum.ClubExcecutiveSecretary].some(
      x => x === role?.title,
    )
  }
}
