import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/DashboardService/dashboard.service';
import { MaterialcardService } from 'services/MaterialCardService/materialcard.service';
import { FiltersService } from 'services/FilterService/Filters.service';

@Component({
  selector: 'app-khpp-blackened-chart',
  templateUrl: './khpp-blackened-chart.component.html',
  styleUrls: ['./khpp-blackened-chart.component.scss']
})
export class KhppBlackenedChartComponent implements OnInit {
  public panel2interior = [];
  public panel2exterior = [];
  public panel2both = [];
  public panel2null = [];
  public model = [{
    stat: 'Body Sherds ',
    count: 434823,
    color: '#0e5a7e'
  }, {
    stat: 'Rim Tstc',
    count: 356854,
    color: '#166f99'
  }, {
    stat: 'Hem Cups ',
    count: 280022,
    color: '#2185b4'
  }, {
    stat: 'Flattened Base',
    count: 190374,
    color: '#319fd2'
  }, {
    stat: 'Other',
    count: 120392,
    color: '#3eaee2'
  }];
  constructor(
    public _materialCardService: MaterialcardService,
    public dashService: DashboardService,
    public _fs: FiltersService) {
    // this.runQueries();
    this.runDashQueries();

  }
  ngOnInit() {
    // this.runQueries();
    // this.runDashQueries();


  }

  runDashQueries() {
    this._materialCardService.panel10IsCount.subscribe(res => {
      //console.loge.log('Is Count Changed', res);
      if (res === true) {
        this.getDashTotalPercentType();
      } else {
        this.getDashWeightPercentType();
      }
    });
  }
  getDashWeightPercentType(): any {
    this._fs.KhppFilterValues.subscribe(item => {
      //console.loge.log('filters being submitted',item);
      if (item.length > 0) {
        this.dashService.getKHPPWeightBlackenedProportions(item).subscribe(data => {
          this.panel2exterior = data.exterior;
      this.panel2interior = data.interior;
      this.panel2both = data.both;
      this.panel2null = data.empty;
          //console.loge.log('Chart Data',data);
        });
      } else {

        this._fs.DefaultKhppTagNumbers.subscribe(item => {
      //console.loge.log('filters being submitted',item);
          this.dashService.getKHPPWeightBlackenedProportions(item).subscribe(data => {
            this.panel2exterior = data.exterior;
            this.panel2interior = data.interior;
            this.panel2both = data.both;
            this.panel2null = data.empty;
            //console.loge.log('Chart Data',data);

          });
        });

      }

  });
  }
  getDashTotalPercentType(): any {
    this._fs.KhppFilterValues.subscribe(item => {
      //console.loge.log('filters being submitted',item);
      if (item.length > 0) {
        this.dashService.getKHPPCountBlackenedProportions(item).subscribe(data => {
          this.panel2exterior = data.exterior;
      this.panel2interior = data.interior;
      this.panel2both = data.both;
      this.panel2null = data.empty;
          console.log('Chart Data',data);
        });
      } else {

        this._fs.DefaultKhppTagNumbers.subscribe(res => {
      //console.loge.log('filters being submitted',item);
          this.dashService.getKHPPCountBlackenedProportions(res).subscribe(data => {
            this.panel2exterior = data.exterior;
            this.panel2interior = data.interior;
            this.panel2both = data.both;
            this.panel2null = data.empty;
            console.log('Chart Data',data);

          });
        });

      }

  });
  }



}
