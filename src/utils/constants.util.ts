import {checkboxOutline, documentTextOutline, newspaperOutline, peopleCircleOutline} from 'ionicons/icons'

import {MainRouteNames} from '../pages/Route.names'

export enum ButtonEnum {
  Socios,
  Meetings,
  Projects,
  Publications,
}
export const BUTTONS: TButton[] = [
  {
    key: ButtonEnum.Socios,
    label: 'Socios',
    icon: peopleCircleOutline,
    screen: MainRouteNames.Members,
  },
  {
    key: ButtonEnum.Meetings,
    label: 'Reuniones',
    icon: checkboxOutline,
    screen: MainRouteNames.Meetings,
  },
  {
    key: ButtonEnum.Projects,
    label: 'Proyectos',
    icon: documentTextOutline,
    screen: MainRouteNames.Projects,
  },
  {
    key: ButtonEnum.Publications,
    label: 'Publicaciones',
    icon: newspaperOutline,
    screen: MainRouteNames.Publications,
  },
]

type TButton = {
  key: ButtonEnum
  icon: any
  label: string
  screen: MainRouteNames
}
