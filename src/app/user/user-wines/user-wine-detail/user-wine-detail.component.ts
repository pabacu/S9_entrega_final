import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';
import { Wine } from 'src/app/models/wine.model';
import { WinesService } from 'src/app/services/wines.service';

@Component({
  selector: 'app-user-wine-detail',
  templateUrl: './user-wine-detail.component.html',
  styleUrls: ['./user-wine-detail.component.css']
})
export class UserWineDetailComponent implements OnInit {
  idWine: string;
  wine: Wine;
  winesAdd: Wine[] = [];
  scList: ShoppingCart[];
  spinnerVisible = true;

  constructor(private wineService: WinesService, private route: ActivatedRoute, private platformStrategy: LocationStrategy) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.idWine = params['id'];
      this.wine = this.wineService.getOneWineWithId(this.idWine);
      this.spinnerVisible = false;
      this.scList = this.wineService.getShoppingCart();
      for (const sc of this.scList) {
        this.winesAdd.push(sc.wine);
      }
    })
    this.wineService.update_carItems();
  }
  goBack() {
    this.platformStrategy.back();
  }

  classSuccess() {
    if (this.winesAdd.find(wineAdd => wineAdd.wineId === this.wine.wineId)) {
      return 'success';
    } else {
      return null;
    }
  }
  onAdd() {
    this.winesAdd.push(this.wine);
    this.wineService.addToShoppingCart(this.wine, 1);
  }

}
