
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {environment} from "../environments/environment";
//import {Http} from '@angular/http';



import { HomePageComponent } from './components/eCommerce/home-page/home-page.component'
import { HeaderComponent } from './components/eCommerce/header/header.component';
import { HeaderHomeComponent } from './components/eCommerce/header-home/header-home.component';
import { WinelabelsComponent } from './components/eCommerce/winelabels/winelabels.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { AuthService } from './services/auth.service';
import { WinesService } from './services/wines.service';
import { AuthGuard } from './services/auth.guard';
import { HttpModule } from '@angular/http';
import { FooterComponent } from './components/eCommerce/footer/footer.component';
//import { HttpClientModule } from '@angular/common/http';



const appRoutes:Routes=[
  {path:'', component: HomePageComponent,data: { animation: 'HomePage' } }  
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    HeaderHomeComponent,
    WinelabelsComponent,
    SpinnerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    WinesService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
