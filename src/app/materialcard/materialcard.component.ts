import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'app/data.service';

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
  isPanel1: any = false;
  isPanel2: any= false;
  isPanel3: any = false;
  isPanel4: any= false;
  isPanel5: any = false;
  isPanel6: any= false;
  isPanel7: any = false;
  isPanel8: any= false;
  public chartdata= [];

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
    public panel2Data = [
      { name: "NS I", value: .24 },
      { name: "NS II", value: .25 },
      { name: "NS III", value: .40},
      { name: "MARL", value: .11 }
    ];
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
    this.getTotalWeightPerFabric();
    this.getCountOfWeightPerFabric();
    this.getPercentOfDiagnostics();
    this.getPercentOfFireBlackenedExt();
    this.getCountOfFireBlackenedExt();
    this.getPercentOfFireBlackenedInt();
    this.getCountOfFireBlackenedInt();
    this.getPercentOfFireBlackenedIntExt();
    this.getCountOfFireBlackenedIntExt();
  }
  getTotalWeightPerFabric(): void {
    this._ds.getTotalWeightPerFabric().subscribe(data => {
      if(this.isPanel2){
        this.chartdata = data;
      }
      console.log(data);
    });
  }
  getCountOfWeightPerFabric(): void {
    this._ds.getCountOfWeightPerFabric().subscribe(data => {
      console.log(data);
      if(this.isPanel1){
        this.chartdata = data;
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
}
