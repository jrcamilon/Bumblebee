import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'services/DashboardService/dashboard.service';
import { FiltersService } from 'services/FilterService/Filters.service';

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
  percent = '';
  constructor(private dashService: DashboardService, private filterService: FiltersService) {
    // this.runDashQueries();

  }

  ngOnInit() {
    // this.runDashQueries();
    this.runDashQueries();

  }
  runDashQueries(): any {
    this.filterService.EleFilterValues.subscribe(eleFilters => {
      if (eleFilters.length > 0) {
        this.filterService.KhppFilterValues.subscribe(khppFilters => {
          if (khppFilters.length > 0) {
            let filters = [...eleFilters, ...khppFilters];
            console.log('Submitting chosen values for both khpp and ele', filters);
            this.dashService.getKHPPEleFabricProportions(filters).subscribe(data => {
              console.log('Response for comparison sending submitted filters', data);
              this.rSlipIn = data.rSlipIn;
              this.rSlipOut = data.rSlipOut;
              this.rSlipBoth = data.rSlipBoth;
              this.creamSlipIn = data.creamSlipIn;
              this.creamSlipOut = data.creamSlipOut;
              this.untreated = data.untreated;
            })
          } else {
            this.filterService.DefaultKhppTagNumbers.subscribe(tags => {
              if (tags.length > 0) {
                let filters = [...tags, ...eleFilters];
                console.log('Submitting chosen values for ele and default khpp', filters);
                this.dashService.getKHPPEleFabricProportions(filters).subscribe(data => {
                  console.log('Response for cpmaison sending all tags', data);
                  this.rSlipIn = data.rSlipIn;
                  this.rSlipOut = data.rSlipOut;
                  this.rSlipBoth = data.rSlipBoth;
                  this.creamSlipIn = data.creamSlipIn;
                  this.creamSlipOut = data.creamSlipOut;
                  this.untreated = data.untreated;
                })
              }

            })
          }
        })
      } else {
        //Submit with all ele filters
        this.filterService.DefaultEleLocusNumbers.subscribe(locus => {
          this.filterService.KhppFilterValues.subscribe(khpp => {
            if (khpp.length > 0) {
              let filters = [...locus, ...khpp];
              console.log('submitting filters for default ele and value khpp', filters);
              this.dashService.getKHPPEleFabricProportions(filters).subscribe(data => {
                console.log('Response for cpmaison sending all tags', data);
                this.rSlipIn = data.rSlipIn;
                this.rSlipOut = data.rSlipOut;
                this.rSlipBoth = data.rSlipBoth;
                this.creamSlipIn = data.creamSlipIn;
                this.creamSlipOut = data.creamSlipOut;
                this.untreated = data.untreated;
              })
            } else {
              this.filterService.DefaultKhppTagNumbers.subscribe(tags => {
                if (tags.length > 0) {
                  let filters = [...locus, ...tags];
                  console.log('submitting filters for default ele and khpp', filters);

                  this.dashService.getKHPPEleFabricProportions(filters).subscribe(data => {
                    console.log('Response for cpmaison sending all tags', data);
                    this.rSlipIn = data.rSlipIn;
                    this.rSlipOut = data.rSlipOut;
                    this.rSlipBoth = data.rSlipBoth;
                    this.creamSlipIn = data.creamSlipIn;
                    this.creamSlipOut = data.creamSlipOut;
                    this.untreated = data.untreated;
                  })
                }

              })
            }
          })
        })
      }
    })



    // this.dashService.getKHPPEleFabricProportions().subscribe(data => {
    //   console.log('Comparison Data', data);

    //   this.rSlipIn = data.rSlipIn;
    //   this.rSlipOut = data.rSlipOut;
    //   this.rSlipBoth = data.rSlipBoth;
    //   this.creamSlipIn = data.creamSlipIn;
    //   this.creamSlipOut = data.creamSlipOut;
    //   this.untreated = data.untreated;
    // });
  }

  onSeriesOver(e: any) {
    console.log(e);
  }

}
