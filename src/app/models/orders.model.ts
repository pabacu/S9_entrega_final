import { ShoppingCart } from './shopping-cart.model';

export class Order {
    public orderId: string;
    public date: number;
    public sclOrder: ShoppingCart[];
    public status: string;

    constructor(orderId: string, date: number, sclOrder: ShoppingCart[], status: string) {
        this.orderId = orderId;
        this.date = date;
        this.sclOrder = sclOrder;
        this.status = status;
    }
}