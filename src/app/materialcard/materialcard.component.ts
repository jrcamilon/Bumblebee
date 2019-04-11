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
  @Input() color: string;

  isPanel1: any = false;
  isPanel2: any = false;
  isPanel3: any = false;
  isPanel4: any = false;
  isPanel5: any = false;
  isPanel6: any = false;
  isPanel7: any = false;
  isPanel8: any = false;
  isPanel9: any = false;
  isPanel10: any = false;

  bgColor = {
    'background-color': ''
  };

  constructor(
    private _ds: DataService,
    public _materialCardService: MaterialcardService) {

  }

  ngOnInit() {
    this.setBgColor();
    this.isPanel1 = (this.Content === 'panel1');
    this.isPanel2 = (this.Content === 'panel2');
    this.isPanel3 = (this.Content === 'panel3');
    this.isPanel4 = (this.Content === 'panel4');
    this.isPanel5 = (this.Content === 'panel5');
    this.isPanel6 = (this.Content === 'panel6');
    this.isPanel7 = (this.Content === 'panel7');
    this.isPanel8 = (this.Content === 'panel8');
    this.isPanel9 = (this.Content === 'panel9');
    this.isPanel10 = (this.Content === 'panel10');

    if (this.isPanel7) {
      this.DynamicTitle = 'Ele: Blackening by Fabric Type (Count)';
    }
    if (this.isPanel3) {
      this.DynamicTitle = 'Ele: Proportion of Types (Count)'
    }
    if (this.isPanel10) {
      this.DynamicTitle = 'KHPP: Blackening by Fabric Type (Count)'
    }
  }

  public setBgColor(): void {

    this.bgColor['background-color'] = this.color;
  }

  public labelContent(e: any): string {
    return `${e.dataItem.time.substring(0, 2)}h`;
  }



  changePanel(): void {
    let isCount;

    if (this.isPanel7) {
      isCount = (this.DynamicTitle === 'Ele: Blackening by Fabric Type (Count)');
      if (isCount) {
        this.DynamicTitle = 'Ele: Blackening by Fabric Type (Weight)'
      } else {
        this.DynamicTitle = 'Ele: Blackening by Fabric Type (Count)'
      }
      this._materialCardService.isCount.next(!isCount);

    } else if (this.isPanel3) {
      isCount = (this.DynamicTitle === 'Ele: Proportion of Types (Count)');
      if (isCount) {
        this.DynamicTitle = 'Ele: Proportion of Types (Weight)'
      } else {
        this.DynamicTitle = 'Ele: Proportion of Types (Count)'
      }
      this._materialCardService.panel3IsCount.next(!isCount);
    } else if (this.isPanel10) {
      isCount = (this.DynamicTitle === 'KHPP: Blackening by Fabric Type (Count)');
      if (isCount) {
        this.DynamicTitle = 'KHPP: Blackening by Fabric Type (Weight)'
      } else {
        this.DynamicTitle = 'KHPP: Blackening by Fabric Type (Count)'
      }
      this._materialCardService.panel10IsCount.next(!isCount);

    }
  }
}
