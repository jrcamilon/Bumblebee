import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-dualseriesradar',
  templateUrl: './dualseriesradar.component.html',
  styleUrls: ['./dualseriesradar.component.scss']
})
export class DualseriesradarComponent implements OnInit {
  public chartdata= [];

  constructor(private _ds: DataService) { 
  
  }
  ngOnInit() {
    this.getCountWeightPerFabric();
  }
  getCountWeightPerFabric(): void {
    this._ds.getTotalWeightCountPerFabric().subscribe(data => {
        this.chartdata = data;
    });
  }
}
