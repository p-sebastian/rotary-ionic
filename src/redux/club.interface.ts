export type TClub = {
  _id: string
  type: ClubTypesEnum
  name: string
}

export enum ClubTypesEnum {
  Rotary = 'rotary',
  Rotaract = 'rotarac',
}
