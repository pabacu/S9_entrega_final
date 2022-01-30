
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { UserModule } from './user/user.module';



import { AuthService } from './services/auth.service';
import { WinesService } from './services/wines.service';
import { AuthGuard } from './services/auth.guard';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    //WinesdetailsComponent,
    //WinesComponent,

  ],
  imports: [
    BrowserModule,
    
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    HomeModule,
    UserModule
    //RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    WinesService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
