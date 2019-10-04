import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MessagesComponent} from './chat/messages/messages.component';
import {ChatComponent} from './chat/chat.component';


const routes: Routes = [
  {path: 'chat', loadChildren: './chat/cath.model#CathModel'},
  {path: 'message', component: ChatComponent },
  {path: ':id', component: MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
