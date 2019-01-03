import { Component, OnInit } from '@angular/core';
import { config } from './map-config';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

  markers = [{lat: 24.08532911, lng: 32.88544272}];

  mapStyles = config.styles;

  constructor(private _ds: DataService) {
    this._ds.elephantineData.subscribe(res => {
      this.markers = res.map(rec => {
        return new Object({lat: rec.lat, lng: rec.lng});
      })
    })
  }

  ngOnInit() {
    this._ds.getElephantineData()
    .subscribe((res) => {
      this._ds.elephantineData.next(res);
    },
    (err) => {
      alert('error with api');
    });
  }


}
