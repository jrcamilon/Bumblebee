import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { FiltersService } from 'services/FilterService/Filters.service';
import { DashboardService } from 'services/DashboardService/dashboard.service';

@Component({
  selector: 'app-dualseriesradar',
  templateUrl: './dualseriesradar.component.html',
  styleUrls: ['./dualseriesradar.component.scss']
})
export class DualseriesradarComponent implements OnInit {
  public chartdata = [];

  constructor(private _ds: DataService, private _fs: FiltersService, private dashService: DashboardService) {
    // this.getTotalsForFabric();




  }
  ngOnInit() {
    // this.getCountWeightPerFabric();
    this.getTotalsForFabric();


  }
  getTotalsForFabric(): any {
    this._fs.EleFilterValues.subscribe(item => {
      console.log('filters being submitted',item);
      if (item.length > 0) {
        // console.log('Submitting value filters to api')
        this.dashService.getElephantineFabricProportions(item).subscribe(data => {
          this.chartdata = data;
          //console.loge.log('Chart Data',data);
        });
      } else {

        this._fs.DefaultEleLocusNumbers.subscribe(res => {
          console.log('filters being submitted',res);
          if(res.length>0){
            this.dashService.getElephantineFabricProportions(res).subscribe(data => {
              this.chartdata = data;
              console.log('Chart Data', data);

            });
          }
           
          });


      }
      // this.dashService.getKHPPFabricTypeProportions().subscribe(data => {
      //   //consolelog('KHPP Fabrics', data);
      //   this.chartdata = data;
      // })
    });
  }
  // getCountWeightPerFabric(): void {
  //   this._fs.EleFilterValues.subscribe(item => {
  //     //console.loge.log('filters being submitted',item);
  //     if (item.length > 0) {
  //       this.dashService.getElephantineWeightTypeProportions(item).subscribe(data => {
  //         this.chartdata = data;
  //         //console.loge.log('Chart Data',data);
  //       });
  //     } else {

  //       this._fs.DefaultEleLocusNumbers.subscribe(item => {
  //     //console.loge.log('filters being submitted',item);
  //         this.dashService.getElephantineWeightTypeProportions(item).subscribe(data => {
  //           this.chartdata = data;
  //           //console.loge.log('Chart Data',data);

  //         });
  //       });

  //     }
  //   // this.dashService.getKHPPFabricTypeProportions().subscribe(data => {
  //   //   //console.loge.log('KHPP Fabrics', data);
  //   //   this.chartdata = data;
  //   // })
  // });

  // }
}
