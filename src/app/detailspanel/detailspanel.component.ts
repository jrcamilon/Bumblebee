import { Component, OnInit } from '@angular/core';
import {MainDashMapService} from 'services/MainDashMapService/MainDashMap.service';
import {DataService} from 'app/data.service';
import {FiltersService} from 'services/FilterService/Filters.service';
@Component({
  selector: 'app-detailspanel',
  templateUrl: './detailspanel.component.html',
  styleUrls: ['./detailspanel.component.scss']
})
export class DetailspanelComponent implements OnInit {

  public locusid: String;
 
  public totalArtifacts: Number;
  public totalWeight: Number;
  public totalTypes: Number;
  public totalFabrics: Number;
  public tableData: any[];
   
  constructor(
      private _ms: MainDashMapService,
      private _ds: DataService,
      private _fs: FiltersService
      ) {
    this.getLocusId();
    this.getDetailsTotals();
    this.getDetailsTables();
   }

  ngOnInit() {
    this.getLocusId();
    this.getDetailsTotals();
    this.getDetailsTables();

  }
 
  getLocusId():void{
   this._ms.currentLocusGroup.subscribe(item=>{
     this.locusid = item;
   })
  }
  getDetailsTotals():void {
    this._fs.LocationFilterValues.subscribe(response=>{
      if(response.length>0){
        this._ds.getDashboardDetailTotals(response).subscribe(res=>{
          // console.log(res);
          this.totalArtifacts = res.artifact;
          this.totalWeight = res.weight
          this.totalFabrics = res.fabric
          this.totalTypes = res.type
        })
      } else {
        this._fs.DefaultFilterArray.subscribe(response2=>{
          this._ds.getDashboardDetailTotals(response2).subscribe(res=>{
            // console.log(res);
            this.totalArtifacts = res.artifact;
            this.totalWeight = res.weight
            this.totalFabrics = res.fabric
            this.totalTypes = res.type
          })
        })
      }
      
    })
    
  }

  getDetailsTables():void{
    this._fs.LocationFilterValues.subscribe(response=>{
      this._ds.getDashboardDetailTable(response).subscribe(res=>{
     this.tableData = res;
      })
    })
  }

}
