export interface IDialog {
    id: number,
    name: string,
    avatar: string,
}

export interface IMessage {
    id: number,
    name: string,
    message: string,
}

export interface DialogsState {
    dialogs: IDialog[];
    messages: IMessage[];
}