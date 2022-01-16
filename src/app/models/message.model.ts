export class Message {
    public usermail: string;
    public date: number;
    public message: string;

    constructor(usermail: string, date: number, message: string) {
        this.usermail = usermail;
        this.date = date;
        this.message = message;
    }
}
