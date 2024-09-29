import { Component } from '@angular/core';
import { Actiontype, Connectiontype, MessageTransfer, MessagetoSocket } from 'src/app/shared/models/socketDS';
import { SocketService } from 'src/app/shared/services/socket.service';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {
  Messages: string[] = [];
  RoomUrl: string = '';
  chatMessages: ChatRoommessage[] = [];
  txtchat: string = '';
  constructor(private socketService: SocketService, private chatService: ChatService, private router: Router) {
    // this.socketService.connect('wss://localhost:44379/chat')
    let roomid = this.chatService.getRoomid();
    if (roomid == null || roomid == '') {
      router.navigate(['/chat'])
    }
  }
  ngOnInit() {
    this.RoomUrl = this.chatService.getRoomURL();
    this.socketService.chatMessageSubject.subscribe(data => {
      let chatmessage: Chatmessage = JSON.parse(data)
      let chatMessages: ChatRoommessage = {
        name: chatmessage.name,
        myMessage: false,
        message: chatmessage.message
      }
      this.chatMessages.push(chatMessages);
      var audio = new Audio('assets/audio/short_sms_tone.mp3');
    audio.play();
    })
  }


  btnSend_click() {
    if (this.txtchat != '') {
      let chatmessage: Chatmessage = {
        message: this.txtchat,
        name: this.chatService.getName()
      }
      let dataTransfer: MessageTransfer = {
        actiontype: Actiontype.chat,
        strData: JSON.stringify(chatmessage)
      };
      let obmessagetoSocket: MessagetoSocket = {
        roomid: this.chatService.getRoomid(),
        clientid: this.chatService.getClientid(),
        message: dataTransfer,
        connectiontype: Connectiontype.open
      }
      console.log('sending', obmessagetoSocket);
      let chatMessages: ChatRoommessage = {
        name: chatmessage.name,
        myMessage: true,
        message: chatmessage.message
      }
      this.chatMessages.push(chatMessages)
      this.txtchat = '';
      this.socketService.sendMessage(JSON.stringify(obmessagetoSocket));
    }
  }
}
interface Chatmessage {
  name: string;
  message: string;
}
interface ChatRoommessage {
  name: string;
  myMessage: boolean
  message: string;
}