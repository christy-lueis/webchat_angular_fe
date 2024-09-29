import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-receive-message',
  templateUrl: './receive-message.component.html',
  styleUrls: ['./receive-message.component.scss']
})
export class ReceiveMessageComponent {

  @Input() labelValue:string='';
  @Input() clientName:string='';
}
