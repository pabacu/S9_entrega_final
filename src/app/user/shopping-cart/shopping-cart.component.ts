import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { WinesService } from 'src/app/services/wines.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  scList: ShoppingCart[];
  isEmpty = false;
  total = 0;
  value = 0;
  edit: string;
  spinnerVisible = false;
  orderError = false;


  constructor(private wineService: WinesService, private router: Router) { }

  ngOnInit() {
    this.edit = this.wineService.getEditOrder();

    this.scList = this.wineService.getShoppingCart();
    if (this.scList.length > 0) {
      this.isEmpty = false;
      this.calculateTotal();
    } else {
      this.isEmpty = true;
    }
  }

  onDelete(sc) {
    if (confirm('Are you sure you want to remove the product from the cart?')) {
      this.wineService.removeFromShoppingCart(sc);
      this.scList = this.wineService.getShoppingCart();
      if (this.scList.length === 0) {
        this.router.navigate(['/user/wines']);
      }
      this.calculateTotal();
    }
  }

  plusValue(wine) {
    this.wineService.addToShoppingCart(wine, 1);
    this.scList = this.wineService.getShoppingCart();
    this.calculateTotal();
  }
  reduceValue(wine) {
    this.wineService.reduceQuantityShoppingCart(wine, 1);
    this.scList = this.wineService.getShoppingCart();
    this.calculateTotal();

  }
  calculateTotal() {
    this.total = 0;
    for (const sc of this.scList) {
      this.total += sc.wine.price * sc.quantity;
    }
  }
  onClearCart() {
    if (this.edit) {
      if (confirm('Are you sure you want to clear the Cart and Cancel the order Changes')) {
        this.wineService.clearShoppingList();
        this.wineService.clearEditOrder();
        this.router.navigate(['/user/wines']);
      }
    } else {
      if (confirm('Are you sure you want to clear the Cart')) {
        this.wineService.clearShoppingList();
        this.router.navigate(['/user/wines']);
      }
    }
  }
  onConfirmOrder() {
    this.orderError = false;
    this.spinnerVisible = true;
    this.wineService.generateOrder().subscribe(
      (res) => {
        this.spinnerVisible = false;
      },
      (err) => {
        this.spinnerVisible = false;
        this.orderError = true;
      });
  }
  onModifyOrder() {
    this.wineService.modifyOrderConfirm(this.edit).subscribe(
      (res) => {
        this.spinnerVisible = false;
      },
      (err) => {
        this.spinnerVisible = false;
        this.orderError = true;
      });
  }
}
