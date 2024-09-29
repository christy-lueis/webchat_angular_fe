import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/shared/services/socket.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.component.html',
  styleUrls: ['./create-chatroom.component.scss']
})
export class CreateChatroomComponent {

  txtName: string = '';
  RoomUrl: string = '';
  newRoomid: string = '';
  constructor(private socketService: SocketService, private router: Router, private chatService: ChatService, private route: ActivatedRoute,) {
    let sub = this.route.queryParamMap.subscribe(params => {
      this.newRoomid = params.get('roomid') || '';
      if (this.newRoomid != '') {
        this.chatService.setRoomid(this.newRoomid);
        sub.unsubscribe();
      }
    });
  }
  ngOnInit() {
   
  }
  btnGenerate_click() {
    if (this.txtName != '') {
      try {
        let roomId = this.socketService.CreateRoom();
        this.chatService.setRoomURL(roomId);
        this.chatService.setRoomid(roomId);
        this.chatService.setName(this.txtName);
        this.socketService.connect('ws://test.imbt.in:4443/ASFAgentBackendConnector/socket.io');
        this.router.navigate(['/chat/chatroom'])
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.name);
          console.log(e.message);
        } else {
          console.log("Unknown error");
        }
      }
    }
  }
  btnJoin_click() {
    if (this.txtName != '') {
      try {

        this.chatService.setRoomURL(this.newRoomid);
        this.chatService.setRoomid(this.newRoomid);
        this.chatService.setName(this.txtName);
        this.socketService.connect('wss://localhost:44379/chat');
        this.router.navigate(['/chat/chatroom'])
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.name);
          console.log(e.message);
        } else {
          console.log("Unknown error");
        }
      }
    }
  }
}
