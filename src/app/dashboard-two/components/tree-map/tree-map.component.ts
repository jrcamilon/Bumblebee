import { Component, NgZone, OnInit, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// am4core.useTheme(am4themes_animated);
am4core.unuseAllThemes();
am4core.options.minPolylineStep = 5;
am4core.options.onlyShowOnViewport = true;

@Component({
  selector: 'app-tree-map',
  templateUrl: './tree-map.component.html',
  styleUrls: ['./tree-map.component.scss']
})
export class TreeMapComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  private chart: am4charts.TreeMap;
  @Input() inputData: any[] = [];
  @ViewChild('chartDiv') chartDiv: ElementRef
  @Input() customStyle = {
    'width' : '100%',
    'height' : '500px'
  }

  constructor(private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputData.previousValue !== changes.inputData.currentValue) {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          // this.amChart.dispose();
          if (this.inputData.length === 0) {
            this.chart.dispose();
          } else {
            // this.amChart.data = this.inputData;
            this.ngAfterViewInit();
          }
        }
      });
      // this.buildChart();
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create(this.chartDiv.nativeElement, am4charts.TreeMap);
      chart.data = this.inputData;
      /* Set color step */
      chart.colors.step = 2;
      /* Define data fields */
      chart.dataFields.value = 'value';
      chart.dataFields.name = 'name';
      chart.dataFields.children = 'children';
      /* Create top-level series */
      const level1 = chart.seriesTemplates.create('0');
      const level1_column = level1.columns.template;
      level1_column.fillOpacity = 0;
      level1_column.strokeOpacity = 0;
      /* Create second-level series */
      const level2 = chart.seriesTemplates.create('1');
      const level2_column = level2.columns.template;
      level2_column.column.cornerRadius(10, 10, 10, 10);
      level2_column.fillOpacity = 1;
      level2_column.stroke = am4core.color('#fff');
      level2_column.strokeWidth = 5;
      level2_column.strokeOpacity = 1;

      const level2_bullet = level2.bullets.push(new am4charts.LabelBullet());
      level2_bullet.locationY = 0.5;
      level2_bullet.locationX = 0.5;
      level2_bullet.label.text = '{name}';
      level2_bullet.label.fill = am4core.color('#fff');

      /* Add a navigation bar */
      // chart.navigationBar = new am4charts.NavigationBar();

      /* Add a lagend */
      chart.legend = new am4charts.Legend();

      this.chart = chart;
    });
  }


  buildChart() {

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
