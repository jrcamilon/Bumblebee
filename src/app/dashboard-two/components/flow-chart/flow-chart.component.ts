import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, Input, NgZone, SimpleChanges } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-flow-chart',
  templateUrl: './flow-chart.component.html',
  styleUrls: ['./flow-chart.component.scss']
})
export class FlowChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

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
      this.buildChart();
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.buildChart();
    });
  }

  buildChart() {
    // const chart = am4core.create('chartdiv2', am4charts.SankeyDiagram);
    // chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    // chart.marginRight = 100;
    // chart.data = this.inputData;
    // const hoverState = chart.links.template.states.create('hover');
    // hoverState.properties.fillOpacity = 0.6;
    // chart.dataFields.fromName = 'from';
    // chart.dataFields.toName = 'to';
    // chart.dataFields.value = 'value';
    // chart.links.template.propertyFields.id = 'id';
    // chart.links.template.colorMode = 'solid';
    // chart.links.template.fill = new am4core.InterfaceColorSet().getFor('alternativeBackground');
    // chart.links.template.fillOpacity = 0.1;
    // chart.links.template.tooltipText = '';

    // // highlight all links with the same id beginning
    // chart.links.template.events.on('over', function(event) {
    //   const link = event.target;
    //   const id = link.id.split('-')[0];

    //   // tslint:disable-next-line: no-shadowed-variable
    //   chart.links.each((link) => {
    //     if (link.id.indexOf(id) !== -1){
    //       link.isHover = true;
    //     }
    //   })
    // })

    // chart.links.template.events.on('out', function(event) {
    //   chart.links.each(function(link) {
    //     link.isHover = false;
    //   })
    // })

    // // for right-most label to fit
    // chart.paddingRight = 100;

    // // make nodes draggable
    // const nodeTemplate = chart.nodes.template;
    // nodeTemplate.inert = true;
    // nodeTemplate.width = 20;
    // nodeTemplate.readerTitle = 'Click to show/hide or drag to rearrange';
    // nodeTemplate.showSystemTooltip = true;
    // nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    // // Create chart instance
    const chart = am4core.create('chartdiv2', am4charts.SankeyDiagram);

    chart.data = this.inputData;

    // Configure data fields
    chart.dataFields.fromName = 'from';
    chart.dataFields.toName = 'to';
    chart.dataFields.value = 'value';

    // Configure nodes
    const nodeTemplate = chart.nodes.template;
    nodeTemplate.width = 30;
    // nodeTemplate.stroke = am4core.color('#fff');
    // nodeTemplate.strokeWidth = 2;
    // nodeTemplate.nameLabel.locationX = 0.2;
    nodeTemplate.nameLabel.label.fill = am4core.color('#3c3c3c');
    nodeTemplate.nameLabel.label.fontWeight = 'bold';

    chart.paddingRight = 50;

    // Configure links
    const linkTemplate = chart.links.template;
    linkTemplate.tension = 2;
    linkTemplate.controlPointDistance = 0.1;
    linkTemplate.fill = am4core.color('#A8C686');

    // chart.legend = new am4charts.Legend();


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
