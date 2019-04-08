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

  //Tool Tips
  public panel2interiorTips = [];
  public panel2exteriorTips = [];
  public panel2bothTips = [];
  public panel2nullTips = [];
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
  percentage ;
  constructor(
    public _materialCardService: MaterialcardService,
    private dashService: DashboardService,
    private _fs: FiltersService) {
    // this.runQueries();
    // this.runDashQueries();

  }
  ngOnInit() {
    // this.runQueries();
    this.runDashQueries();


  }

  assignData(data) {
    this.panel2exterior = data[0].exterior;
    this.panel2interior = data[0].interior;
    this.panel2both = data[0].both;
    this.panel2null = data[0].empty;
  }
  assignToolTips(data) {
    this.panel2exteriorTips = data[1].exterior;
    this.panel2interiorTips = data[1].interior;
    this.panel2bothTips = data[1].both;
    this.panel2nullTips = data[1].empty;
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
      if (item.length > 0) {
        console.log('filters being submitted', item);
        this.dashService.getKHPPWeightBlackenedProportions(item).subscribe(data => {
          this.assignData(data);
          this.assignToolTips(data);
          console.log('Chart Data', data);
        });
      } else {

        this._fs.DefaultKhppTagNumbers.subscribe(res => {
          if (res.length > 0) {
            console.log('filters being submitted', res);
            this.dashService.getKHPPWeightBlackenedProportions(res).subscribe(data => {
              this.assignData(data);
              this.assignToolTips(data);

            });
          }

        });

      }

    });
  }
  getDashTotalPercentType(): any {
    this._fs.KhppFilterValues.subscribe(item => {
      if (item.length > 0) {
        console.log('filters being submitted', item);
        this.dashService.getKHPPCountBlackenedProportions(item).subscribe(data => {
          this.assignData(data);
          this.assignToolTips(data);
          console.log('Chart Data', data);
        });
      } else {

        this._fs.DefaultKhppTagNumbers.subscribe(res => {
          if (res.length > 0) {
            console.log('filters being submitted', res);
            this.dashService.getKHPPCountBlackenedProportions(res).subscribe(data => {
              this.assignData(data);
              this.assignToolTips(data);
              console.log('Chart Data', data);

            });
          }

        });

      }

    });
  }

  setBlackenedToolTip(e, catIndex){
    switch(e.series.index){
      case 0:
      this.percentage = this.panel2interiorTips[catIndex] *100;
      break;
      case 1: 
      this.percentage = this.panel2exteriorTips[catIndex]*100;
      break;
      case 2: 
      this.percentage = this.panel2nullTips[catIndex]*100;
      break;
  
    }
  }
  onSeriesOver(e: any) {
    console.log(e);
    let catIndex;
    let fireIndex;
    switch(e.category){
      case 'Coarse':
      // array index = 1
      catIndex = 0;
      this.setBlackenedToolTip(e,catIndex);
      break;
      case 'Medium':
      // array index = 2
      catIndex = 1;
      this.setBlackenedToolTip(e,catIndex);
      break;
      case 'Fine':
      // array index = 3
      catIndex = 2;
      this.setBlackenedToolTip(e,catIndex);

     
    }

   
 
  }

}
