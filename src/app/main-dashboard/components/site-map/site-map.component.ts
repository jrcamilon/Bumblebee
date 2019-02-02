import { Component, OnInit } from '@angular/core';
import { config } from './map-config';
import { FiltersService } from 'services/FilterService/Filters.service';
import { DataService } from 'app/data.service';
@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.scss']
})
export class SiteMapComponent implements OnInit {
  public markers = [{ lat: 24.08532911, lng: 32.88544272 }];
  public siteList: any[];
  public valueList: any[];
  constructor(private _fs: FiltersService,
    private _ds: DataService
  ) { }

  ngOnInit() {
    this._fs.SiteFilterValue.subscribe(item => {

      if (item.length === 0) {
        this._fs.DefaultFilterArray.subscribe(response => {
          this._ds.getSiteLocations(response).subscribe(mapResponse => {
            this.markers = mapResponse;
          })
        })
      }
    })

  }
  onMapLoad(e): void {
    this._fs.DefualtSiteFilterArray.subscribe(item => {
      this.siteList = item;
    });

  }
  changeSite(e): void {

  }
}
