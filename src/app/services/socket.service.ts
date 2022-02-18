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
    this.socket = io(environment.apiUrl)

    this.socket.on('setDataToConversations', (data: IConversation[]) => {
      this.projectService.conversations$.next(data);
    });
  }

  setSocketInfo(id: string): void {
    this.socket.emit('setUserSocketInfo', id);
  }

  removeUserSocketInfo(): void {
    this.socket.emit('removeUserSocketInfo');
  }
}
