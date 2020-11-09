import {TClub} from './club.interface'

export type TUser = {
  _id: string
  sub: string
  district: string
  identification: string
  club: TClub
  birthday?: string
  profession?: string
  activity?: string
  memberId: string
  fullName: string
  prefix?: string
  firstName: string
  middleName?: string
  lastName: string
  suffix?: string
  gender: GenderEnum
  language?: string
  originalAdmissionDate?: string
  admissionDate: string
  affiliate?: string
  registered: boolean
  email: string
  secondaryEmail?: string
  countryCode?: string
  phone?: string
  addressLine1?: string
  addressLine2?: string
  addressLine3?: string
  city?: string
  state?: string
  province?: string
  country: string
  postalCode?: string
  postalStamp?: string
}

export enum GenderEnum {
  Male = 'male',
  Female = 'female',
}

export type TUserRegisterRequest = {identification: string; email: string; password: string}
