import { MaterialcardService } from 'services/MaterialCardService/materialcard.service';
import { Component, OnInit, Input, Output } from '@angular/core';
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
  @Output() DynamicTitle: String = 'Count Proportion of Fabrics Blackened';

  isPanel1: any = false;
  isPanel2: any = false;
  isPanel3: any = false;
  isPanel4: any = false;
  isPanel5: any = false;
  isPanel6: any = false;
  isPanel7: any = false;
  isPanel8: any = false;


  constructor(
    private _ds: DataService,
    public _materialCardService: MaterialcardService) {

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
    if (this.isPanel7) {
      this.DynamicTitle = 'Count Proportion of Fabrics Blackened';
    }
    if (this.isPanel3) {
      this.DynamicTitle = 'Count Proportion of Types'
    }
  }



  public labelContent(e: any): string {
    return `${e.dataItem.time.substring(0, 2)}h`;
  }
  

 
  changePanel(): void {
    let isCount;

    if (this.isPanel7) {
      isCount = (this.DynamicTitle === 'Count Proportion of Fabrics Blackened');
      if (isCount) {
        this.DynamicTitle = 'Weight Proportion of Fabrics Blackened'
      }
      else {
        this.DynamicTitle = 'Count Proportion of Fabrics Blackened'
      }
      this._materialCardService.isCount.next(!isCount);

    } else if (this.isPanel3) {
      isCount = (this.DynamicTitle === 'Count Proportion of Types');
      if (isCount) {
        this.DynamicTitle = 'Weight Proportion of Types'
      }
      else {
        this.DynamicTitle = 'Count Proportion of Types'
      }
      this._materialCardService.panel3IsCount.next(!isCount);
    }
  }
}
