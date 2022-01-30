import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/orders.model';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Thread } from 'src/app/models/thread.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { WinesService } from 'src/app/services/wines.service';

@Component({
  selector: 'app-user-init',
  templateUrl: './user-init.component.html',
  styleUrls: ['./user-init.component.css']
})
export class UserInitComponent implements OnInit {
  user: User;
  threads: Thread[] = [];
  thrOpen = 0;
  thrClose = 0;
  thrMade = 0;
  orders: Order[] = [];
  ordNotApproved = 0;
  ordApproved = 0;
  ordPaid = 0;
  ordCompleted = 0;
  ordTotal = 0;
  dateOrders: { month: string, quantity: number, porcent: number }[] = [
    { month: 'January', quantity: 0, porcent: 0 },
    { month: 'February', quantity: 0, porcent: 0 },
    { month: 'March', quantity: 0, porcent: 0 },
    { month: 'April', quantity: 0, porcent: 0 },
    { month: 'May', quantity: 0, porcent: 0 },
    { month: 'June', quantity: 0, porcent: 0 },
    { month: 'July', quantity: 0, porcent: 0 },
    { month: 'August', quantity: 0, porcent: 0 },
    { month: 'September', quantity: 0, porcent: 0 },
    { month: 'October', quantity: 0, porcent: 0 },
    { month: 'November', quantity: 0, porcent: 0 },
    { month: 'December', quantity: 0, porcent: 0 }
  ];
  scFavWines: ShoppingCart[] = [];
  scFavWinesPercent: number[] = [];


  constructor(private auths: AuthService, private winesService: WinesService, private router: Router) { }

  ngOnInit() {
    this.user = this.auths.getLoggedUser();
    this.auths.getThreads().subscribe(
      (res: Thread[]) => {
        this.threads = res.filter(trd => trd.usermail === this.user.email);
        this.calculateThreads();
      },
      (err) => {
        console.log(err);
      }
    );
    this.winesService.obtainOrders(this.user.username).subscribe(
      (res: Order[]) => {
        this.orders = res;
        this.calculateFavWines();
        this.calculateOrders();
        this.calculateYearOrders();
      },
      (err) => {
        console.log(err);
      }
    )

  }

  calculateThreads() {
    this.thrMade = this.threads.length;
    this.thrClose = this.threads.filter(tr => tr.open === false).length;
    this.thrOpen = this.threads.filter(tr => tr.open === true).length;
  }

  calculateOrders() {
    this.ordNotApproved = this.orders.filter(ord => ord != null && ord.status === 'waiting for approve').length;
    this.ordApproved = this.orders.filter(ord => ord != null && ord.status === 'Approved').length;
    this.ordCompleted = this.orders.filter(ord => ord != null && ord.status === 'Arrive - Complete').length;
    this.ordPaid = this.orders.filter(ord => ord != null && (ord.status === 'Paid' || ord.status === 'Shipped' || ord.status === 'On its way')).length;
  }

  calculateYearOrders() {
    for (const ord of this.orders) {
      if (ord != null) {
        const date = new Date(ord.date);
        switch (date.getMonth()) {
          case 0:
            this.dateOrders[0].quantity++;
            this.ordTotal++;
            break;
          case 1:
            this.dateOrders[1].quantity++;
            this.ordTotal++;
            break;
          case 2:
            this.dateOrders[2].quantity++;
            this.ordTotal++;
            break;
          case 3:
            this.dateOrders[3].quantity++;
            this.ordTotal++;
            break;
          case 4:
            this.dateOrders[4].quantity++;
            this.ordTotal++;
            break;
          case 5:
            this.dateOrders[5].quantity++;
            this.ordTotal++;
            break;
          case 6:
            this.dateOrders[6].quantity++;
            this.ordTotal++;
            break;
          case 7:
            this.dateOrders[7].quantity++;
            this.ordTotal++;
            break;
          case 8:
            this.dateOrders[8].quantity++;
            this.ordTotal++;
            break;
          case 9:
            this.dateOrders[9].quantity++;
            this.ordTotal++;
            break;
          case 10:
            this.dateOrders[10].quantity++;
            this.ordTotal++;
            break;
          case 11:
            this.dateOrders[11].quantity++;
            this.ordTotal++;
            break;
        }
      }
    }
    let i = 0;
    for (const daOrd of this.dateOrders) {
      if(daOrd!=null)
        this.dateOrders[i].porcent = daOrd.quantity / this.ordTotal * 100;

      i++;
    }
    this.orderDatesOrderArray();
  }

  orderDatesOrderArray() {
    const date = new Date(Date.now());
    const dateOrders2: any[] = [];
    let m = date.getMonth();
    for (const daOrd of this.dateOrders) {
      dateOrders2.push(this.dateOrders[m]);
      if (m === 0) {
        m = 11;
      } else {
        m--;
      }
    }
    this.dateOrders = dateOrders2;
  }

  calculateFavWines() {
    this.scFavWines = [];
    this.scFavWinesPercent = [];
    for (const ord of this.orders) {
      if (ord != null && ord.sclOrder.length > 0)
        for (const sc of ord.sclOrder) {
          const i = this.scFavWines.findIndex(scF => scF.wine.wineId === sc.wine.wineId);
          if (i !== -1) {
            this.scFavWines[i].quantity = this.scFavWines[i].quantity + sc.quantity;
          } else {
            this.scFavWines.push(sc);
          }
        }
    }
    this.scFavWines.sort((a, b) => b.quantity - a.quantity);
    this.scFavWines = this.scFavWines.slice(0, 10);
    let i = 0;
    for (const sc of this.scFavWines) {
      this.scFavWinesPercent.push(sc.quantity * 100 / this.scFavWines[0].quantity);
      i++;
    }
  }

  classProgressBar(percent) {
    if (percent > 80) {
      return 'progress-bar progress-bar-success';
    } else if (percent > 60) {
      return 'progress-bar progress-bar-info';
    } else if (percent > 40) {
      return 'progress-bar';
    } else if (percent > 20) {
      return 'progress-bar progress-bar-warning';
    } else if (percent >= 0) {
      return 'progress-bar progress-bar-danger';
    }
    return "";
  }
  onAddFavWines() {
    for (const sc of this.scFavWines) {
      this.winesService.addToShoppingCart(sc.wine, 1);
      this.router.navigate(['/user/shoppingcart']);
    }
  }
}
