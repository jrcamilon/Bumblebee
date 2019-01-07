import { Component, OnInit, Input,Output } from '@angular/core';
import { DataService } from 'app/data.service';
import { PlotBand } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-materialcard',
  templateUrl: './materialcard.component.html',
  styleUrls: ['./materialcard.component.scss']
})
export class MaterialcardComponent implements OnInit {

  @Input() Title: String;
  @Input() Subtitle: String;
  @Input() Content: String;
  @Input() Data: any[];
  @Output() Panel2Title: String = 'Count Proportion of Fabrics Blackened';
  isPanel1: any = false;
  isPanel2: any= false;
  isPanel3: any = false;
  isPanel4: any= false;
  isPanel5: any = false;
  isPanel6: any= false;
  isPanel7: any = false;
  isPanel8: any= false;
  public chartdata= [];
  public panel2interior =[];
  public panel2exterior=[];
  public panel2both=[];
  public  panel2null = [];
  public barChartObj  = {};
  public pieData: any = [
    { category: 'Eaten', value: 0.42 },
    { category: 'Not eaten', value: 0.58 }
  ]
  // public panel3Title = 'Blackened'
  public hidden: any = { visible: false };
  public tempPlotBands: PlotBand[] = [{
      from: 30, to: 45, color: '#e62325', opacity: 1
  }, {
      from: 15, to: 30, color: '#ffc000', opacity: 1
  }, {
      from: 0, to: 15, color: '#37b400', opacity: 1
  }, {
      from: -10, to: 0, color: '#5392ff', opacity: 1
  }];
  public humPlotBands: PlotBand[] = [{
      from: 0, to: 33, color: '#ccc', opacity: .6
  }, {
      from: 33, to: 66, color: '#ccc', opacity: .3
  }];
  public mmhgPlotBands: PlotBand[] = [{
      from: 715, to: 752, color: '#ccc', opacity: .6
  }, {
      from: 752, to: 772, color: '#ccc', opacity: .3
  }];
  public temp: any[] = [[25, 22]];
  public hum: any[] = [[45, 60]];
  public mmhg: any[] = [[750, 762]];
  public style: string = 'normal';
  public data: any[] = [
      [0, 20], [1, 1], [2, 18], [3, 3],
      [4, 15], [5, 5], [6, 10], [7, 6],
      [8, 9], [9, 6], [10, 10], [11, 5],
      [12, 13], [13, 3], [14, 16], [15, 1],
      [16, 19], [17, 1], [18, 20], [19, 2],
      [20, 18], [21, 5], [22, 12], [23, 7],
      [24, 10], [25, 8]
  ];
  public model = [{
    stat: 'Body Sherds ',
    count: 434823,
    color: '#0e5a7e'
  }, {
    stat: 'Rim Tstc',
    count: 356854,
    color: '#166f99'
  }, {
    stat: 'Hem Cups ',
    count: 280022,
    color: '#2185b4'
  }, {
    stat: 'Flattened Base',
    count: 190374,
    color: '#319fd2'
  }, {
    stat: 'Other',
    count: 120392,
    color: '#3eaee2'
  }];
    // Percentage of Fabrics Total Count
    public panel1Data = [
      { name: "NS I", value: .32 },
      { name: "NS II", value: .12 },
      { name: "NS III", value: .16},
      { name: "MARL", value: .40 }
    ];
    // Percentage of Fabrics Total Count
    public panel3BlackenedData = [
      
    ]
    public panel3NonBlackenedData = [
      
    ]
    
  constructor(private _ds: DataService) { 
  
}
  ngOnInit() {
  this.runQueries();
  this.isPanel1 = (this.Content === 'panel1');
  this.isPanel2 = (this.Content === 'panel2');
  this.isPanel3 = (this.Content === 'panel3');
  this.isPanel4 = (this.Content === 'panel4'); 
  this.isPanel5 = (this.Content === 'panel5'); 
  this.isPanel6 = (this.Content === 'panel6');
  this.isPanel7 = (this.Content === 'panel7');
  this.isPanel8 = (this.Content === 'panel8');
  
  }



  public labelContent(e: any): string {
      return `${ e.dataItem.time.substring(0, 2) }h`;
  }
  runQueries(): void {

    this.getCountWeightPerFabric();
    this.getTotalPercentBlackened();

    this.getPercentOfDiagnostics();
    this.getPercentOfFireBlackenedExt();
    this.getCountOfFireBlackenedExt();
    this.getPercentOfFireBlackenedInt();
    this.getCountOfFireBlackenedInt();
    this.getPercentOfFireBlackenedIntExt();
    this.getCountOfFireBlackenedIntExt();
  }
  /** TODO: Remove once validated that Panel 1 Visualization is OK */
  // getTotalWeightPerFabric(): void {
  //   this._ds.getTotalWeightPerFabric().subscribe(data => {
  //     if(this.isPanel2){
  //       this.chartdata = data;
  //     }
  //     console.log(data);
  //   });
  // }
  getCountWeightPerFabric(): void {
    this._ds.getTotalWeightCountPerFabric().subscribe(data => {
      console.log(data);
      if(this.isPanel1){
        this.chartdata = data;
      }
    });
  }
  getTotalPercentBlackened(): void {
    this._ds.getTotalPercentBlackened().subscribe(data => {
      console.log(data);
      if(this.isPanel2){
        this.panel2exterior = data.exterior;
        this.panel2interior = data.interior;
        this.panel2both= data.both;
        this.panel2null = data.empty;
      }
    });
  }
  getPercentOfDiagnostics(): void {
    this._ds.getPercentOfDiagnostics().subscribe(data => {
      console.log(data);
    });
  }
  getPercentOfFireBlackenedExt(): void {
    this._ds.getPercentOfFireBlackenedExt().subscribe(data => {
      console.log(data);
    });
  }
  getCountOfFireBlackenedExt(): void {
    this._ds.getCountOfFireBlackenedExt().subscribe(data => {
      if(this.isPanel3){
        // this.barChartObj = this.panel3Data;
      }
      console.log(data);
    });
  }
  getPercentOfFireBlackenedInt(): void {
    this._ds.getPercentOfFireBlackenedInt().subscribe(data => {
      console.log(data);
    });
  }
  getCountOfFireBlackenedInt(): void {
    this._ds.getCountOfFireBlackenedInt().subscribe(data => {
      console.log(data);
    });
  }
  getPercentOfFireBlackenedIntExt(): void {
    this._ds.getPercentOfFireBlackenedIntExt().subscribe(data => {
      console.log(data);
    });
  }
  getCountOfFireBlackenedIntExt(): void {
    this._ds.getCountOfFireBlackenedIntExt().subscribe(data => {
      console.log(data);
    });
  }
  changePanel2(): void {
    let isCount = (this.Panel2Title === 'Count Proportion of Fabrics Blackened');
    if(isCount){
      this.Panel2Title = 'Weight Proportion of Fabrics Blackened'
      this._ds.getWeightPercentBlackened().subscribe(data => {
          this.panel2exterior = data.exterior;
          this.panel2interior = data.interior;
          this.panel2both= data.both;
          this.panel2null = data.empty;
      });
    } 
    else {
      this.Panel2Title = 'Count Proportion of Fabrics Blackened'
      this._ds.getTotalPercentBlackened().subscribe(data => {
          this.panel2exterior = data.exterior;
          this.panel2interior = data.interior;
          this.panel2both= data.both;
          this.panel2null = data.empty;
      });
    }
    
  }
}
