import { CathModel } from './cath.model';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http'
import { Subject} from 'rxjs/Subject';
import {MessageModel} from "./message.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:4000');

  private mess : MessageModel[] = [];
  constructor(private http: HttpClient) { }

  messageChange = new Subject<CathModel[]>();
  private messages: CathModel[] = [
    {name:'CanJustUseOneRoomIfJionIt'},

  ];

  search(nameKey, myArray) {
    for (var i=0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }

    }
  }


  joinRoom(data) {
    let resultObject = null;
    this.socket.emit('join', data);
    console.log(data.room);
    resultObject = this.search(data.room, this.messages);

    if(resultObject ==  null) {
      this.messages.push({name:data.room});
      this.messageChange.next(this.messages.slice());
    }
  }


  newUserJoined() {
    let observable = new Observable<{user:String, message:String }>(observer => {

      this.socket.on('new user joined', (data) => {
        observer.next(data);

      });
      return () => { this.socket.disconnect();};
    });
    return observable;
  }

  sendMessage(data) {
    this.socket.emit('send-message',data);
  }

  newMessageRecived(){
    let observable = new Observable<{user:String, message:String }>(observer => {

      this.socket.on('message-received', (data) => {
        observer.next(data);

      });
      return () => { this.socket.disconnect();
      };
    });
    return observable;
  }

  getChats() {
    return this.messages.slice();
  }
  getChat(index: number) {
    return this.messages[index];
  }

  addChats(message: CathModel) {
    this.messages.push(message);
    this.messageChange.next(this.messages.slice());
  }

  setChats(message: CathModel[]) {
    this.messages = message;
    this.messageChange.next(this.messages.slice());

  }
}
