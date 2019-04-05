import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'services/FilterService/Filters.service';
import { HomeFilterService } from 'services/HomeFilterService/HomeFilterService';
@Component({
  selector: 'app-dash-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.css']
})
export class DashFilterBarComponent {
  public eleLocusVals: any;
  public khppTagVals: any;
  public defaultLocus: any[];
  public defaultTags: any[];

  constructor(
    private fs: FiltersService,
  ) {
    this.fs.DefaultEleLocusNumbers.subscribe(item => {
      this.defaultLocus = item;
      console.log(item);
    });
    this.fs.DefaultKhppTagNumbers.subscribe(item => {
      this.defaultTags = item;
      console.log(item);

    });

  }
 

  public changeLocus(value: any): void {
    console.log(value);
      this.fs.EleFilterValues.next(value);
    
  }
  public changeTags(value: any): void {
    console.log(value);
      this.fs.KhppFilterValues.next(value);

  }
}
