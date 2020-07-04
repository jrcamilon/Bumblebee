import { Component, NgZone, OnInit, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-clustered-column',
  templateUrl: './clustered-column.component.html',
  styleUrls: ['./clustered-column.component.scss']
})
export class ClusteredColumnComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  public chart;
  @Input() inputData: any[];
  @Input() inputSeries: any[];
  @ViewChild('chartDiv') chartDiv: ElementRef
  @Input() customStyle = {
    'width' : '100%',
    'height' : '500px'
  }
  xAxis;

  constructor(private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputData.previousValue !== changes.inputData.currentValue) {
      this.zone.runOutsideAngular(() => {
        this.chart.dispose();
        if (this.chart) {
          this.buildChart();
        }
      });
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.buildChart();
    });
  }

  createSeries(value, name) {
    const series = this.chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.valueY = value
    series.dataFields.categoryX = 'category'
    series.name = name

    series.events.on('hidden', this.arrangeColumns);
    series.events.on('shown', this.arrangeColumns);

    const bullet = series.bullets.push(new am4charts.LabelBullet())
    bullet.interactionsEnabled = false
    bullet.dy = 30;
    bullet.label.text = '{valueY}'
    bullet.label.fill = am4core.color('#ffffff');

    series.columns.template.tooltipText = 'Series: {name}\nCategory: {categoryX}\nValue: {valueY}';

    return series;
  }

  arrangeColumns() {

    const series = this.chart.series.getIndex(0);

    const w = 1 - this.xAxis.renderer.cellStartLocation - (1 - this.xAxis.renderer.cellEndLocation);
    if (series.dataItems.length > 1) {
        const x0 = this.xAxis.getX(series.dataItems.getIndex(0), 'categoryX');
        const x1 = this.xAxis.getX(series.dataItems.getIndex(1), 'categoryX');
        const delta = ((x1 - x0) / this.chart.series.length) * w;
        if (am4core.isNumber(delta)) {
            const middle = this.chart.series.length / 2;

            let newIndex = 0;
            this.chart.series.forEach((s) => {
                if (!s.isHidden && !s.isHiding) {
                    s.dummyData = newIndex;
                    newIndex++;
                } else {
                    series.dummyData = this.chart.series.indexOf(series);
                }
            })
            const visibleCount = newIndex;
            const newMiddle = visibleCount / 2;

            this.chart.series.forEach(function(series2) {
                const trueIndex = this.chart.series.indexOf(series2);
                const newIndex2 = series.dummyData;

                const dx = (newIndex2 - trueIndex + middle - newMiddle) * delta

                series.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
                series.bulletsContainer.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
            })
        }
    }
  }


  buildChart() {

    this.chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart)
    this.chart.colors.step = 2;

    this.chart.legend = new am4charts.Legend()
    this.chart.legend.position = 'top'
    this.chart.legend.paddingBottom = 20
    this.chart.legend.labels.template.maxWidth = 95

    this.xAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
    this.xAxis.dataFields.category = 'category'
    this.xAxis.renderer.cellStartLocation = 0.1
    this.xAxis.renderer.cellEndLocation = 0.9
    this.xAxis.renderer.grid.template.location = 0;

    const yAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;



    // this.chart.data = [
    //     {
    //         category: 'Panel 1',
    //         Unslipped: 40,
    //         1: 55,
    //         2: 60
    //     },
    //     {
    //         category: 'Panel 2',
    //         0: 30,
    //         1: 78,
    //         2: 69,
    //         3: 33
    //     }
    // ]

    this.chart.data = this.inputData;

    // console.log(this.inputSeries);

    this.inputSeries.forEach((series, i) => {
      this.createSeries(series, series);
    });


    // this.createSeries('0', 'Unslipped');
    // this.createSeries('1', 'The Second');
    // this.createSeries('2', 'The Third');
    // this.createSeries('3', 'N/A');


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
