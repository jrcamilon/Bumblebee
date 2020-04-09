import { Component, NgZone, OnInit, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('chartDiv') chartDiv: ElementRef
  @Input() customStyle = {
    'width' : '100%',
    'height' : '500px'
  }


  constructor(private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputData.previousValue !== changes.inputData.currentValue) {
      this.chart.data = this.inputData;
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.buildChart();
    });
  }


  buildChart() {
    // console.log('TREEMAP');
       this.chart = am4core.create(this.chartDiv.nativeElement, am4charts.TreeMap);
      this.chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      // console.log(this.inputData);

      this.chart.data = this.inputData;

      this.chart.responsive.enabled = true;

      this.chart.colors.step = 2;
      this.chart.padding(0, 0, 0, 0);
      // define data fields
      this.chart.dataFields.value = 'value';
      this.chart.dataFields.name = 'name';
      this.chart.dataFields.children = 'children';
      this.chart.layoutAlgorithm = this.chart.binaryTree;

      this.chart.zoomable = true;
      // level 0 series template
      const level0SeriesTemplate = this.chart.seriesTemplates.create('0');
      const level0ColumnTemplate = level0SeriesTemplate.columns.template;


      level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
      level0ColumnTemplate.column.fillOpacity = 0;
      level0ColumnTemplate.column.strokeWidth = 4;
      level0ColumnTemplate.column.strokeOpacity = 0;

      // level 1 series template
      const level1SeriesTemplate = this.chart.seriesTemplates.create('1');
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
      this.chart.navigationBar = new am4charts.NavigationBar();

      /* Add a lagend */
      this.chart.legend = new am4charts.Legend();

      this.chart.maxLevels = 2;

      // this.chart = this.chart;
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
