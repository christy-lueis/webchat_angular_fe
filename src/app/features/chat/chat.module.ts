import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { CoreModule } from 'src/app/core/core.module';
import { ChatComponent } from './chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateChatroomComponent } from './components/create-chatroom/create-chatroom.component';
import { InputsComponent } from './components/inputs/inputs.component';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    ChatroomComponent,
    ChatComponent,
    CreateChatroomComponent,
    InputsComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    CoreModule,
    SharedModule
    

  ]
})
export class ChatModule { }
