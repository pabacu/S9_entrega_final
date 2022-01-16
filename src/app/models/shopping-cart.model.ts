import { Wine } from './wine.model';

export class ShoppingCart {
    public wine: Wine;
    public quantity: number;

    constructor(wine: Wine, quantity: number) {
        this.wine = wine;
        this.quantity = quantity;
    }
}