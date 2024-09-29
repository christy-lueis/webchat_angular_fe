import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { ChatComponent } from './chat.component';
import { CreateChatroomComponent } from './components/create-chatroom/create-chatroom.component';
import { InputsComponent } from './components/inputs/inputs.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'chatroom',
        component: ChatroomComponent,
      },
      {
        path: '',
        component: CreateChatroomComponent,
      },
      {
        path: 'inputs',
        component: InputsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
