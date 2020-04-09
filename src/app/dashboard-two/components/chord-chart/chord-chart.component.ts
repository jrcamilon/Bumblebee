import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, NgZone, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.options.queue = true;

@Component({
  selector: 'app-chord-chart',
  templateUrl: './chord-chart.component.html',
  styleUrls: ['./chord-chart.component.scss']
})
export class ChordChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public chart: am4charts.ChordDiagram;
  @Input() inputData: any[];
  @ViewChild('chartDiv') chartDiv: ElementRef;

  constructor(private zone: NgZone) {

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
    const chart = am4core.create(this.chartDiv.nativeElement, am4charts.ChordDiagram);
    chart.hiddenState.properties.opacity = 0;
    chart.responsive.enabled = true;

    chart.data = this.inputData;
    chart.dataFields.fromName = 'from';
    chart.dataFields.toName = 'to';
    chart.dataFields.value = 'value';

    // make nodes draggable
    const nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = 'Click to show/hide or drag to rearrange';
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer


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
