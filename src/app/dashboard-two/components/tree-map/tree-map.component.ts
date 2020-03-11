import { Component, NgZone, OnInit, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.scss']
})
export class TreeMapComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public chart: am4charts.TreeMap;
  @Input() inputData: any[];

  constructor(private zone: NgZone) {
    // console.log('TREEMAP');
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.inputData);
    if (changes.inputData.previousValue !== changes.inputData.currentValue) {
      // console.log(changes.inputData.currentValue);
      // console.log(this.chart);
      // this.loadNewData(this.chart, changes.inputData.currentValue);
      this.buildChart();
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.buildChart();
    });
  }

  buildChart() {
    // console.log('TREEMAP');
      const chart = am4core.create('chartdiv', am4charts.TreeMap);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      // console.log(this.inputData);

      chart.data = this.inputData;


      chart.colors.step = 2;
      chart.padding(0, 0, 0, 0);
      // define data fields
      chart.dataFields.value = 'value';
      chart.dataFields.name = 'name';
      chart.dataFields.children = 'children';
      chart.layoutAlgorithm = chart.binaryTree;

      chart.zoomable = true;
      // level 0 series template
      const level0SeriesTemplate = chart.seriesTemplates.create('0');
      const level0ColumnTemplate = level0SeriesTemplate.columns.template;

      level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
      level0ColumnTemplate.column.fillOpacity = 0;
      level0ColumnTemplate.column.strokeWidth = 4;
      level0ColumnTemplate.column.strokeOpacity = 0;

      // level 1 series template
      const level1SeriesTemplate = chart.seriesTemplates.create('1');
      const level1ColumnTemplate = level1SeriesTemplate.columns.template;

      level1SeriesTemplate.tooltip.animationDuration = 0;
      level1SeriesTemplate.tooltip.dy = -15;
      level1SeriesTemplate.tooltip.pointerOrientation = 'vertical';
      level1SeriesTemplate.strokeOpacity = 1;

      level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10)
      level1ColumnTemplate.column.fillOpacity = 1;
      level1ColumnTemplate.column.strokeWidth = 4;
      level1ColumnTemplate.column.stroke = am4core.color('#ffffff');

      const bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
      bullet1.locationY = 0.5;
      bullet1.locationX = 0.5;
      bullet1.label.text = '{name}';
      bullet1.label.fill = am4core.color('#ffffff');

      /* Add a navigation bar */
      chart.navigationBar = new am4charts.NavigationBar();

      /* Add a lagend */
      chart.legend = new am4charts.Legend();

      chart.maxLevels = 2;

      this.chart = chart;
  }

  loadNewData(chart: any, data: any) {
    // console.log('TREEMAP');
    chart.data = data;
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
