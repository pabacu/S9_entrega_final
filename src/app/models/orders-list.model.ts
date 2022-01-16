import { ShoppingCart } from './shopping-cart.model';

export class OrdersList {
    public userId: string;
    public orderId: string;
    public date: number;
    public sclOrder: ShoppingCart[];
    public status: string;

    constructor(userId: string, orderId: string, date: number, sclOrder: ShoppingCart[], status: string) {
        this.userId = userId;
        this.orderId = orderId;
        this.date = date;
        this.sclOrder = sclOrder;
        this.status = status;
    }
}
