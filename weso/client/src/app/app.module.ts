import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { SendersComponent } from './chat/senders/senders.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { ItemsComponent } from './chat/senders/items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SendersComponent,
    MessagesComponent,
    ItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
