import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ProjectService } from "./project.service";
import { environment } from "../../environments/environment";
import { IConversation } from "../interfaces/interface";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: Socket;

  constructor(
    private projectService: ProjectService) {
    this.socket = io(environment.apiUrl);

    this.socket.on('setDataAboutConversation', (conversation: IConversation) => {
      this.projectService.conversation$.next(conversation);
    });
    this.socket.on('deleteConversation', (conversationId: string) => {
      this.projectService.deletedConversationId$.next(conversationId);
    });
  }
}
