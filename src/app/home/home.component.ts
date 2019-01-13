import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { DataService } from 'app/data.service';
import {FiltersService} from 'services/FilterService/Filters.service';
import {MainDashMapService} from 'services/MainDashMapService/MainDashMap.service';
import {TableGridService} from 'services/TableGridService/table-grid.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public panel1Data: any[] = [];
  public currentlySelected: String;
  public data: any[];
  constructor(
    private _ds: DataService,
    private _fs: FiltersService,
    private _ms: MainDashMapService,
    private _tgs: TableGridService) {
      this._ms.currentLocusGroup.subscribe(item=>{
        this.currentlySelected = item;
      })

    this.getAllElephantine();

     }

  ngOnInit() {
    this.currentlySelected = "All";
    this.getAllElephantine();
  }
  handleResetLocus():void{
   
    this.currentlySelected = "All";
    this._fs.DefaultFilterArray.subscribe(item=>{
      this._fs.LocationFilterValues.next(item);
    });

  }

  getAllElephantine(): void {
    this._fs.LocationFilterValues.subscribe(item=>{
    this._ds.getFilteredElephantineData(item)
    .subscribe((res) => {
      this.data = this._tgs.processElephantine(res);
      this._ds.selectedData.next(this._tgs.processElephantine(res));

    },
    (err) => {
      alert('error with api');
    });
  });

  }
  

}
