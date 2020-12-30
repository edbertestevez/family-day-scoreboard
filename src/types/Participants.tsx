export interface IParticipantKey {
  participantId: number;
}

export interface IParticipantData {
  lastName: string;
  firstName: string;
  categoryId: number | string;
  teamId?: number;
  categoryName?: string;
}

export interface IParticipant extends IParticipantKey, IParticipantData {
  leaderId?: number;
}
