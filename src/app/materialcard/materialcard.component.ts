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

  public banksData = [
    { name: "JP Morgan", pre: 116, post: 64 },
    { name: "HSBC", pre: 165, post: 85 },
    { name: "Credit Suisse", pre: 215, post: 97 },
    { name: "Goldman Sachs", pre: 75, post: 27 },
    { name: "Morgan Stanley", pre: 100, post: 16 },
    { name: "Societe Generale", pre: 49, post: 26 },
    { name: "UBS", pre: 80, post: 35 },
    { name: "BNP Paribas", pre: 116, post: 32 },
    { name: "Unicredit", pre: 108, post: 26 },
    { name: "Credit Agricole", pre: 90, post: 17 },
    { name: "Deutsche Bank", pre: 67, post: 10 },
    { name: "Barclays", pre: 76, post: 7 },
    { name: "Citigroup",  pre: 91, post: 19 },
    { name: "RBS", pre: 255, post: 5 }
  ];

  public labelContent(e: any): string {
      return `${ e.dataItem.time.substring(0, 2) }h`;
  }
}
