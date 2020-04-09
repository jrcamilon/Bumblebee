import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, NgZone, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.unuseAllThemes();
// tslint:disable-next-line: no-unused-expression
am4core.options.minPolylineStep = 5;
am4core.options.onlyShowOnViewport = true;

@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.scss']
})
export class FlowChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  // public chart: am4charts.TreeMap;
  public amChart;
  @Input() inputData: any[];
  @Input() customStyle = {
    'width': '100%',
    'height': '500px'
  }
  @ViewChild('chartDiv') chartDiv: ElementRef;

  constructor(private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputData.previousValue !== changes.inputData.currentValue) {
      this.zone.runOutsideAngular(() => {
        if (this.amChart) {
          this.amChart.dispose();
        }
      });
      this.buildChart();
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.buildChart();
    });
  }

  setData() {
    this.amChart.data = this.inputData;
  }

  buildChart() {

    this.amChart = am4core.create(this.chartDiv.nativeElement, am4charts.SankeyDiagram);

    this.amChart.data = this.inputData;

    this.amChart.responsive.enabled = true;

    // Configure data fields
    this.amChart.dataFields.fromName = 'from';
    this.amChart.dataFields.toName = 'to';
    this.amChart.dataFields.value = 'value';

    // Configure nodes
    const nodeTemplate = this.amChart.nodes.template;
    nodeTemplate.width = 30;
    // nodeTemplate.stroke = am4core.color('#fff');
    // nodeTemplate.strokeWidth = 2;
    // nodeTemplate.nameLabel.locationX = 0.2;
    nodeTemplate.nameLabel.label.fill = am4core.color('#3c3c3c');
    nodeTemplate.nameLabel.label.fontWeight = 'bold';

    this.amChart.paddingRight = 50;

    // Configure links
    const linkTemplate = this.amChart.links.template;
    linkTemplate.tension = 2;
    linkTemplate.controlPointDistance = 0.1;
    linkTemplate.fill = am4core.color('#A8C686');
  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.amChart) {
        this.amChart.dispose();
      }
    });
  }

  ngOnInit() {
  }

}
