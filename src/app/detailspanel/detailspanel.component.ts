import { Component, OnInit } from '@angular/core';
import {MainDashMapService} from 'services/MainDashMapService/MainDashMap.service';
@Component({
  selector: 'app-detailspanel',
  templateUrl: './detailspanel.component.html',
  styleUrls: ['./detailspanel.component.scss']
})
export class DetailspanelComponent implements OnInit {

  public locusid: String;

  constructor(private _ms: MainDashMapService) {
    this.getLocusId();
    
   }

  ngOnInit() {
    this.getLocusId();
  }

  getLocusId():void{
   this._ms.currentLocusGroup.subscribe(item=>{
     this.locusid = item;
   })


  }

}
