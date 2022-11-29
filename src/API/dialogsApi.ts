import {IMessage} from '../store/dialogs/types';

export type WsStatus = 'pending' | 'ready' | 'error'
export type EventsType = 'message-received' | 'status-changed'
export type MessageReceivedSubscriberType = (messages: IMessage[]) => void
export type StatusChangedSubscriberType = (status: WsStatus) => void

const subscribers = {
    'message-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
};

let wsChat: WebSocket;

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
};

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessages));
};

const closeHandler = () => {
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
};

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
};

const cleanUp = () => {
    wsChat?.removeEventListener('open', openHandler);
    wsChat?.removeEventListener('message', messageHandler);
    wsChat?.removeEventListener('close', closeHandler);
    wsChat?.removeEventListener('error', errorHandler);
    wsChat?.close();
};

const notifySubscribersAboutStatus = (status: WsStatus) => {
    subscribers['status-changed'].forEach(subscriber => subscriber(status));
};

const createChannel = () => {
    cleanUp();
    wsChat = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    wsChat.addEventListener('open', openHandler);
    wsChat.addEventListener('message', messageHandler);
    wsChat.addEventListener('close', closeHandler);
    wsChat.addEventListener('error', errorHandler);
};

export const dialogsApi = {
    async start() {
        createChannel();
    },
    async stop() {
        subscribers['message-received'] = [];
        cleanUp();
    },
    async subscribe(event: EventsType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event].push(callback);
    },
    async unsubscribe(event: EventsType, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callback);
    },
    async sendMessage(message: string) {
        wsChat.send(message);
    },
};