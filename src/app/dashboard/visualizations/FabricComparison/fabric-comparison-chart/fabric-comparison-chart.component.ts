import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/DashboardService/dashboard.service';

@Component({
  selector: 'app-fabric-comparison-chart',
  templateUrl: './fabric-comparison-chart.component.html',
  styleUrls: ['./fabric-comparison-chart.component.scss']
})
export class FabricComparisonChartComponent implements OnInit {

  public rSlipIn;
  public rSlipOut;
  public rSlipBoth;
  public creamSlipIn;
  public creamSlipOut;
  public untreated;
  constructor(private dashService: DashboardService) {
    this.runDashQueries();

   }

  ngOnInit() {
    this.runDashQueries();
  }
  runDashQueries(): any {
    this.dashService.getKHPPEleFabricProportions().subscribe(data => {
      console.log('Comparison Data',data);

      this.rSlipIn = data.rSlipIn;
      this.rSlipOut = data.rSlipOut;
      this.rSlipBoth = data.rSlipBoth;
      this.creamSlipIn = data.creamSlipIn;
      this.creamSlipOut = data.creamSlipOut;
      this.untreated  = data.untreated;
    });
  }

}
