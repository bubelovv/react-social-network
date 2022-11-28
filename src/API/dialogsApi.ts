import {IMessage} from '../store/dialogs/types';

type SubscriberType = (messages: IMessage[]) => void

let subscribers = [] as SubscriberType[];
let wsChat: WebSocket;

const closeHandler = () => {
    console.log('close ws');
    setTimeout(createChannel, 3000);
};

const createChannel = () => {
    wsChat?.removeEventListener('close', closeHandler);
    wsChat?.close();
    wsChat = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    wsChat.addEventListener('close', closeHandler);
    wsChat.addEventListener('message', messageHandler);
};

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages));
};

export const dialogsApi = {
    async start() {
        createChannel();
    },
    async stop() {
        wsChat?.close();
        subscribers = [];
        wsChat.removeEventListener('message', messageHandler);
        wsChat?.removeEventListener('close', closeHandler);
    },
    async subscribe(callback: SubscriberType) {
        subscribers.push(callback);
    },
    async unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback);
    },
    async sendMessage(message: string) {
        wsChat.send(message);
    },
};