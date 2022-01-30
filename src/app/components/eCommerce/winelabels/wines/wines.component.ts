import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Wine } from 'src/app/models/wine.model';
import { WinesService } from 'src/app/services/wines.service';


@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.css']
})
export class WinesComponent implements OnInit {
  wines: Wine[];
  id: number;
  spinnerVisible = true;

  constructor(private wineService: WinesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['wines'];
      this.wineService.getAllWines(this.id).subscribe(
        (response: any[]) => {
          this.wines = response;
          this.spinnerVisible = false;
        }, (error) => {
          console.log(error)
        });
    });
  }

}
