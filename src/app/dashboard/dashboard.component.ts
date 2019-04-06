import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { DashboardService } from 'services/DashboardService/dashboard.service';
import { FiltersService } from 'services/FilterService/Filters.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  public panel1Data: any[] = [];
  public data: any[];
  constructor(
    private filterService: FiltersService,
    private dashService: DashboardService
  ) {
    this.dashService.getDashboardFilters().subscribe(item => {
      this.filterService.DefaultEleLocusNumbers.next(item.ele);
      this.filterService.DefaultKhppTagNumbers.next(item.khpp);
      this.filterService.EleLocusNumberArray.next(item.ele);
  
      

    })

  }

  ngOnInit() {

  }

}
