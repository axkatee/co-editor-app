export interface IConversation {
  id: string;
  name: string;
  mutations: string;
  author: IUser;
  contributors?: IUser[];
  text?: string;
  isFavorite: boolean;
}

export interface IDialogData {
  conversation: IConversation;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  countOfMutations?: number;
}

export interface IMutation {
  userId: string;
  countOfMutations: number;
}

export interface IResponse {
  ok: boolean;
  message: any;
}
