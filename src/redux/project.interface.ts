import {TClub} from './club.interface'

export type TProject = {
  _id: string
  name: string
  startDate: string
  endDate: string
  club: string | TClub
  members: string[]
  benefactorAmount: number
  budget: number
  amountGathered: number
  duration: number
  volunteerHours: number
  numberOfVolunteers: number
  otherInstructions?: string
}
