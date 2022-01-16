import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WinesService } from '../../../services/wines.service';
import { Label } from '../../../models/label.model';
import { Wine } from '../../../models/wine.model';

@Component({
  selector: 'app-winelabels',
  templateUrl: './winelabels.component.html',
  styleUrls: ['./winelabels.component.css']
})
export class WinelabelsComponent implements OnInit {

  labels: Label[];
  wine: Wine[];
  spinnerVisible = true;


  constructor(private wineService: WinesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.wineService.getAllLabels().subscribe(
      (response: any[]) => {
        this.labels = response;
        this.spinnerVisible = false;
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

}
