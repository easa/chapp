import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

import { CathModel } from '../cath.model';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [ChatService]
})
export class MessagesComponent implements OnInit {
  message: CathModel;
  id: number;
  messageText: string;
  user: string;
  room: string;

  messagesz: Array<any>;
  messageArray: Array<{user:String, message:String}> = [];

  io = io({transports: ['io'], upgrade: false});

  constructor(private ChatService: ChatService, private route: ActivatedRoute, private router: Router) {

    this.ChatService.newUserJoined().subscribe(
      data => { this.messageArray.push(data);
      }
    );

    this.ChatService.newMessageRecived().subscribe(
      data => {this.messageArray.push(data)}
    )
  }
  join() {
    this.ChatService.joinRoom({user: this.user, room: this.room});
  }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.message = this.ChatService.getChat(this.id);
      }
    );

  }

  sendMessage() {
    this.ChatService.sendMessage({user: this.user, room:this.room,message: this.messageText});
    this.messageText = '';

  }


}
