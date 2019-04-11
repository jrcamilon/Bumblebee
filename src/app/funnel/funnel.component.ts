import { MaterialcardService } from 'services/MaterialCardService/materialcard.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from 'app/data.service';
import { FiltersService } from 'services/FilterService/Filters.service';
import { DashboardService } from 'services/DashboardService/dashboard.service';
// import {_} from 'lodash';
@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.css']
})
export class FunnelComponent implements OnInit {

  public model = [{
    stat: 'Rim Tstc',
    count: 356854,
    countPercent: 20,
    color: '#166f99'
  }, {
    stat: 'Hem Cups ',
    count: 280022,
    countPercent: 20,

    color: '#2185b4'
  }, {
    stat: 'Flattened Base',
    count: 190374,
    countPercent: 20,

    color: '#319fd2'
  }, {
    stat: 'Other',
    count: 120392,
    countPercent: 20,

    color: '#3eaee2'
  }];
  percent = '';
  constructor(
    private _ds: DataService,
    public _materialCardService: MaterialcardService,
    private _fs: FiltersService,
    private dashService: DashboardService) {
    // this.runDashQueries();
  }
  ngOnInit() {
    // this.runQueries();
    // this.runDashQueries();
    this.runQueries();


  }
  // runDashQueries(): any {
  //   this._materialCardService.panel3IsCount.subscribe(res => {
  //     if (res === true) {
  //       this.dashService.getElephantineCountTypeProportions().subscribe(data => {
  //         this.model = data.map(item => {
  //           return {
  //             stat: item.stat,
  //             count: item.count / 100,
  //             color: item.color
  //           }
  //         })
  //       });
  //     } else {
  //       this.dashService.getElephantineWeightTypeProportions().subscribe(data => {
  //         this.model = data.map(item => {
  //           return {
  //             stat: item.stat,
  //             count: item.count / 100,
  //             color: item.color
  //           }
  //         })
  //       });

  //     }
  //   });
  // }

  runQueries(): void {
    this._materialCardService.panel3IsCount.subscribe(res => {
      if (res === true) {
        this.getTotalPercentType();
      } else {
        this.getWeightPercentType();
      }
    });
  }
  getTotalPercentType(): void {
    this._fs.EleFilterValues.subscribe(item => {
      if (item.length > 0) {
        console.log('filters being submitted', item);

        this.dashService.getElephantineCountTypeProportions(item).subscribe(data => {
          this.model = data.map(item => {
            return {
              stat: item.stat,
              count: item.count,
              countPercent: item.countPercent * 100,
              color: item.color
            }
          })
          console.log('ELE Type Count: ', this.model);

        });
      } else {

        this._fs.DefaultEleLocusNumbers.subscribe(res => {
          if (res.length > 0) {
            console.log('filters being submitted', res);

            this.dashService.getElephantineCountTypeProportions(res).subscribe(data => {
              console.log(data);
              this.model = data.map(eles => {

                return {
                  stat: eles.stat,
                  count: eles.count,
                  countPercent: eles.countPercent * 100,

                  color: eles.color
                }
              })
              // console.log('ELE Type Count: ', this.model);

            });
          }

        });

      }
      // this.dashService.getKHPPFabricTypeProportions().subscribe(data => {
      //   console.log('KHPP Fabrics', data);
      //   this.chartdata = data;
      // })
    });

  }
  getWeightPercentType(): void {
    this._fs.EleFilterValues.subscribe(item => {
      if (item.length > 0) {
        console.log('filters being submitted', item);
        this.dashService.getElephantineWeightTypeProportions(item).subscribe(data => {
          this.model = data.map(item => {
            return {
              stat: item.stat,
              count: item.count / 100,
              countPercent: item.countPercent * 100,

              color: item.color
            }
          })
          // console.log('ELE Type Weight: ', this.model);
        });
      } else {

        this._fs.DefaultEleLocusNumbers.subscribe(res => {
          // console.log('filters being submitted',item);
          if (res.length > 0) {
            this.dashService.getElephantineWeightTypeProportions(res).subscribe(data => {
              this.model = data.map(eles => {
                return {
                  stat: eles.stat,
                  count: eles.count / 100,
                  countPercent: eles.countPercent * 100,

                  color: eles.color
                }
              })
              // console.log('ELE Type Weight: ', this.model);

            });
          }

        });

      }
      // this.dashService.getKHPPFabricTypeProportions().subscribe(data => {
      //   console.log('KHPP Fabrics', data);
      //   this.chartdata = data;
      // })
    });

  }

  onSeriesOver(e: any): void {
    //percent count
    const obj = this.model.filter(item => {return item.stat === e.category})
    console.log(obj);
    this.percent = String(obj[0].countPercent) ;
      
  }
}
