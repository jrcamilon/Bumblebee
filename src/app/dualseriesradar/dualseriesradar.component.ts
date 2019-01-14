import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { FiltersService } from 'services/FilterService/Filters.service';

@Component({
  selector: 'app-dualseriesradar',
  templateUrl: './dualseriesradar.component.html',
  styleUrls: ['./dualseriesradar.component.scss']
})
export class DualseriesradarComponent implements OnInit {
  public chartdata= [];

  constructor(private _ds: DataService, private _fs: FiltersService) { 
  
  }
  ngOnInit() {
    this.getCountWeightPerFabric();
  }
  getCountWeightPerFabric(): void {
    this._fs.LocationFilterValues.subscribe(item=>{
      if(item.length>0){
        this._ds.getTotalWeightCountPerFabric(item).subscribe(data => {
          this.chartdata = data;
      });
      } else {
        this._fs.DefaultFilterArray.subscribe(item=>{
            this._ds.getTotalWeightCountPerFabric(item).subscribe(data => {
              this.chartdata = data;
          });
      });

    }
  });

  }
}
