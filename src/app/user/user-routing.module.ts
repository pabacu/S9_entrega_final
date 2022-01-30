import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserInitComponent } from './user-init/user-init.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { UserWineDetailComponent } from './user-wines/user-wine-detail/user-wine-detail.component';
import { UserWinesComponent } from './user-wines/user-wines.component';
import { UserComponent } from './user.component';

const userRoutes: Routes = [
  {
      path: '', component: UserComponent, children: [
          { path: '', redirectTo: '/user/index', pathMatch: 'full' },
          { path: 'index', component: UserInitComponent },
          { path: 'wines', component: UserWinesComponent },
          { path: 'wines/:id', component: UserWineDetailComponent },
          { path: 'shoppingcart', component: ShoppingCartComponent },
          { path: 'orderhistory', component: UserOrderComponent }/*,
          { path: 'settings', component: UserSettingsComponent },
          { path: 'threads', component: UserThreadsComponent },*/
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
