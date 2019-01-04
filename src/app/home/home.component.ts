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
    // public emailChartType: ChartType;
    // public emailChartData: any;
    // public emailChartLegendItems: LegendItem[];

    // public hoursChartType: ChartType;
    // public hoursChartData: any;
    // public hoursChartOptions: any;
    // public hoursChartResponsive: any[];
    // public hoursChartLegendItems: LegendItem[];

    // public activityChartType: ChartType;
    // public activityChartData: any;
    // public activityChartOptions: any;
    // public activityChartResponsive: any[];
    // public activityChartLegendItems: LegendItem[];
    public panel1Data: any[] = [];
  constructor(private _ds: DataService) { }

  ngOnInit() {
      this.runQueries();
      // this.emailChartType = ChartType.Pie;
      // this.emailChartData = {
      //   labels: ['62%', '32%', '6%'],
      //   series: [62, 32, 6]
      // };
      // this.emailChartLegendItems = [
      //   { title: 'Open', imageClass: 'fa fa-circle text-info' },
      //   { title: 'Bounce', imageClass: 'fa fa-circle text-danger' },
      //   { title: 'Unsubscribe', imageClass: 'fa fa-circle text-warning' }
      // ];

      // this.hoursChartType = ChartType.Line;
      // this.hoursChartData = {
      //   labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
      //   series: [
      //     [287, 385, 490, 492, 554, 586, 698, 695, 752, 788, 846, 944],
      //     [67, 152, 143, 240, 287, 335, 435, 437, 539, 542, 544, 647],
      //     [23, 113, 67, 108, 190, 239, 307, 308, 439, 410, 410, 509]
      //   ]
      // };
      // this.hoursChartOptions = {
      //   low: 0,
      //   high: 800,
      //   showArea: true,
      //   height: '245px',
      //   axisX: {
      //     showGrid: false,
      //   },
      //   lineSmooth: Chartist.Interpolation.simple({
      //     divisor: 3
      //   }),
      //   showLine: false,
      //   showPoint: false,
      // };
      // this.hoursChartResponsive = [
      //   ['screen and (max-width: 640px)', {
      //     axisX: {
      //       labelInterpolationFnc: function (value) {
      //         return value[0];
      //       }
      //     }
      //   }]
      // ];
      // this.hoursChartLegendItems = [
      //   { title: 'Open', imageClass: 'fa fa-circle text-info' },
      //   { title: 'Click', imageClass: 'fa fa-circle text-danger' },
      //   { title: 'Click Second Time', imageClass: 'fa fa-circle text-warning' }
      // ];

      // this.activityChartType = ChartType.Bar;
      // this.activityChartData = {
      //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      //   series: [
      //     [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
      //     [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
      //   ]
      // };
      // this.activityChartOptions = {
      //   seriesBarDistance: 10,
      //   axisX: {
      //     showGrid: false
      //   },
      //   height: '245px'
      // };
      // this.activityChartResponsive = [
      //   ['screen and (max-width: 640px)', {
      //     seriesBarDistance: 5,
      //     axisX: {
      //       labelInterpolationFnc: function (value) {
      //         return value[0];
      //       }
      //     }
      //   }]
      // ];
      // this.activityChartLegendItems = [
      //   { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
      //   { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      // ];


  }

  runQueries(): void {
    this.getTotalWeightPerFabric();
    this.getCountOfWeightPerFabric();
    this.getPercentOfDiagnostics();
    this.getPercentOfFireBlackenedExt();
    this.getCountOfFireBlackenedExt();
    this.getPercentOfFireBlackenedInt();
    this.getCountOfFireBlackenedInt();
    this.getPercentOfFireBlackenedIntExt();
    this.getCountOfFireBlackenedIntExt();
  }
  getTotalWeightPerFabric(): void {
    this._ds.getTotalWeightPerFabric().subscribe(data => {
      console.log(data);
    });
  }
  getCountOfWeightPerFabric(): void {
    this._ds.getCountOfWeightPerFabric().subscribe(data => {
      console.log(data);
      this.panel1Data =  data;
    });
  }
  getPercentOfDiagnostics(): void {
    this._ds.getPercentOfDiagnostics().subscribe(data => {
      console.log(data);
    });
  }
  getPercentOfFireBlackenedExt(): void {
    this._ds.getPercentOfFireBlackenedExt().subscribe(data => {
      console.log(data);
    });
  }
  getCountOfFireBlackenedExt(): void {
    this._ds.getCountOfFireBlackenedExt().subscribe(data => {
      console.log(data);
    });
  }
  getPercentOfFireBlackenedInt(): void {
    this._ds.getPercentOfFireBlackenedInt().subscribe(data => {
      console.log(data);
    });
  }
  getCountOfFireBlackenedInt(): void {
    this._ds.getCountOfFireBlackenedInt().subscribe(data => {
      console.log(data);
    });
  }
  getPercentOfFireBlackenedIntExt(): void {
    this._ds.getPercentOfFireBlackenedIntExt().subscribe(data => {
      console.log(data);
    });
  }
  getCountOfFireBlackenedIntExt(): void {
    this._ds.getCountOfFireBlackenedIntExt().subscribe(data => {
      console.log(data);
    });
  }


}
