
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from '../eCommerce/home-page/home-page.component'
import { HeaderComponent } from '../eCommerce/header/header.component';
import { HeaderHomeComponent } from '../eCommerce/header-home/header-home.component';
import { WinelabelsComponent } from '../eCommerce/winelabels/winelabels.component';
import { WinesComponent } from './../eCommerce/winelabels/wines/wines.component';
import { WinesdetailsComponent } from './../eCommerce/winelabels/wines/winesdetails/winesdetails.component';
import { FooterComponent } from '../eCommerce/footer/footer.component';
import { AboutComponent } from '../eCommerce/about/about.component';
import { ContactComponent } from '../eCommerce/contact/contact.component';
import { ContactformComponent } from '../eCommerce/contact/contactform/contactform.component';
import { MapComponent } from '../eCommerce/map/map.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    HeaderHomeComponent,
    WinelabelsComponent,
    WinesComponent,
    WinesdetailsComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    ContactformComponent,
    MapComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_JETUsd3VpHNP4u2JA6nq_tmQ9nhnaaw'
    }),
  ]
})
export class HomeModule { }
