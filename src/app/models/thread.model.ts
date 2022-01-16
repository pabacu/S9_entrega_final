import { Message } from './message.model';

export class Thread {
    public idThread: string;
    public usermail: string;
    public type: string;
    public description: string;
    public open: boolean;
    public messages: Message[];

    constructor(idThread: string, usermail: string, type: string, description: string, open: boolean, messages: Message[] ) {
        this.idThread = idThread;
        this.usermail = usermail;
        this.type = type;
        this.description = description;
        this.open = open;
        this.messages = messages;
    }
}
