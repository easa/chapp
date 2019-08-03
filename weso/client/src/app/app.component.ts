///<reference path="../../node_modules/@angular/core/core.d.ts"/>
import { Component ,OnInit ,ViewChild ,ElementRef} from '@angular/core';
import io from "socket.io-client";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



   private context: any;
  // private io: any;
  //  io = io();
  io = io({transports: ['io'], upgrade: false});

  messageText: string;
  messages:Array<any>;
  sender:string;

  public ngOnInit() {
    this.io = io("http://localhost:3000");
    this.messages = new Array();

    this.io.on('message-received', (msg: any) => {
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
    });
  }

  sendMessage() {
    const message = {
      text: this.messageText,
      sender:this.user
    };
    this.io.emit('send-message', message);
    this.messageText = '';
  }

}

