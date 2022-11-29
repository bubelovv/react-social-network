import {WsStatus} from '../../API/dialogsApi';

export interface IDialog {
    id: number,
    name: string,
    avatar: string,
}

export interface IMessage {
    message: string,
    photo: string,
    userId: number,
    userName: string,
}

export interface DialogsState {
    dialogs: IDialog[];
    messages: IMessage[];
    status: WsStatus;
}