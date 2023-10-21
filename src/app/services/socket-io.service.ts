import { Injectable } from '@angular/core';
import * as io from "socket.io-client"
import {Observable} from "rxjs";

const backendUrl: string = "https://localhost:8443"
@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private clientSocket: SocketIOClient.Socket
  constructor() {
    this.clientSocket = io.connect(backendUrl)
  }

  listen_to_server(ev: string): Observable<any>{
    return new Observable((subscribe) => {
      this.clientSocket.on(ev, (data: any) =>{
        subscribe.next(data)
      })
    })
  }

  emit_to_server(ev: string, data: any): void{
    this.clientSocket.emit(ev, data)
  }
}
