export interface IParticipant {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

export interface IPool {
  id: string;
  code: string;
  title: string;
  ownerId: string;
  createdAt: string;
  owner: {
    name: string;
  };
  participants: IParticipant[];
  _count: {
    participants: number;
  };
}
