import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/DashboardService/dashboard.service';
import { FiltersService } from 'services/FilterService/Filters.service';


@Component({
  selector: 'app-khpp-fabric-radar',
  templateUrl: './khpp-fabric-radar.component.html',
  styleUrls: ['./khpp-fabric-radar.component.scss']
})
export class KhppFabricRadarComponent implements OnInit {

  public chartdata = [];

  constructor(private dashService: DashboardService, private filterService: FiltersService) {

  }
  ngOnInit() {
    // this.getCountWeightPerFabric();
    this.getTotalsForFabric();
  }
  getTotalsForFabric(): any {
    this.filterService.KhppFilterValues.subscribe(item => {
      //console.loge.log('filters being submitted',item);
      if (item.length > 0) {
        this.dashService.getKHPPFabricTypeProportions(item).subscribe(data => {
          this.chartdata = data;
          //console.loge.log('Chart Data',data);
        });
      } else {

        this.filterService.DefaultKhppTagNumbers.subscribe(item => {
      //console.loge.log('filters being submitted',item);
          this.dashService.getKHPPFabricTypeProportions(item).subscribe(data => {
            this.chartdata = data;
            //console.loge.log('Chart Data',data);

          });
        });

      }
    // this.dashService.getKHPPFabricTypeProportions().subscribe(data => {
    //   //console.loge.log('KHPP Fabrics', data);
    //   this.chartdata = data;
    // })
  });
}


}
