import {TClub} from './club.interface'
import {TUser} from './user.interface'

export interface TMeeting {
  _id: string
  club: string | TClub
  members: Array<TUser | string>
  name: string
  startDate: string
  duration: number
  createdBy: TUser | string
}

export type TMeetingCreate = Pick<TMeeting, 'name' | 'duration' | 'members' | 'startDate'>
