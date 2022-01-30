
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import firebase from 'firebase/compat/app';
//import * as firebase from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database'

import 'rxjs/Rx';
import { Router } from '@angular/router';

import { Wine } from '../models/wine.model';
import { Label } from '../models/label.model';
import { AuthService } from './auth.service';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart.model';
import { Order } from '../models/orders.model';
import { OrdersList } from '../models/orders-list.model';
import { Subject } from 'rxjs/Rx';


@Injectable()
export class WinesService {
  shoppingCart: ShoppingCart[] = [];
  label: Label[] = [];
  edit: string;
  allOrders: Order[] = [];
  cartItems = new Subject<number>();

  constructor(private http: Http, private router: Router, private auths: AuthService) {
    firebase.initializeApp({
      apiKey: 'AIzaSyBONgpaXT8A3bQVMtNwerT075ayZJUtpts',
      authDomain: 'ng-wine-app.firebaseapp.com',
      databaseURL: 'https://ng-wine-app.firebaseio.com',
      projectId: 'ng-wine-app',
      storageBucket: 'ng-wine-app.appspot.com',
      messagingSenderId: '344796102137'
    });
    
    this.cartItems.subscribe(val => {
      console.log(val);
    });
   }

  getAllLabels() {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels.json')
      .map((response: Response) => {
        const labels: Label[] = response.json();
        this.label = response.json();
        return labels;
      })
      .catch((error: Response) => {
        return Observable.throw('No Labels were Found');
      });
  }

