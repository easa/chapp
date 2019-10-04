import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { CathModel } from '../cath.model';
import {ChatService} from '../chat.service';
import {ShChatModel} from '../../shared/ShChat.model';

@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css']
})
export class SendersComponent implements OnInit, OnDestroy {
  messages: CathModel[];
  subscription: Subscription;
  constructor(private CahtService: ChatService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.CahtService.messageChange.subscribe(
      (messages: CathModel[]) => {
        this.messages = messages;
      }
    );
    this.messages = this.CahtService.getChats();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
