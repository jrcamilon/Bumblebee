import { Component, OnInit} from '@angular/core';
import { config } from './map-config';
import { DataService } from 'app/data.service';
import { ElephantModel } from 'app/processing/components/models/elephant-model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  public opened = false;
  public markers = [{lat: 24.08532911, lng: 32.88544272}];
  public elephantineData: ElephantModel[];
  public mapStyles = config.styles;
  public selectedArtifactObject: any;


  constructor(private _ds: DataService ) {
    this._ds.elephantineData.subscribe(res => {
      this.markers = res.map(rec => {
        return new Object({lat: rec.lat, lng: rec.lng});
      });
      this.elephantineData = res;
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

  public close(): void { this.opened = false; }

  public open(): void { this.opened = true; }

  public onMarkerClick(event: any, index: any) {
    console.log(this.elephantineData[index]);
    this.selectedArtifactObject = this.elephantineData[index];

    this.open();
  }


}

