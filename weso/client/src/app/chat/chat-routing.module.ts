import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatComponent} from './chat.component';
import {MessagesComponent} from './messages/messages.component';


const chatsRoutes: Routes = [
  {path: '', component: ChatComponent, children: [
    {path: ':id', component: MessagesComponent}
  ]}
];
@NgModule({
  imports: [
    RouterModule.forChild(chatsRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class ChatRoutingModule { }
