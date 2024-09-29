export interface MessagetoSocket {
    roomid: string;
    clientid: string;
    message: MessageTransfer;
    connectiontype: Connectiontype;
  }
  export interface MessageTransfer {
    actiontype: Actiontype;
    strData: string;
  }
  export enum Actiontype {
    input = 0,
    navigate = 1,
    expander = 2,
    chat = 3,
    click = 4,
  }
  export enum Connectiontype {
    connect = 0,
    open = 1
  }