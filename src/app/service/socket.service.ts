import { Injectable } from '@angular/core';
import { io, Socket} from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // socket service variable
  private socket: Socket;

  constructor() { }

    // initialise socket service
    initSocket(){
      this.socket = io('http://localhost:3000');
      return()=>{this.socket.disconnect();}
    }
  
    // send the message
    send(data: any){
      this.socket.emit('message', data);
    }
  
    // get the new message
    getMessage(){
      return new Observable((observer)=>{
        this.socket.on('message', (data)=>{
          observer.next(data)});
      });
    }

    // send the leave chat notification
    sendLeft(data: any){
      this.socket.emit('left', data);
    }

    // get the leave chat notification
    getLeftMessage(){
      return new Observable((observer)=>{
        this.socket.on('left', (data)=>{
          observer.next(data)});
      });
    }
  
}
