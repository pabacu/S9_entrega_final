import { WinesService } from 'src/app/services/wines.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  isIn = false;
  username: string;
  items: number = 0;
  

  constructor(private auths: AuthService, private wineService: WinesService, private router: Router) {}

  ngOnInit() {
    this.username = this.auths.getUserName();
    this.auths.userNameHeader.subscribe(
      (username: string) => {
        if (username) {
          this.username = username;
        } else {
          this.username = this.auths.getUserName();
        }
      }
    );

    this.wineService.cartItems.subscribe(
      (items: number) => {
        this.items = items;
      }
    );
  }

  changeInClass() {
    this.isIn = !this.isIn;
  }
  onLogOut() {
    this.auths.logout();
    this.router.navigate(['/home']);
  }
}
