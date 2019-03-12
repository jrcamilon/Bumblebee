import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { DataService } from 'app/data.service';
import { FiltersService } from 'services/FilterService/Filters.service';
import { MainDashMapService } from 'services/MainDashMapService/MainDashMap.service';
import { TableGridService } from 'services/TableGridService/table-grid.service'
import { HomeFilterService } from 'services/HomeFilterService/HomeFilterService';
import {OnlineServiceService} from 'services/OnlineServices/online-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public panel1Data: any[] = [];
  public currentlySelected: String;
  public currentPhase: String;
  public currentRooms: any[];
  public data: any[];
  constructor(
    private _ds: DataService,
    private _fs: FiltersService,
    private _ms: MainDashMapService,
    private _tgs: TableGridService,
    private _hfs: HomeFilterService,
    private _ofs: OnlineServiceService) {
    this._ofs.isOnline.subscribe(item => {
      console.log('Hello From Home: ONLINE: ', item);
    });
    this._ms.currentLocusGroup.subscribe(item => {
      this.currentlySelected = item;
    });
    this._hfs.ChosenPhaseFilters.subscribe(phase => {
      this.currentPhase = phase;
      console.log(this.currentPhase);
    });
    this._hfs.ChosenRoomFilters.subscribe(rooms => {
      this.currentRooms = rooms;
      console.log(this.currentRooms);

    });
    this.getAllElephantine();

  }

  ngOnInit() {
    this._ofs.isOnline.subscribe(item => {
      console.log('Hello From Home: ONLINE: ', item);
    });
    this.currentlySelected = "All";
    this.getAllElephantine();
    this._hfs.ChosenPhaseFilters.subscribe(phase => {
      this.currentPhase = phase;
      console.log(this.currentPhase);
    });
    this._hfs.ChosenRoomFilters.subscribe(rooms => {
      this.currentRooms = rooms.map(item => {
        return item.room;
      });
      console.log(this.currentRooms);

    });
  }
  handleResetLocus(): void {

    this.currentlySelected = "All";
    this._fs.DefaultFilterArray.subscribe(item => {
      this._fs.LocationFilterValues.next(item);
    });

  }

  getAllElephantine(): void {
    this._fs.LocationFilterValues.subscribe(item => {
      if (item.length > 0) {
        this._ds.getFilteredElephantineData(item)
          .subscribe((res) => {
            this.data = this._tgs.processElephantine(res);
            this._ds.selectedData.next(this._tgs.processElephantine(res));

          },
            (err) => {
              alert('error with api 1');
            });
      } else {
        this._fs.DefaultFilterArray.subscribe(item => {
          this._ds.getFilteredElephantineData(item)
            .subscribe((res) => {
              this.data = this._tgs.processElephantine(res);
              this._ds.selectedData.next(this._tgs.processElephantine(res));

            },
              (err) => {
                alert('error with api 2');
              });
        });
      }

    });

  }


}
