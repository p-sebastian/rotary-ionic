export type TClub = {
  _id: string
  type: ClubTypesEnum
  name: string
  code: string
  foundedOn?: string
}

export enum ClubTypesEnum {
  Rotary = 'rotary',
  Rotaract = 'rotarac',
}
