import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  Name: string = '';
  /**
   * 
   * @param Name set and get client name
   */
  setName(Name: string) {
    this.Name = Name
  }
  getName() {
    return this.Name;
  }

  Clientid: string = '';
  /**
   * 
   * @param Clientid set and get Client id
   */
  setClientid(Clientid: string) {
    this.Clientid = Clientid
  }
  getClientid() {
    return this.Clientid;
  }

  Roomid: string = '';
  /**
   * 
   * @param Roomid set and get roomid 
   */
  setRoomid(Roomid: string) {
    this.Roomid = Roomid
  }
  getRoomid() {
    return this.Roomid;
  }

 private RoomURL: string = '';
  /**
   * 
   * @param RoomURL set and get RoomURL 
   */
  setRoomURL(RoomURL: string) {
    this.RoomURL = '';
    let urlstring: string = 'http://localhost:4200/chat?roomid='
    this.RoomURL = urlstring + RoomURL
  }
  getRoomURL() {
    return this.RoomURL;
  }
}
