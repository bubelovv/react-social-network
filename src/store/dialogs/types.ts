import {WsStatus} from '../../API/dialogsApi';

export interface IDialog {
    id: number,
    name: string,
    avatar: string,
}

export interface IMessageAPI {
    message: string,
    photo: string | null,
    userId: number,
    userName: string,
}

export interface IMessage extends IMessageAPI {
    id: string,
}

export interface DialogsState {
    dialogs: IDialog[];
    messages: IMessage[];
    status: WsStatus;
}