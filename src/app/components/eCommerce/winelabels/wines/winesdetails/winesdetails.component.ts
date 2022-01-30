import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Wine } from 'src/app/models/wine.model';
import { WinesService } from 'src/app/services/wines.service';

@Component({
  selector: 'app-winesdetails',
  templateUrl: './winesdetails.component.html',
  styleUrls: ['./winesdetails.component.css']
})
export class WinesdetailsComponent implements OnInit {
  wine: Wine;
  ilabel: number;
  iwine: number;
  spinnerVisible = true;

  constructor(private wineService: WinesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.ilabel = +params['wines'];
      this.iwine = +params['details'];
      this.wineService.getOneWine(this.ilabel, this.iwine).subscribe(
        (response: any) => {
          this.wine = response;
          this.spinnerVisible = false;
        }, (error) => {
          console.log(error);
        });
    });
  }
}
