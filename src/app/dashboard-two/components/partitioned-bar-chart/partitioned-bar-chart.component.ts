import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, NgZone, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.unuseAllThemes();
// tslint:disable-next-line: no-unused-expression
am4core.options.minPolylineStep = 5;
am4core.options.onlyShowOnViewport = true;
@Component({
  selector: 'app-partitioned-bar-chart',
  templateUrl: './partitioned-bar-chart.component.html',
  styleUrls: ['./partitioned-bar-chart.component.scss']
})
export class PartitionedBarChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public chart: am4charts.XYChart;
  @Input() inputData: any[];
  @ViewChild('chartDiv') chartDiv: ElementRef
  @Input() customStyle = {
    'width' : '100%',
    'height' : '500px'
  }

  constructor(private zone: NgZone) {
    // console.log('TREEMAP');
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.inputData);
    if (changes.inputData.previousValue !== changes.inputData.currentValue) {
        if (this.chart) {
          this.chart.dispose();
        }
        this.buildChart();
    }
  }

  setData() {
    this.chart.data = this.inputData;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.buildChart();
    });
  }

  buildChart() {

    // Create chart instance
    this.chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
    this.chart.paddingLeft = 50;

    this.chart.responsive.enabled = true;

    this.setData();

    // Create axes
    const yAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = 'state';
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    const xAxis = this.chart.xAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = 'sales';
    series.dataFields.categoryY = 'state';
    series.columns.template.tooltipText = '{categoryY}: [bold]{valueX}[/]';
    series.columns.template.strokeWidth = 0;
    // series.columns.template.adapter.add('fill', function(fill, target) {
    //   if (target.dataItem) {
    //     switch (target.dataItem.dataContext.region) {
    //       case 'ware':
    //         return this.chart.colors.getIndex(0);
    //         break;
    //       case 'surfaceTreatment':
    //         return this.chart.colors.getIndex(1);
    //         break;
    //       case 'blackening':
    //         return this.chart.colors.getIndex(2);
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

    // addRange('ware', 'Texas', 'North Coarse', this.chart.colors.getIndex(0));
    // addRange('wurfaceTreatment', 'New York', 'Slip', chart.colors.getIndex(1));
    // addRange('blackening', 'Florida', 'In', chart.colors.getIndex(2));

    this.chart.cursor = new am4charts.XYCursor();


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
