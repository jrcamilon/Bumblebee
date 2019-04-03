import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/DashboardService/dashboard.service';

@Component({
  selector: 'app-fabric-comparison-chart',
  templateUrl: './fabric-comparison-chart.component.html',
  styleUrls: ['./fabric-comparison-chart.component.scss']
})
export class FabricComparisonChartComponent implements OnInit {

  constructor(private dashService: DashboardService) { }

  ngOnInit() {
  }

}
