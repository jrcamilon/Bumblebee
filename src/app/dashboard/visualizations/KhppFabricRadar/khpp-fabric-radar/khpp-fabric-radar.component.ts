import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/DashboardService/dashboard.service';

@Component({
  selector: 'app-khpp-fabric-radar',
  templateUrl: './khpp-fabric-radar.component.html',
  styleUrls: ['./khpp-fabric-radar.component.scss']
})
export class KhppFabricRadarComponent implements OnInit {

  public chartdata = [];

  constructor(private dashService: DashboardService) {

  }
  ngOnInit() {
    // this.getCountWeightPerFabric();
    this.getTotalsForFabric();
  }
  getTotalsForFabric(): any {
    this.dashService.getKHPPFabricTypeProportions().subscribe(data => {
      console.log('KHPP Fabrics', data);
      this.chartdata = data;
    })
  }

}
