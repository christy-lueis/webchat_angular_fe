import { Injectable } from '@angular/core';
import { Actiontype, Connectiontype, MessageTransfer, MessagetoSocket } from '../models/socketDS';
import { ChatService } from 'src/app/features/chat/services/chat.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private chatService:ChatService) { }

  private socket: WebSocket
  newRoomid: string = '';
  characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';


  chatMessageSubject=new Subject<string>();
  elementSubject=new Subject<string>();
  clickSubject=new Subject<string>();

  /**
   * 
   * @param length 
   * @returns random string with length given
   */
  generateString(length) {
    let result = ' ';
    const charactersLength = this.characters.length;
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result+='-';
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    result+='-';
    for (let i = 0; i < length; i++) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  CreateRoom()
  {
    let roomid=this.generateString(8);
    return roomid;
  }
  

   public connect(url: string): void {
    this.socket = new WebSocket('wss://localhost:44379/chat');

    /**
     * Execeutes when message is send
     */
    this.socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
      try {
        let objmessagetoSocket: MessagetoSocket = JSON.parse(event.data);
        if(objmessagetoSocket.connectiontype==Connectiontype.connect)
        {
          if(objmessagetoSocket.message.actiontype==Actiontype.chat)
          {
            this.setchatSettings(objmessagetoSocket)
          }
        }
        else if(objmessagetoSocket.connectiontype==Connectiontype.open)
        {
          if(objmessagetoSocket.message.actiontype==Actiontype.chat)
          {
            console.log('objmessagetoSocket.message',objmessagetoSocket.message);
            
            this.chatMessageSubject.next(objmessagetoSocket.message.strData||'Message cannot be Displayed')
          }
          if(objmessagetoSocket.message.actiontype==Actiontype.expander )
          {
            console.log('objmessagetoSocket.message',objmessagetoSocket.message);
            
            this.elementSubject.next(objmessagetoSocket.message.strData||'Message cannot be Displayed')
          }
          if(objmessagetoSocket.message.actiontype==Actiontype.click)
          {
            console.log('objmessagetoSocket.message',objmessagetoSocket.message);
            
            this.clickSubject.next(objmessagetoSocket.message.strData||'Message cannot be Displayed')
          }
        }
        console.log('objmessagetoSocket.clientid', objmessagetoSocket.clientid);
      }
      catch(e)
      {
        if (e instanceof Error) {
          console.log(e.name); 
          console.log(e.message); 
        } else {
          console.log("Unknown error"); 
        }
      }
    };

    /**
     * executes when Connected
     */
    this.socket.onopen = (event) => {
      console.log('Connected to server', event);
      let dataTransfer:MessageTransfer={
        actiontype: Actiontype.input,
        strData: ''
      }
      let obmessagetoSocket: MessagetoSocket = {
        roomid: this.chatService.getRoomid().toString(),
        clientid: '',
        message: dataTransfer,
        connectiontype: Connectiontype.connect
      }
      this.sendMessage(JSON.stringify(obmessagetoSocket));
    };

    /**
     * executes when client get disconnected
     */
    this.socket.onclose = (event) => {
      console.log('Disconnected from server', event);
    };
  }

  /**
   * 
   * @param message Method to send message from socket
   */
  public sendMessage(message: string): void {
    this.socket.send(message);
  }


  /**
   * For setting chat clientid ,Room id etc
   * @param objmessagetoSocket 
   */
  setchatSettings(objmessagetoSocket: MessagetoSocket)
  {
    this.chatService.setClientid(objmessagetoSocket.clientid);
    this.chatService.setRoomid(objmessagetoSocket.roomid);
  }
}
