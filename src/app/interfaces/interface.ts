export interface IConversation {
  id: string;
  name: string;
  edited_by: string;
  author?: string;
  contributors?: string;
  text?: string;
}

export interface IDialogData {
  conversation: IConversation;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IResponse {
  ok: boolean;
  message: any;
}
