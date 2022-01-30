import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/orders.model';
import { AuthService } from 'src/app/services/auth.service';
import { WinesService } from 'src/app/services/wines.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  orders: Order[];
  username: string;
  details = false;
  clickedBtn: string;
  orderDetail: Order;
  detailTotal: number;
  detailProgress = 0;
  spinnerVisible = true;
  @ViewChild('detailOrder') private myScrollContainer: ElementRef;

  constructor(private auths: AuthService, private wineService: WinesService, private router: Router) { }

  ngOnInit() {
    this.username = this.auths.getUserName();
    this.wineService.obtainOrders(this.username)
      .subscribe(
      (response: any[]) => { this.orders = response; this.spinnerVisible = false; },
      (error: any) => { console.log(error); }
      );
  }

  onDetails(orderClicked: string) {
    this.orderDetail = this.orders.find(order => order.orderId === orderClicked);
    this.calculateDetailTotal();
    this.calculateDetailProgress()
    if (this.clickedBtn === orderClicked) {
      this.clickedBtn = '';
      this.details = false;
    } else {
      this.clickedBtn = orderClicked;
      this.details = true;
      const element = document.querySelector('#detailOrder');

      if (element) {
        //this.scrollToElement(element);
        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
    }
  }

  onClickedButton(orderId) {
    if (this.clickedBtn === orderId) {
      return 'bi bi-arrow-up';
    } else {
      return 'bi bi-arrow-down';
    }
  }
  onClassActive(orderId) {
    if (this.clickedBtn === orderId) {
      return 'active';
    } else {
      return null;
    }
  }

  calculateDetailTotal() {
    if (this.orderDetail) {
      this.detailTotal = 0;
      for (const sc of this.orderDetail.sclOrder) {
        this.detailTotal += sc.quantity * sc.wine.price;
      }
    }
  }

  calculateDetailProgress() {
    switch (this.orderDetail.status) {
      case 'waiting for approve': {
        this.detailProgress = 100 / 6;
        break;
      }
      case 'Approved': {
        this.detailProgress = 2 * 100 / 6;
        break;
      }
      case 'Paid': {
        this.detailProgress = 3 * 100 / 6;
        break;
      }
      case 'Shipped': {
        this.detailProgress = 4 * 100 / 6;
        break;
      }
      case 'On its way': {
        this.detailProgress = 5 * 100 / 6;
        break;
      }
      case 'Arrive - Complete': {
        this.detailProgress = 100;
        break;
      }
      default: {
        this.detailProgress = 10;
      }
    }
  }
  buttonDisabled(status) {
    if (status === 'waiting for approve') {
      return false;
    } else {
      return true;
    }
  }

  onModify(orderId) {
    const orderM = this.orders.find(order => order.orderId === orderId);
    this.wineService.modifyOrder(orderM);
  }
  onDestroy(orderId) {
    if (confirm('ARE YOU SURE THAT YOU WANT TO DELETE THE ORDER?')) {
      this.wineService.destroyOrder(orderId);
      const index = this.orders.findIndex(order => order.orderId === orderId);
      this.orders.splice(index);
    }

  }
  onOrderToCart() {
    for (const mySL of this.orderDetail.sclOrder) {
      this.wineService.addToShoppingCart(mySL.wine, mySL.quantity);
      this.router.navigate(['/user/shoppingcart']);
    }
  }

  scrollToElement(el): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

}
