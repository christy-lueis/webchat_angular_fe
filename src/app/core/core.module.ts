import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { ReceiveMessageComponent } from './components/receive-message/receive-message.component';


@NgModule({
  declarations: [
    SendMessageComponent,
    ReceiveMessageComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports:[
    SendMessageComponent,
    ReceiveMessageComponent
  ]
})
export class CoreModule { }
