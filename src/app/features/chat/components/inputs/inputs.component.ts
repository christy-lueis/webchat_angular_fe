import { Component, ElementRef, HostListener, Inject, Renderer2, ViewChild } from '@angular/core';
import { SocketService } from 'src/app/shared/services/socket.service';
import { ChatService } from '../../services/chat.service';
import { MessageTransfer, Actiontype, MessagetoSocket, Connectiontype } from 'src/app/shared/models/socketDS';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent {
  @ViewChild('myDiv') myDiv: ElementRef;
  left: number = 0;
  top: number = 0;
  constructor(private socketService: SocketService, private chatService: ChatService, @Inject(DOCUMENT) document: Document, private router: Router) {
    let roomid = this.chatService.getRoomid();
    if (roomid == null || roomid == '') {
      router.navigate(['/chat'])
    }
  }
  ngOnInit() {

    this.socketService.elementSubject.subscribe(data => {

      let elementer: eLement = JSON.parse(data)
      console.log('send element.id', elementer.id);
      const {
        top: t,
        left: l
      } = document.getElementById(elementer.id).getBoundingClientRect();
      const {
        scrollX,
        scrollY
      } = window
      const topPos = t + scrollX
      const leftPos = l + scrollY


      this.left = leftPos + elementer.x;
      this.top = topPos + elementer.y;

    })
    this.socketService.clickSubject.subscribe(data => {
      console.log('receive', data);
      let eleclick: clickelement = JSON.parse(data);
       var elements= document.getElementsByTagName(eleclick.tag);

      // Find elements by class name
      var classElements = [];
      for (var i = 0; i < elements.length; i++) {
        if (elements[i].className === eleclick.class) {
          classElements.push(elements[i]);
        }
      }

      // Find an element by ID
      var myElement;
      if(eleclick.id)
      {
      for (var i = 0; i < classElements.length; i++) {
        if (classElements[i].id === eleclick.id) {
          myElement = classElements[i];
          break;
        }
      }
      myElement.click();
    }
else{
  for (let i = 0; i < classElements.length; i++) {
    classElements[i].click();
    
  }
  
}
      // Simulate a click on an element
     




    })
  }
  selected: string = '';
  selected1: string = '';
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const element = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
    // console.log('send element.id', element.id);
    var rect = element.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    let elemt = document.elementFromPoint(event.clientX, event.clientY);
    let ele: eLement = {
      id: element.id,
      x: x,
      y: y
    }
    let dataTransfer: MessageTransfer = {
      actiontype: Actiontype.expander,
      strData: JSON.stringify(ele)
    };
    let obmessagetoSocket: MessagetoSocket = {
      roomid: this.chatService.getRoomid(),
      clientid: this.chatService.getClientid(),
      message: dataTransfer,
      connectiontype: Connectiontype.open
    }
    //console.log('sending', obmessagetoSocket);

    // this.socketService.sendMessage(JSON.stringify(obmessagetoSocket));
  }

  @HostListener('document:mousedown', ['$event'])
  onClick(event: MouseEvent) {

    if (event.which === undefined) {
      console.log("The click was triggered by code.");
    } else {
      console.log("The click was triggered by the mouse.");

      const element = event.target as HTMLElement;
      console.log('element', element);
      console.log('element.id', element.className);
      let eleclick: clickelement = {
        id: element.id,
        class: element.className,
        tag: element.tagName
      }
      let dataTransfer: MessageTransfer = {
        actiontype: Actiontype.click,
        strData: JSON.stringify(eleclick)
      };
      let obmessagetoSocket: MessagetoSocket = {
        roomid: this.chatService.getRoomid(),
        clientid: this.chatService.getClientid(),
        message: dataTransfer,
        connectiontype: Connectiontype.open
      }
      //console.log('sending', obmessagetoSocket);

      this.socketService.sendMessage(JSON.stringify(obmessagetoSocket));

    }
  }
}
interface eLement {
  id: string;
  x: number;
  y: number;
}

interface clickelement {
  id: string;
  class: string;
  tag: string;

}