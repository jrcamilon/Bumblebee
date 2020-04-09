import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, NgZone, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('chartDiv') chartDiv: ElementRef;

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
  //     'Ware': [
  //         ['Coarse', 1, 5, 6, 4, 8, 2, 1],
  //         ['Medium', 1, 5, 6, 4, 8, 2, 1],
  //         ['Fine', 1, 5, 6, 4, 8, 2, 1],
  //         ['MarlA', 1, 5, 6, 4, 8, 2, 1],
  //         ['MarlC', 1, 5, 6, 4, 8, 2, 1],
  //         ['Other Marl', 1, 5, 6, 4, 8, 2, 1],
  //         ['NOWARE', 1, 5, 6, 4, 8, 2, 1],
  //         ['MarlA2', 1, 5, 6, 4, 8, 2, 1],
  //         ['MKBM', 1, 5, 6, 4, 8, 2, 1],
  //         ['Marl', 1, 5, 6, 4, 8, 2, 1],
  //         ['Marl >', 1, 5, 6, 4, 8, 2, 1],
  //     ],
  //     'Surface Treatment': [
  //         ['Unslipped', 1, 5, 6, 4, 8, 2, 1],
  //         ['R Slip In', 1, 5, 6, 4, 8, 2, 1],
  //         ['R Slip Out', 1, 5, 6, 4, 8, 2, 1],
  //         ['Cream Slip On', 1, 5, 6, 4, 8, 2, 1],
  //         ['Cream Slip Out', 1, 5, 6, 4, 8, 2, 1],
  //         ['NOSURFACETREATMENT', 1, 5, 6, 4, 8, 2, 1],
  //         ['Black Slip In/Out', 1, 5, 6, 4, 8, 2, 1],
  //         ['Black Other', 1, 5, 6, 4, 8, 2, 1],
  //         ['Black Slip In', 1, 5, 6, 4, 8, 2, 1],
  //     ],
  //     'Blackening': [
  //         ['None', 1, 5, 6, 4, 8, 2, 1],
  //         ['In', 1, 5, 6, 4, 8, 2, 1],
  //         ['Out', 1, 5, 6, 4, 8, 2, 1],
  //         ['In/Out', 1, 5, 6, 4, 8, 2, 1],
  //         ['Exterior', 1, 5, 6, 4, 8, 2, 1],
  //         ['Interior', 1, 5, 6, 4, 8, 2, 1],
  //         ['Exterior Rim', 1, 5, 6, 4, 8, 2, 1],
  //         ['Interior and Exterior', 1, 5, 6, 4, 8, 2, 1],
  //     ]
  // }
  // const startYear = 1;
  // const endYear = 7;
  // const currentYear = 0;
  // const colorSet = new am4core.ColorSet();

  //   // Create chart instance
  //   const chart = am4core.create(this.chartDiv.nativeElement, am4charts.RadarChart);
  //   chart.paddingLeft = 50;
  //   // chart.numberFormatter.numberFormat = "+#.0°C|#.0°C|0.0°C";
  //   chart.hiddenState.properties.opacity = 0;

  //   chart.startAngle = 270 - 180;
  //   chart.endAngle = 270 + 180;

  //   console.log('ANGLE', chart.startAngle);
  //   console.log('ANGLE2', chart.endAngle);

  //   chart.padding(5, 15 , 5, 10)
  //   chart.radius = am4core.percent(65);
  //   chart.innerRadius = am4core.percent(40);

  //   // year label goes in the middle
  //   const yearLabel = chart.radarContainer.createChild(am4core.Label);
  //   yearLabel.horizontalCenter = 'middle';
  //   yearLabel.verticalCenter = 'middle';
  //   yearLabel.fill = am4core.color('#673AB7');
  //   yearLabel.fontSize = 30;
  //   yearLabel.text = String(currentYear);

  //   // zoomout button
  //   const zoomOutButton = chart.zoomOutButton;
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
  //   const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis);
  //   categoryAxis.renderer.grid.template.location = 0;
  //   categoryAxis.dataFields.category = 'country';

  //   const categoryAxisRenderer = categoryAxis.renderer;
  //   const categoryAxisLabel = categoryAxisRenderer.labels.template;
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
  //           console.log('ANGLECHANGE', chart.startAngle, chart.endAngle);

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
