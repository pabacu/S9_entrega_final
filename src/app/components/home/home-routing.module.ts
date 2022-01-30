
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { AboutComponent } from '../eCommerce/about/about.component';
import { ContactComponent } from '../eCommerce/contact/contact.component';
import { HomePageComponent } from '../eCommerce/home-page/home-page.component';
import { WinelabelsComponent } from '../eCommerce/winelabels/winelabels.component';
import { WinesComponent } from '../eCommerce/winelabels/wines/wines.component';
import { WinesdetailsComponent } from '../eCommerce/winelabels/wines/winesdetails/winesdetails.component';
import { HomeComponent } from './home.component';


const homeRoutes: Routes = [
  {
      path: '', component: HomeComponent, children: [
          {path: '', redirectTo: '/home/index', pathMatch: 'full'},
          { path: 'index', component: HomePageComponent },
          { path: 'labels', component: WinelabelsComponent },
          { path: 'labels/:wines', component: WinesComponent },
          { path: 'labels/:wines/:details', component: WinesdetailsComponent },
          { path: 'about', component: AboutComponent },
          { path: 'contact', component: ContactComponent },
          { path: 'newuser', component: SignupComponent },
          { path: 'login', component: SigninComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule { }
