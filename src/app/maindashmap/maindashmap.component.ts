import { Component, OnInit } from '@angular/core';
import { config } from './map-config';
import { DataService } from 'app/data.service';
import { ElephantModel } from 'app/processing/components/models/elephant-model';
import { MainDashMapService } from 'services/MainDashMapService/MainDashMap.service';
import { FiltersService } from 'services/FilterService/Filters.service';
import { itemAt } from '@progress/kendo-angular-grid/dist/es2015/data/data.iterators';
@Component({
  selector: 'app-maindashmap',
  templateUrl: './maindashmap.component.html',
  styleUrls: ['./maindashmap.component.scss']
})
export class MaindashmapComponent implements OnInit {

  public opened = false;
  public markers = [{ lat: 24.08532911, lng: 32.88544272, locusid: '45601' }];
  public elephantineData: ElephantModel[];
  public mapStyles = config.styles;
  public selectedArtifactObject: any;


  constructor(
    private _ds: DataService,
    private _ms: MainDashMapService,
    private _fs: FiltersService) {
    this._ds.elephantineData.subscribe(res => {
      this.selectedArtifactObject = res[0];
      this.markers = res.map(rec => {
        return new Object({ lat: rec.lat, lng: rec.lng });
      });
      this.elephantineData = res;
    })
  }

  ngOnInit() {
    this._fs.LocationFilterValues.subscribe(res => {
      if (res.length > 0) {
        this._ds.getLatLangsLocusGroup(res)
          .subscribe((res) => {
            this.markers = res.map(item => {
              return {
                lat: item.lat,
                lng: item.lang,
                locusid: item.locusgroup
              }
            });
          });
      } else {
        this._fs.DefaultFilterArray.subscribe(res => {
          this._ds.getLatLangsLocusGroup(res)
            .subscribe((res) => {
              this.markers = res.map(item => {
                return {
                  lat: item.lat,
                  lng: item.lang,
                  locusid: item.locusgroup
                }
              });
            });
        });

      }

    })

  }

  public close(): void { this.opened = false; }

  public open(): void { this.opened = true; }

  public onMarkerClick(event: any, index: any) {
    console.info('You have clicked on the Locus Group:', this.markers[index].locusid);
    this._ms.currentLocusGroup.next(this.markers[index].locusid);
    // this.open();
  }


}
