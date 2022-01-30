import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserInitComponent } from './user-init/user-init.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { UserWinesComponent } from './user-wines/user-wines.component';
import { UserWineDetailComponent } from './user-wines/user-wine-detail/user-wine-detail.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserOrderComponent } from './user-order/user-order.component';

@NgModule({
  declarations: [
    UserComponent,
    UserInitComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserWinesComponent,
    UserWineDetailComponent,
    ShoppingCartComponent,
    UserOrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
