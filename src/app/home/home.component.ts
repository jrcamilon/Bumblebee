import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public panel1Data: any[] = [];
  constructor(private _ds: DataService) { }

  ngOnInit() {
      this.runQueries();
   


  }

  runQueries(): void {
   this.getLocusGroups();
   this.getBlackenedByLocusGroups();
  }
  
  getLocusGroups(){
    this._ds.getLatLangsLocusGroup().subscribe(res=>{
      console.log('Locus Lat Langs', res);
    })
  }

  getBlackenedByLocusGroups(){
    this._ds.getBlackenedByLocusGroup().subscribe(res=>{
      console.log('Locus Lat Langs Blackened', res);
    })
  }

}
