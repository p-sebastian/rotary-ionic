export interface TRole {
  title: string
  active?: boolean
  period?: string
}

export enum RoleTitleEnum {
  RotaractPresident = 'Rotaract President',
  RotaractAdvisor = 'Rotaract Advisor',
  ClubPresident = 'Club President',
  AssistantGovernor = 'Assistant Governor',
  ClubExcecutiveSecretary = 'Club Executive Secretary/Director (Optional)',
  ClubFoundationChair = 'Club Foundation Chair',
  ClubMemberShipChair = 'Club Membership Chair',
  ClubSecretary = 'Club Secretary',
  ClubTreasurer = 'Club Treasurer',
}
