import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-materialcard',
  templateUrl: './materialcard.component.html',
  styleUrls: ['./materialcard.component.scss']
})
export class MaterialcardComponent implements OnInit {

  @Input() Title: String;
  @Input() Subtitle: String;
  @Input() Content: String;

  isPanel1: any = false;
  isPanel2: any= false;
  isPanel3: any = false;
  isPanel4: any= false;
  isPanel5: any = false;
  isPanel6: any= false;
  isPanel7: any = false;
  isPanel8: any= false;
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
  constructor() { 
  
}
  ngOnInit() {
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
}
