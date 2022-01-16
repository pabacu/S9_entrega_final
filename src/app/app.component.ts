import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from '@firebase/app';
import { slideInAnimation } from 'src/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})

export class AppComponent implements OnInit {
  title = 'misVinosApp';
  constructor(private router: Router) { }
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBONgpaXT8A3bQVMtNwerT075ayZJUtpts',
      authDomain: 'ng-wine-app.firebaseapp.com',
      databaseURL: 'https://ng-wine-app.firebaseio.com',
      projectId: 'ng-wine-app',
      storageBucket: 'ng-wine-app.appspot.com',
      messagingSenderId: '344796102137'
    });
    this.router.navigate(['/']);
  }

}