  getOneLabel(index: number) {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/' + index + '.json')
      .map((response: Response) => {
        const label: Label[] = response.json();
        return label;
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getAllWines(index: number) {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/' + index + '/wines.json')
      .map((response: Response) => {
        const wines: Wine[] = response.json();
        return wines;
      })
      .catch((error: Response) => {
        return Observable.throw('No Wines were Found');
      });
  }
  getOneWine(ilabel: number, iwine: number) {
    return this.http.get('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines/' + iwine + '.json')
      .map((response: Response) => {
        const wine: Wine = response.json();
        return wine;
      })
      .catch((error: Response) => {
        return Observable.throw('No Wines were Found');
      });
  }

  getOneWineWithId(id: string) {
    if (this.label.length !== 0) {
      const ilabel = this.label.findIndex(label => label.wines.find(wine => wine.wineId === id) != null);
      return this.label[ilabel].wines.find(wine => wine.wineId === id);
    } else {
      return null; //this.router.navigate(['/user/wines']);
    }
  }

  addNewWine(wine: Wine, ilabel: number, iwine: number, imgFile: File) {
    const token = this.auths.getToken();
    const newWine = Observable.create((observer: Observer<string>) => {
      const fData = new FormData();
      fData.append('img', imgFile);
      this.http.post('http://localhost:8080/upload', fData)
        .subscribe(
        (res: Response) => {
          this.http.put('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines/' + iwine + '.json?auth=' + token, wine)
            .subscribe(
            resp => {
              this.auths.getToken();
              observer.next('success');
            },
            err => {
              observer.error(err);
            });
        },
        (error) => {
          observer.error(error);
        });
    });
    return newWine;
  }

  deleteWine(ilabel: number, iwine: number) {
    const token = this.auths.getToken();
    let wines: Wine[] = [];
    const delWine = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines.json')
        .map((res: Response) => {
          const ws: Wine[] = res.json();
          return ws;
        })
        .subscribe(
        (resp) => {
          wines = resp;
          wines.splice(iwine, 1);
          firebase.database().ref('labels').child(ilabel.toString()).child('wines').set(wines)
            .then(
            (respo) => {
              observer.next('success');
            })
            .catch(
            (err) => {
              observer.error(err);
            });
        },
        (err) => {
          observer.error(err);
        });
    });
    return delWine;
  }

  modifyWine(wine: Wine, ilabel: number, iwine: number) {
    const token = this.auths.getToken();
    const modWine = Observable.create((observer: Observer<string>) => {
      this.http.patch('https://ng-wine-app.firebaseio.com/labels/' + ilabel + '/wines/' + iwine + '.json?auth=' + token, wine)
        .subscribe(
        (res) => {
          observer.next('success');
        },
        (err) => {
          observer.error('error');
        });
    });
    return modWine;
  }

  // shopping cart list service -------------------------------------------------------------------------

  addToShoppingCart(wine: Wine, i: number) {
    const sc = new ShoppingCart(wine, i);
    if (this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId)) {
      this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId).quantity++;
    } else {
      this.shoppingCart.push(sc);
    }
    this.cartItems.next(this.shoppingCart.length);
  }
  removeFromShoppingCart(sc: ShoppingCart) {
    const index = this.shoppingCart.indexOf(sc);
    if (index !== -1) {
      this.shoppingCart.splice(index, 1);
    }


  }
  reduceQuantityShoppingCart(wine: Wine, i: number) {
    const sc = new ShoppingCart(wine, i);
    if (this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId)) {
      if (this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId).quantity > 0) {
        this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === sc.wine.wineId).quantity--;
      }
    }
  }

  updateShoppingCart(id: string, quantity: number) {
    this.shoppingCart.find(shoppingCart => shoppingCart.wine.wineId === id).quantity = quantity;
  }

  getShoppingCart() {
    return this.shoppingCart;
  }

  clearShoppingList() {
    this.shoppingCart = [];
  }

  // making orders --------------------------------------------------------------------------------------------
  generateOrder() {
    const username = this.auths.getUserName();
    const orderID: string = username + Date.now();
    const order: Order = new Order(orderID, Date.now(), this.shoppingCart, 'waiting for approve');
    
    const genOrd = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
        .map((response: Response) => {
          const res: any[] = response.json();
          return res;
        })
        .subscribe((res) => {
          if (res) {
            const index = res.length;
            firebase.database().ref('orders').child(username).child(index.toString()).set(order)
              .then(response => {
                this.shoppingCart = [];
                observer.next('success');
                this.router.navigate(['/user/orderhistory']);
              })
              .catch(error => {
                observer.error(error);
              })
          } else {
            firebase.database().ref('orders').child(username).child('0').set(order)
              .then(response => {
                this.shoppingCart = [];
                observer.next('success');
                this.router.navigate(['/user/orderhistory']);
              })
              .catch(error => {
                observer.error(error);
              })
          }
        },
        (err) => {
          observer.error(err);
        });
    });
    return genOrd;
  }

  getAllOrders() {
    const gAllOrders = Observable.create((observer: Observer<string>) => {
      this.auths.getAllUsersNames().subscribe(
        (res) => {
          const lastName = res[res.length - 1];
          res.forEach(user => {
            this.http.get('https://ng-wine-app.firebaseio.com/orders/' + user + '.json')
              .map((response: Response) => {
                const orders: Order[] = response.json();
                return orders;
              })
              .subscribe(
              (orders: Order[]) => {
                if (orders) {
                  orders.forEach(order => {
                    this.allOrders.push(order);
                  });
                }
                if (user === lastName) {
                  observer.next('success');
                }
              },
              (error => {
                observer.error(error);
              }));
          });
        },
        (err) => {
          observer.error('No Users were Found');
        });
    });
    return gAllOrders;
  }

  obtainOrders(username: string) {
    return this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
      .map((response: Response) => {
        const orders: Order[] = response.json();
        return orders;
      })
      .catch((error: Response) => {
        return Observable.throw('No Orders were Found');
      });
  }
  getEditOrder() {
    return this.edit;
  }
  clearEditOrder() {
    this.edit = null;
  }
  modifyOrder(orderM: Order) {
    this.shoppingCart = orderM.sclOrder;
    this.edit = orderM.orderId;
    this.router.navigate(['/user/shoppingcart']);
  }
  modifyOrderConfirm(orderId:string) {
    const username = this.auths.getUserName();
    const modORder = Observable.create((observer: Observer<string>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
        .map((response: Response) => {
          const res: Order[] = response.json();
          return res;
        })
        .subscribe(
        (response: Order[]) => {
          const index = response.findIndex(res => res.orderId === orderId);
          const order: Order = new Order(orderId, Date.now(), this.shoppingCart, 'waiting for approve');
          firebase.database().ref('orders').child(username).child(index.toString()).set(order)
            .then(res => {
              this.shoppingCart = [];
              this.clearEditOrder();
              observer.next('success');
              this.router.navigate(['/user/orderhistory']);
            })
            .catch(error => {
              observer.error(error);
            });
        },
        (error) => {
          observer.error(error);
        });
    });
    return modORder;
  }
  destroyOrder(orderId:string) {
    const username = this.auths.getUserName();
    this.http.get('https://ng-wine-app.firebaseio.com/orders/' + username + '.json')
      .map((response: Response) => {
        const res: Order[] = response.json();
        return res;
      })
      .subscribe((response: Order[]) => {
        const index = response.findIndex(res => res.orderId === orderId);
        firebase.database().ref('orders').child(username).child(index.toString()).remove();
      });
  }
  // ---- Admin Orders Function
  // --- Generate Order List with all users for de Admin Order Section ----
  getOrderList() {
    const ordersList: OrdersList[] = [];
    const gOrderList = Observable.create((observer: Observer<OrdersList[]>) => {
      this.auths.getAllUsersNames().subscribe(
        (res) => {
          const lastName = res[res.length - 1];
          res.forEach(user => {
            this.http.get('https://ng-wine-app.firebaseio.com/orders/' + user + '.json')
              .map((response: Response) => {
                const orders: Order[] = response.json();
                return orders;
              })
              .subscribe(
              (orders: Order[]) => {
                if (orders) {
                  orders.forEach(order => {
                    const ol = new OrdersList(user, order.orderId, order.date, order.sclOrder, order.status);
                    ordersList.push(ol);
                  });
                }
                if (user === lastName) {
                  observer.next(ordersList);
                }
              },
              (error => {
                observer.error(error);
              }));
          });
        },
        (err) => {
          observer.error('No Users were Found');
        });
    });
    return gOrderList;
  }
  // --- Update Order for de Admin Order Section ----
  adminUpdateORder(updateOrder: OrdersList) {
    const token = this.auths.getToken();
    const adUpOr = Observable.create((observer: Observer<OrdersList[]>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '.json?auth=' + token)
        .map((res: Response) => {
          const orders: Order[] = res.json();
          return orders;
        })
        .subscribe(
        (resp) => {
          const index = resp.findIndex(orderResponse => orderResponse.orderId === updateOrder.orderId);
          const order = new Order(updateOrder.orderId, updateOrder.date, updateOrder.sclOrder, updateOrder.status);
          this.http.patch('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '/' + index + '.json?auth=' + token, order)
            .subscribe(
            (respo) => {
              this.getOrderList().subscribe(
                (respon) => {
                  observer.next(respon);
                },
                (error) => {
                  observer.error(error);
                });
            },
            (error) => {
              observer.error(error);
            });
        },
        (err) => {
          observer.error(err);
        });

    });
    return adUpOr;
  }

  // --- Aprobe users orders and update wines stock service

  adminAprobeOrder(aprobeOrder: OrdersList) {
    const token = this.auths.getToken();
    let allLabels: Label[] = []
    const aAproOrder = Observable.create((observer: Observer<OrdersList>) => {
      this.getAllLabels().subscribe(
        (res) => {
          allLabels = res;
          allLabels.forEach(aL => {
            aprobeOrder.sclOrder.forEach(sc => {
              aL.wines.forEach(wn => {
                if (sc.wine.wineId === wn.wineId) {
                  wn.stock = wn.stock - sc.quantity;
                }
              });
            });
          });
          this.http.put('https://ng-wine-app.firebaseio.com/labels/.json?auth=' + token, allLabels)
            .subscribe(
            (resp) => {
              this.label = allLabels;
              this.adminUpdateORder(aprobeOrder)
                .subscribe((respo) => {
                  observer.next(respo);
                },
                (err) => { observer.error(err); });
            },
            (err) => {
              observer.error(err);
            });
        },
        (err) => {
          observer.error(err);
        });
    });
    return aAproOrder;
  }

  // --- Destroy Order for de Admin Order Section ----
  adminDestroyOrder(updateOrder: OrdersList) {
    const token = this.auths.getToken();
    const adUpOr = Observable.create((observer: Observer<OrdersList[]>) => {
      this.http.get('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '.json?auth=' + token)
        .map((res: Response) => {
          const orders: Order[] = res.json();
          return orders;
        })
        .subscribe(
        (resp) => {
          const index = resp.findIndex(orderResponse => orderResponse.orderId === updateOrder.orderId);
          const orders: Order[] = resp;
          orders.splice(index, 1);
          this.http.put('https://ng-wine-app.firebaseio.com/orders/' + updateOrder.userId + '.json?auth=' + token, orders)
            .subscribe(
            (respo) => {
              this.getOrderList().subscribe(
                (respon:OrdersList[]) => {
                  observer.next(respon);
                },
                (error) => {
                  observer.error(error);
                });
            },
            (error) => {
              observer.error(error);
            });
        },
        (err) => {
          observer.error(err);
        });

    });
    return adUpOr;
  }

}
