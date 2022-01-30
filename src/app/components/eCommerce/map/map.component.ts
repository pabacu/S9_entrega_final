import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 41.69268939524427;
  lng: number = 0.7333861411896234;
  constructor() { }

  ngOnInit(): void {
  }

}
