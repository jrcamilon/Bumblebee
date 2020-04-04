import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, NgZone, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss']
})
export class TimelineChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public chart: am4charts.RadarChart;
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

  //   const temperatures = {
  //     "Ware": [
  //         ["Coarse", 17.89, 3.61, 1.61, 1.61, 1.11, 3.36, 3.36, 0.36, 2.26, 2.32, 2.36, 2.41, 2.55, 2.05, 1.49, 1.91, 2.52, 2.03, 1.05, 11.23, 11.23, 11.23, 11.23, 11.23, 11.23, 11.23, 11.23, 5.59, 5.59, 5.59, 5.59, 5.59, 5.59, 5.59, 1.11, 0.96, 0.96, 0.96, 0.96, 0.96, 1.48, 1.71, 1.14, 0.57, 0.84],
  //         ["Medium", 6.9, 0.33, 0.18, 0.36, 0.05, 0.42, 0.55, 0.13, 0.84, 0.14, 0.38, 0.72, 0.47, 0.27, 0.03, 0.17, 0.57, 0.94, 0.88, 0.02, 1.49, 0.82, 2.08, 0.75, 0.26, 0.95, 1.03, 1.05, 1.85, 0.87, 0.43, 0.26, 0.62, 0.83, 0.08, 0.1, 0.62, 0.58, 0.39, 0.53, 0.22, 0.27, 0.86, 0.89, 0.75],
  //         ["Fine", 10.32, 0.07, 0.23, 0.15, 0.73, 0.11, 0.5, 0.88, 0.64, 0.29, 0.67, 0.49, 0.27, 0.82, 0.62, 0.82, 0.49, 1.08, 0.99, 0.15, 0.56, 0.07, 0.91, 0.98, 0.92, 0.65, 0.38, 0.94, 1.72, 1.53, 1.93, 2.29, 1.94, 2.53, 1.74, 2.07, 1.78, 1.76, 1.18, 2.93, 2.29, 0.92, 2.63, 5.37, 4.61],
  //         ["MarlA", 12.03, 0.06, 0.12, 0.48, 0.58, 0.07, 0.65, 0.41, 0.46, 0.29, 0.45, 0.06, 0.28, 0.24, 2.82, 0.31, 0.23, 0.78, 1.49, 3.23, 0.55, 4.72, 0.57, 1.77, 1.77, 1.77, 3.13, 0.55, 0.57, 1.21, 0.43, 2.21, 1.56, 1.45, 1.08, 0.05, 1.34, 0.13, 0.81, 0.93, 1.67, 0.77, 1.06, 0.51, 0.14],
  //         ["MarlC", 13.8, 0.07, 0.21, 0.34, 0.54, 0.45, 0.87, 0.22, 0.82, 0.03, 0.52, 0.52, 0.39, 0.12, 0.06, 0.03, 0.48, 0.48, 0.87, 0.12, 1.07, 0.61, 1.73, 0.32, 3.32, 3.18, 3.32, 0.28, 0.84, 0.39, 0.58, 0.68, 0.33, 0.62, 0.41, 1.01, 0.77, 0.89, 0.13, 0.79, 1.12, 0.51, 1.13, 0.22, 2.08],
  //         ["Other Marl", 8.12, 0.46, 0.11, 0.36, 0.32, 0.44, 0.01, 0.42, 1.58, 0.24, 0.96, 1.1, 0.68, 0.81, 0.2, 1.09, 0.97, 1.34, 1.34, 0.18, 1.17, 0.26, 1.47, 0.54, 1.14, 0.41, 0.86, 1.32, 2.06, 0.52, 1.41, 1.68, 1.46, 0.61, 2.04, 1.96, 1.84, 1.95, 0.62, 1.54, 1.77, 1.11, 2.63, 3.79, 2.48],
  //         ["NOWARE", 7.89, 0.48, 0.31, 0.68, 0.06, 0.47, 0.04, 0.97, 0.21, 0.19, 0.36, 0.01, 0.31, 0.82, 0.49, 0.97, 0.36, 0.92, 1.38, 0.5, 0.96, 0.43, 0.19, 0.13, 0.83, 0.61, 0.09, 0.31, 0.78, 0.62, 1.59, 0.41, 0.83, 1.39, 1.49, 1.18, 1.27, 0.83, 0.84, 1.14, 0.46, 0.56, 1.95, 1.49, 1.33],
  //         ["MarlA2", 3.85, 1.07, 1.77, 0.14, 3.82, 2.64, 1.71, 1.66, 1.31, 2.01, 2.64, 3.27, 2.67, 0.26, 1.68, 2.24, 2.5, 3.49, 0.74, 2.3, 2.78, 1.96, 2.73, 3.14, 1.64, 2.57, 2.41, 3.07, 4.03, 4.33, 3.74, 3.27, 3.51, 3.15, 4.32, 3.41, 3.65, 2.55, 1.72, 3.51, 2.08, 3.13, 3.5, 3.78, 3.06],
  //         ["MKBM", 2.29, 0.24, 1.87, 1.67, 1.16, 0.27, 1.27, 0.02, 0.67, 0.96, 0.15, 0.45, 0.74, 2.04, 0.4, 1.84, 0.22, 2.05, 1.31, 0.16, 1.17, 0.14, 0.02, 0.57, 0.11, 0.37, 0.22, 0.62, 1.77, 0.19, 0.32, 0.55, 0.69, 1.33, 1.06, 1.38, 1.57, 0.74, 0.31, 2.03, 0.14, 1.84, 2.01, 2.43, 1.63],
  //         ["Marl", 11.96, 0.44, 0.22, 0.02, 0.04, 0.32, 0.05, 0.43, 0.79, 0.09, 0.92, 0.28, 0.27, 0.29, 0.24, 0.16, 0.58, 0.79, 1.21, 0.4, 0.68, 0.03, 1.33, 0.78, 0.22, 0.92, 0.44, 0.91, 0.82, 0.63, 0.64, 1.56, 0.38, 0.48, 1.17, 0.72, 0.31, 0.92, 0.02, 1.44, 0.69, 0.01, 1.33, 1.06, 0.64],
  //         ["Marl >", 16.38, 0.06, 0.19, 0.03, 0.38, 0.69, 0.01, 0.41, 0.06, 0.18, 0.24, 0.32, 0.03, 0.45, 0.14, 0.07, 1.72, 0.04, 0.62, 0.38, 0.06, 0.57, 1.21, 0.53, 0.75, 0.17, 1.53, 1.49, 1.03, 1.88, 0.92, 0.86, 0.53, 0.48, 1.13, 1.56, 1.53, 2.76, 2.05, 0.91, 1.99, 4.31, 3.41, 2.5, 0.07],
  //     ],
  //     "Surface Treatment": [
  //         ["Unslipped", 16.99, 0.55, 0.09, 0.44, 4.27, 0.58, 0.28, 0.93, 0.58, 0.5, 2.37, 1.47, 1.45, 1.74, 1.34, 2.07, 0.91, 0.61, 1.84, 0.71, 0.54, 0.36, 2.18, 2.28, 1.93, 4.09, 1.03, 1.77, 1.32, 2.72, 1.51, 2.68, 1.43, 1.82, 2.62, 1.64, 1.72, 3.03, 1.88, 2.16, 2.45, 0.54, 3.03, 1.52, 3.32],
  //         ["R Slip In", 23.86, 1.64, 0.58, 0.54, 0.37, 0.96, 0.56, 0.56, 0.56, 1.61, 1.94, 1.94, 1.94, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 2.46, 0.86, 1.81, 0.79, 0.18, 0.64, 1.38, 1.98, 0.65, 0.65, 0.09, 3.67, 5.14, 5.14, 2.62, 1.91, 2.57],
  //         ["R Slip Out", 21.64, 0.33, 1.11, 0.36, 0.7, 0.1, 0.26, 0.24, 0.92, 0.77, 0.58, 0.88, 0.68, 0.33, 1.9, 1.8, 1.41, 0.3, 2.82, 0.84, 0.3, 0.98, 1.19, 2.32, 1.36, 1.64, 1.68, 2.41, 0.34, 1.46, 2.44, 1.63, 0.87, 2.18, 0.41, 0.84, 0.64, 0.58, 1.6, 0.89, 0.87, 0.83, 0.24, 1.09, 2.2],
  //         ["Cream Slip On", 24.36, 0.16, 0.32, 0.6, 0.31, 0.01, 0.09, 0.22, 0.18, 0.27, 0.07, 0.36, 0.03, 0.18, 0.33, 0.76, 0.43, 0.11, 0.96, 1.1, 0.1, 0.38, 0.14, 0.46, 0.32, 0.98, 1.14, 0.5, 0.42, 0.33, 1.02, 0.57, 1.56, 1.14, 1.78, 0.84, 0.47, 0.71, 3.01, 0.46, 0.62, 0.93, 0.3, 0.55, 0.96],
  //         ["Cream Slip Out", 27.71, 1.17, 0.16, 0.16, 0.36, 0.18, 0.12, 2.14, 2.14, 2.14, 2.14, 2.14, 2.14, 2.14, 2.14, 0.52, 0.86, 0.09, 1.26, 1.18, 0.27, 0.74, 1.43, 0.42, 0.04, 0.97, 0.09, 1.44, 0.37, 0.95, 1.15, 1.21, 1.41, 0.42, 1.9, 1.14, 0.13, 1.52, 1.98, 1.16, 0.87, 1.77, 1.53, 0.86, 1.33],
  //         ["NOSURFACETREATMENT", 25.22, 0.17, 0.28, 0.45, 0.31, 0.13, 0.07, 0.21, 0.12, 0.14, 0.31, 0.5, 0.54, 0.11, 0.24, 0.66, 0.63, 0.51, 0.1, 0.26, 0.64, 0.14, 0.56, 0.81, 0.32, 1.27, 1.34, 0.74, 0.16, 0.49, 1.54, 1.67, 0.73, 1.14, 0.57, 0.95, 0.96, 1.13, 1.28, 0.91, 1.2, 0.89, 0.79, 1.12, 1.37],
  //         ["Black Slip In/Out", 22.71, 0.54, 0.06, 0.88, 0.35, 0.27, 2.35, 0.56, 0.34, 0.74, 0.34, 0.55, 0.19, 1.07, 1.12, 0.37, 0.2, 0.16, 0.59, 0.19, 0.85, 0.44, 0.79, 0.03, 0.46, 0.87, 0.68, 1.25, 1.59, 0.1, 0.23, 0.72, 0.71, 0.01, 0.91, 0.68, 0.93, 0.79, 2.17, 0.14, 0.57, 0.01, 1.56, 1.43, 1.1],
  //         ["Black Other", 19.63, 0.43, 0.53, 0.37, 0.21, 0.04, 0.12, 0.07, 0.41, 0.18, 0.28, 0.42, 0.16, 0.72, 0.11, 0.59, 0.45, 1.68, 0.52, 0.86, 0.96, 1.11, 0.24, 0.79, 0.31, 0.8, 0.73, 0.86, 1.22, 0.17, 4.5, 4.5, 4.5, 5.07, 0.97, 1.89, 2.05, 1.61, 1.18, 2.43, 1.51, 1.88, 1.49, 1.84, 1.54],
  //         ["Black Slip In", 26.71, 0.01, 1.01, 0.19, 0.91, 0.42, 0.07, 0.22, 1.24, 0.74, 2.58, 2.58, 2.58, 2.58, 0.01, 1.98, 0.77, 0.39, 0.21, 0.54, 0.48, 0.11, 0.94, 1.69, 0.23, 0.44, 1.02, 0.97, 0.15, 2.47, 1.91, 0.78, 1.11, 0.8, 1.92, 1.58, 0.65, 0.87, 1.23, 0.7, 0.88, 1.52, 0.19, 0.84, 1.36],
  //     ],
  //     "Blackening": [
  //         ["None", 17.19, 1.68, 0.6, 0.49, 0.73, 0.41, 1.13, 0.53, 0.19, 0.29, 2.62, 0.62, 1.66, 1.17, 0.91, 0.73, 0.47, 0.09, 0.35, 0.64, 0.86, 0.61, 0.07, 0.58, 0.39, 0.38, 0.16, 0.42, 0.87, 0.25, 0.21, 0.17, 0.33, 0.01, 0.19, 0.3, 0.05, 0.65, 0.06, 0.22, 0.66, 0.29, 0.31, 0.27, 0.53],
  //         ["In", 26.31, 0.53, 0.4, 1.28, 0.14, 0.47, 0.68, 0.87, 0.77, 0.36, 0.42, 0.79, 0.91, 0.84, 0.56, 0.09, 0.58, 0.11, 0.38, 0.38, 0.34, 0.21, 0.61, 1.36, 0.67, 1.13, 1.12, 0.09, 0.11, 0.58, 0.94, 0.92, 0.5, 1.14, 0.84, 0.98, 0.68, 0.78, 0.75, 0.68, 0.47, 0.95, 0.66, 1.19, 1.23],
  //         ["Out", 21.84, 2.32, 1.07, 1.07, 2.28, 0.61, 0.92, 0.14, 0.33, 0.57, 1.18, 0.22, 0.23, 0.44, 0.34, 1.07, 0.34, 0.12, 0.38, 0.59, 0.09, 0.57, 1.07, 1.14, 0.43, 0.42, 0.82, 0.23, 0.39, 0.92, 1.49, 1.04, 0.86, 1.04, 1.27, 0.69, 0.81, 1.79, 0.84, 0.53, 2.75, 2.11, 1.52, 1.68, 2.01],
  //         ["In/Out", 25.75, 0.43, 1.64, 0.21, 0.72, 0.73, 0.14, 1.11, 0.01, 0.41, 1.15, 0.39, 0.25, 0.32, 0.75, 0.36, 0.23, 0.35, 0.55, 0.37, 0.59, 0.57, 0.58, 0.99, 0.53, 0.29, 0.46, 0.64, 0.68, 0.73, 0.37, 0.23, 1.12, 0.39, 0.63, 0.44, 0.03, 0.18, 0.34, 0.26, 0.16, 0.68, 1.71, 2.25, 0.23],
  //         ["Exterior", 3.37, 0.29, 0.05, 0.65, 0.04, 0.34, 0.82, 0.21, 0.02, 1.24, 0.92, 0.62, 0.31, 0.33, 0.53, 1.84, 1.11, 0.46, 0.9, 1.21, 1.33, 0.51, 0.06, 0.03, 0.78, 0.31, 1.57, 0.73, 0.14, 0.72, 0.45, 0.08, 0.28, 0.54, 1.04, 0.12, 0.32, 0.44, 1.03, 0.04, 0.63, 0.19, 0.31, 0.67, 1.03],
  //         ["Interior", 13.37, 0.54, 0.44, 0.69, 0.35, 0.34, 0.05, 0.03, 0.25, 0.26, 0.32, 1.14, 0.56, 1.92, 0.5, 1, 0.74, 0.94, 0.98, 0.66, 1.19, 0.61, 0.67, 0.29, 0.42, 1.16, 1.33, 0.04, 0.37, 1.08, 0.61, 1.05, 1.53, 2.13, 2.56, 1.22, 2.06, 2.06, 1.2, 1.04, 1.56, 1.28, 1, 1.74, 1.76],
  //         ["Exterior Rim", 25.89, 1.04, 0.03, 0.28, 0.24, 0.21, 0.36, 0.21, 0.1, 0.25, 0.35, 0.51, 0.73, 0.62, 0.81, 0.47, 0.56, 2.44, 0.48, 0.48, 0.32, 0.31, 0.43, 0.36, 0.51, 0.08, 0.26, 1.09, 1.03, 0.31, 0.26, 0.03, 0.45, 0.01, 0.58, 0.48, 0.66, 3.99, 0.06, 0.17, 0.12, 0.27, 0.42, 0.83, 0.62],
  //         ["Interior and Exterior", 24.8, 1.47, 0.89, 0.9, 0.58, 0.42, 0.34, 0.36, 0.12, 0.33, 0.05, 0.49, 0.22, 0.3, 0.32, 1.06, 0.5, 0.24, 0.61, 0.83, 0.6, 0.6, 0.67, 0.72, 0.41, 1.18, 1.19, 0.17, 0.59, 0.98, 1.02, 1.07, 0.72, 0.55, 0.73, 0.86, 0.63, 1.16, 1.12, 0.46, 0.79, 1.07, 1.21, 1.51, 1.16],
  //     ]
  // }
  // var startYear = 1973;
  // var endYear = 2016;
  // var currentYear = 1995;
  // var colorSet = new am4core.ColorSet();

  //   // Create chart instance
  //   const chart = am4core.create('chartdiv5', am4charts.RadarChart);
  //   chart.paddingLeft = 50;
  //   // chart.numberFormatter.numberFormat = "+#.0°C|#.0°C|0.0°C";
  //   chart.hiddenState.properties.opacity = 0;

  //   chart.startAngle = 270 - 180;
  //   chart.endAngle = 270 + 180;

  //   chart.padding(5,15,5,10)
  //   chart.radius = am4core.percent(65);
  //   chart.innerRadius = am4core.percent(40);

  //   // year label goes in the middle
  //   let yearLabel = chart.radarContainer.createChild(am4core.Label);
  //   yearLabel.horizontalCenter = 'middle';
  //   yearLabel.verticalCenter = 'middle';
  //   yearLabel.fill = am4core.color('#673AB7');
  //   yearLabel.fontSize = 30;
  //   yearLabel.text = String(currentYear);

  //   // zoomout button
  //   let zoomOutButton = chart.zoomOutButton;
  //   zoomOutButton.dx = 0;
  //   zoomOutButton.dy = 0;
  //   zoomOutButton.marginBottom = 15;
  //   zoomOutButton.parent = chart.rightAxesContainer;

  //   // scrollbar
  //   chart.scrollbarX = new am4core.Scrollbar();
  //   chart.scrollbarX.parent = chart.rightAxesContainer;
  //   chart.scrollbarX.orientation = 'vertical';
  //   chart.scrollbarX.align = 'center';
  //   chart.scrollbarX.exportable = false;

  //   // vertical orientation for zoom out button and scrollbar to be positioned properly
  //   chart.rightAxesContainer.layout = 'vertical';
  //   chart.rightAxesContainer.padding(120, 20, 120, 20);

  //   // category axis
  //   const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  //   categoryAxis.renderer.grid.template.location = 0;
  //   categoryAxis.dataFields.category = 'country';

  //   let categoryAxisRenderer = categoryAxis.renderer;
  //   let categoryAxisLabel = categoryAxisRenderer.labels.template;
  //   categoryAxisLabel.location = 0.5;
  //   categoryAxisLabel.radius = 28;
  //   categoryAxisLabel.relativeRotation = 90;

  //   categoryAxisRenderer.fontSize = 11;
  //   categoryAxisRenderer.minGridDistance = 10;
  //   categoryAxisRenderer.grid.template.radius = -25;
  //   categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
  //   categoryAxisRenderer.grid.template.interactionsEnabled = false;

  //   categoryAxisRenderer.ticks.template.disabled = true;
  //   categoryAxisRenderer.axisFills.template.disabled = true;
  //   categoryAxisRenderer.line.disabled = true;

  //   categoryAxisRenderer.tooltipLocation = 0.5;
  //   categoryAxis.tooltip.defaultState.properties.opacity = 0;

  //   // value axis
  //   let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //   valueAxis.min = -3;
  //   valueAxis.max = 6;
  //   valueAxis.strictMinMax = true;
  //   valueAxis.tooltip.defaultState.properties.opacity = 0;
  //   valueAxis.tooltip.animationDuration = 0;
  //   valueAxis.cursorTooltipEnabled = true;
  //   valueAxis.zIndex = 10;

  //   let valueAxisRenderer = valueAxis.renderer;
  //   valueAxisRenderer.axisFills.template.disabled = true;
  //   valueAxisRenderer.ticks.template.disabled = true;
  //   valueAxisRenderer.minGridDistance = 20;
  //   valueAxisRenderer.grid.template.strokeOpacity = 0.05;


  //   // series
  //   let series = chart.series.push(new am4charts.RadarColumnSeries());
  //   series.columns.template.width = am4core.percent(90);
  //   series.columns.template.strokeOpacity = 0;
  //   series.dataFields.valueY = 'value' + currentYear;
  //   series.dataFields.categoryX = 'country';
  //   series.tooltipText = '{categoryX}:{valueY.value}';

  //   // this makes columns to be of a different color, depending on value
  //   series.heatRules.push({ target: series.columns.template, property: 'fill', minValue: -3, maxValue: 6, min: am4core.color('#673AB7'), max: am4core.color('#F44336'), dataField: 'valueY' });

  //   // cursor
  //   let cursor = new am4charts.RadarCursor();
  //   chart.cursor = cursor;
  //   cursor.behavior = 'zoomX';

  //   cursor.xAxis = categoryAxis;
  //   cursor.innerRadius = am4core.percent(40);
  //   cursor.lineY.disabled = true;

  //   cursor.lineX.fillOpacity = 0.2;
  //   cursor.lineX.fill = am4core.color('#000000');
  //   cursor.lineX.strokeOpacity = 0;
  //   cursor.fullWidthLineX = true;

  //   // year slider
  //   let yearSliderContainer = chart.createChild(am4core.Container);
  //   yearSliderContainer.layout = 'vertical';
  //   yearSliderContainer.padding(0, 38, 0, 38);
  //   yearSliderContainer.width = am4core.percent(100);

  //   let yearSlider = yearSliderContainer.createChild(am4core.Slider);
  //   yearSlider.events.on('rangechanged', function () {
  //       updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
  //   })
  //   yearSlider.orientation = 'horizontal';
  //   yearSlider.start = 0.5;
  //   yearSlider.exportable = false;

  //   chart.data = generateRadarData();

  //   function generateRadarData() {
  //       let data = [];
  //       let i = 0;
  //       for (let continent in temperatures) {
  //           let continentData = temperatures[continent];

  //           continentData.forEach(function (country) {
  //               let rawDataItem = { 'country': country[0] }

  //               for (let y = 2; y < country.length; y++) {
  //                   rawDataItem['value' + (startYear + y - 2)] = country[y];
  //               }

  //               data.push(rawDataItem);
  //           });

  //           createRange(continent, continentData, i);
  //           i++;

  //       }
  //       return data;
  //   }


  //   function updateRadarData(year) {
  //       if (currentYear != year) {
  //           currentYear = year;
  //           yearLabel.text = String(currentYear);
  //           series.dataFields.valueY = 'value' + currentYear;
  //           chart.invalidateRawData();
  //       }
  //   }

  //   function createRange(name, continentData, index) {

  //       let axisRange = categoryAxis.axisRanges.create();
  //       axisRange.axisFill.interactionsEnabled = true;
  //       axisRange.text = name;
  //       // first country
  //       axisRange.category = continentData[0][0];
  //       // last country
  //       axisRange.endCategory = continentData[continentData.length - 1][0];

  //       // every 3rd color for a bigger contrast
  //       axisRange.axisFill.fill = colorSet.getIndex(index * 3);
  //       axisRange.grid.disabled = true;
  //       axisRange.label.interactionsEnabled = false;
  //       axisRange.label.bent = true;

  //       let axisFill = axisRange.axisFill;
  //       axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
  //       axisFill.radius = -20; // negative radius means it is calculated from max radius
  //       axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
  //       axisFill.fillOpacity = 1;
  //       axisFill.togglable = true;

  //       axisFill.showSystemTooltip = true;
  //       axisFill.readerTitle = 'click to zoom';
  //       axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

  //       axisFill.events.on('hit', function (event) {
  //           let dataItem = event.target.dataItem;
  //           if (!event.target.isActive) {
  //               categoryAxis.zoom({ start: 0, end: 1 });
  //           }
  //           else {
  //               categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
  //           }
  //       })

  //       // hover state
  //       let hoverState = axisFill.states.create('hover');
  //       hoverState.properties.innerRadius = -10;
  //       hoverState.properties.radius = -25;

  //       let axisLabel = axisRange.label;
  //       axisLabel.location = 0.5;
  //       axisLabel.fill = am4core.color('#ffffff');
  //       axisLabel.radius = 3;
  //       axisLabel.relativeRotation = 0;
  //       }

  //       let slider = yearSliderContainer.createChild(am4core.Slider);
  //       slider.start = 1;
  //       slider.exportable = false;
  //       slider.events.on('rangechanged', function () {
  //           let start = slider.start;

  //           chart.startAngle = 270 - start * 179 - 1;
  //           chart.endAngle = 270 + start * 179 + 1;

  //           valueAxis.renderer.axisAngle = chart.startAngle;
  //       })

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
