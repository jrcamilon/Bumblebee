import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, NgZone, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-partitioned-bar-chart',
  templateUrl: './partitioned-bar-chart.component.html',
  styleUrls: ['./partitioned-bar-chart.component.scss']
})
export class PartitionedBarChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public chart: am4charts.XYChart;
  @Input() inputData: any[];

  constructor(private zone: NgZone) {
    // console.log('TREEMAP');
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.inputData);
    if (changes.inputData.previousValue !== changes.inputData.currentValue) {
      // console.log(changes.inputData.currentValue);
      // console.log(this.chart);
      this.buildChart();
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.buildChart();
    });
  }

  buildChart() {

    // Create chart instance
    const chart = am4core.create('chartdiv4', am4charts.XYChart);
    chart.paddingLeft = 50;

    chart.responsive.enabled = true;
    // Add data
    // chart.data = [
    //   {
    //     'region': 'Central',
    //     'state': 'North Dakota',
    //     'sales': 920
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'South Dakota',
    //     'sales': 1317
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Kansas',
    //     'sales': 2916
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Iowa',
    //     'sales': 4577
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Nebraska',
    //     'sales': 7464
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Oklahoma',
    //     'sales': 19686
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Missouri',
    //     'sales': 22207
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Minnesota',
    //     'sales': 29865
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Wisconsin',
    //     'sales': 32125
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Indiana',
    //     'sales': 53549
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Michigan',
    //     'sales': 76281
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Illinois',
    //     'sales': 80162
    //   },
    //   {
    //     'region': 'Central',
    //     'state': 'Texas',
    //     'sales': 170187
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'West Virginia',
    //     'sales': 1209
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Maine',
    //     'sales': 1270
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'District of Columbia',
    //     'sales': 2866
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'New Hampshire',
    //     'sales': 7294
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Vermont',
    //     'sales': 8929
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Connecticut',
    //     'sales': 13386
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Rhode Island',
    //     'sales': 22629
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Maryland',
    //     'sales': 23707
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Delaware',
    //     'sales': 27453
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Massachusetts',
    //     'sales': 28639
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'New Jersey',
    //     'sales': 35763
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Ohio',
    //     'sales': 78253
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'Pennsylvania',
    //     'sales': 116522
    //   },
    //   {
    //     'region': 'East',
    //     'state': 'New York',
    //     'sales': 310914
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'South Carolina',
    //     'sales': 8483
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Louisiana',
    //     'sales': 9219
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Mississippi',
    //     'sales': 10772
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Arkansas',
    //     'sales': 11678
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Alabama',
    //     'sales': 19511
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Tennessee',
    //     'sales': 30662
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Kentucky',
    //     'sales': 36598
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Georgia',
    //     'sales': 49103
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'North Carolina',
    //     'sales': 55604
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Virginia',
    //     'sales': 70641
    //   },
    //   {
    //     'region': 'South',
    //     'state': 'Florida',
    //     'sales': 89479
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Wyoming',
    //     'sales': 1603
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Idaho',
    //     'sales': 4380
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'New Mexico',
    //     'sales': 4779
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Montana',
    //     'sales': 5589
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Utah',
    //     'sales': 11223
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Nevada',
    //     'sales': 16729
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Oregon',
    //     'sales': 17431
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Colorado',
    //     'sales': 32110
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Arizona',
    //     'sales': 35283
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'Washington',
    //     'sales': 138656
    //   },
    //   {
    //     'region': 'West',
    //     'state': 'California',
    //     'sales': 457731
    //   }
    // ];
    chart.data = this.inputData;

    // Create axes
    const yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = 'state';
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    const xAxis = chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = 'sales';
    series.dataFields.categoryY = 'state';
    series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]';
    series.columns.template.strokeWidth = 0;
    // series.columns.template.adapter.add('fill', function(fill, target) {
    //   if (target.dataItem) {
    //     switch (target.dataItem.dataContext.region) {
    //       case 'ware':
    //         return chart.colors.getIndex(0);
    //         break;
    //       case 'surfaceTreatment':
    //         return chart.colors.getIndex(1);
    //         break;
    //       case 'blackening':
    //         return chart.colors.getIndex(2);
    //         break;
    //     }
    //   }
    //   return fill;
    // });

    // Add ranges
    function addRange(label, start, end, color) {
      const range = yAxis.axisRanges.create();
      range.category = start;
      range.endCategory = end;
      range.label.text = label;
      range.label.disabled = false;
      range.label.fill = color;
      range.label.location = 0;
      range.label.dx = -130;
      range.label.dy = 12;
      range.label.fontWeight = 'bold';
      range.label.fontSize = 12;
      range.label.horizontalCenter = 'left'
      range.label.inside = true;
      range.grid.stroke = am4core.color('#396478');
      range.grid.strokeOpacity = 1;
      range.tick.length = 200;
      range.tick.disabled = false;
      range.tick.strokeOpacity = 0.6;
      range.tick.stroke = am4core.color('#396478');
      range.tick.location = 0;

      range.locations.category = 1;
    }

    // addRange('ware', 'Texas', 'North Coarse', chart.colors.getIndex(0));
    // addRange('wurfaceTreatment', 'New York', 'Slip', chart.colors.getIndex(1));
    // addRange('blackening', 'Florida', 'In', chart.colors.getIndex(2));

    chart.cursor = new am4charts.XYCursor();


  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnInit() {
  }



}
