import { MaterialcardService } from 'services/MaterialCardService/materialcard.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from 'app/data.service';
import { FiltersService } from 'services/FilterService/Filters.service'
import { DashboardService } from 'services/DashboardService/dashboard.service';
@Component({
  selector: 'app-quadseriesstackedbar',
  templateUrl: './quadseriesstackedbar.component.html',
  styleUrls: ['./quadseriesstackedbar.component.scss']
})
export class QuadseriesstackedbarComponent implements OnInit {
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
    private _ds: DataService,
    public _materialCardService: MaterialcardService,
    public _fs: FiltersService,
    public dashService: DashboardService) {
    // this.runQueries();
    this.runDashQueries();
  }
  ngOnInit() {
    // this.runQueries();
    this.runDashQueries();

  }

  runDashQueries() {
    this._materialCardService.isCount.subscribe(res => {
      if (res === true) {
        this.getDashTotalPercentType();
      } else {
        this.getDashWeightPercentType();
      }
    });
  }
  getDashWeightPercentType(): any {
    this.dashService.getElephantineWeightBlackenedProportions().subscribe(data => {
      this.panel2exterior = data.exterior;
      this.panel2interior = data.interior;
      this.panel2both = data.both;
      this.panel2null = data.empty;
    })
  }
  getDashTotalPercentType(): any {
    this.dashService.getElephantineCountBlackenedProportions().subscribe(data => {
      this.panel2exterior = data.exterior;
      this.panel2interior = data.interior;
      this.panel2both = data.both;
      this.panel2null = data.empty;
    })
  }
  runQueries(): void {
    this._materialCardService.isCount.subscribe(res => {
      if (res === true) {
        this.getTotalPercentType();
      } else {
        this.getWeightPercentType();
      }
    });
  }
  getWeightPercentType(): void {
    this._fs.LocationFilterValues.subscribe(item => {
      if (item.length > 0) {
        this._ds.getWeightPercentBlackened(item).subscribe(data => {

          this.panel2exterior = data.exterior;
          this.panel2interior = data.interior;
          this.panel2both = data.both;
          this.panel2null = data.empty;
        });
      } else {
        this._fs.DefaultFilterArray.subscribe(item => {
          this._ds.getWeightPercentBlackened(item).subscribe(data => {

            this.panel2exterior = data.exterior;
            this.panel2interior = data.interior;
            this.panel2both = data.both;
            this.panel2null = data.empty;
          });
        })
      }

    })

  }
  getTotalPercentType(): void {
    this._fs.LocationFilterValues.subscribe(item => {
      if (item.lenth > 0) {
        this._ds.getTotalPercentBlackened(item).subscribe(data => {

          this.panel2exterior = data.exterior;
          this.panel2interior = data.interior;
          this.panel2both = data.both;
          this.panel2null = data.empty;
        });
      } else {
        this._fs.DefaultFilterArray.subscribe(item => {
          this._ds.getTotalPercentBlackened(item).subscribe(data => {

            this.panel2exterior = data.exterior;
            this.panel2interior = data.interior;
            this.panel2both = data.both;
            this.panel2null = data.empty;
          });
        })
      }

    })

  }
}
