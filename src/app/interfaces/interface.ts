export interface IConversation {
  id: string;
  name: string;
  mutations: any;
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
  isFavorite?: boolean;
}

export interface IResponse {
  message: null | string | IUser[] | IConversation | IConversation[];
  ok: boolean;
}

export interface ITypesOfConversations {
  favoriteConversations: IConversation[];
  unfavoriteConversations: IConversation[];
}
