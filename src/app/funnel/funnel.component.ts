import { MaterialcardService } from 'services/MaterialCardService/materialcard.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from 'app/data.service';
import { FiltersService } from 'services/FilterService/Filters.service';

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.css']
})
export class FunnelComponent implements OnInit {
  public model = [{
    stat: 'Body Sherds ',
    count: 434823,
    color: '#0e5a7e'
  }, {
    stat: 'Rim Tstc',
    count: 356854,
    color: '#166f99'
  }, {
    stat: 'Hem Cups ',
    count: 280022,
    color: '#2185b4'
  }, {
    stat: 'Flattened Base',
    count: 190374,
    color: '#319fd2'
  }, {
    stat: 'Other',
    count: 120392,
    color: '#3eaee2'
  }];
  constructor(
    private _ds: DataService,
    public _materialCardService: MaterialcardService,
    private _fs: FiltersService) {
    this.runQueries();

  }
  ngOnInit() {
    this.runQueries();
  }

  
  runQueries(): void {
    this._materialCardService.panel3IsCount.subscribe(res => {
      if (res === true) {
        this.getTotalPercentType();
      } else {
        this.getWeightPercentType();
      }
    });
    console.log(this.model);
  }
  getTotalPercentType(): void {
    this._fs.LocationFilterValues.subscribe(item=>{
      this._ds.getTotalPercentType(item).subscribe(data => {
        this.model = data;
       });
    })
   
  }
  getWeightPercentType(): void {
    this._fs.LocationFilterValues.subscribe(item=>{
    this._ds.getWeightPercentType(item).subscribe(data => {
      this.model = data;
    });
  });

  }
}
