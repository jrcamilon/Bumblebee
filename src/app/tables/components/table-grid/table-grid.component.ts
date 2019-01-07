import { Component, OnInit, Input } from '@angular/core';
import { GridDataResult, PageChangeEvent, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { TableGridService } from './table-grid.service';
import { GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {
  @Input() data: any[];
  @Input() type: string;
  @Input() tableHeight: number;

  public mySelection: number[] = [];
  public selectAllState: SelectAllCheckboxState = 'unchecked';

  constructor(public _tg: TableGridService) {

  }

  ngOnInit() {

  }

    public onSelectedKeysChange(e) {
        const len = this.mySelection.length;
        if (len === 0) {
            this.selectAllState = 'unchecked';
        } else if (len > 0 && len < this.data.length) {
            this.selectAllState = 'indeterminate';
        } else {
            this.selectAllState = 'checked';
        }
        this._tg.selectedMarkers.next(this.mySelection);
    }

    public onSelectAllChange(checkedState: SelectAllCheckboxState) {
        if (checkedState === 'checked') {
            this.mySelection = this.data.map((item) => item.id);
            this.selectAllState = 'checked';
        } else {
            this.mySelection = [];
            this.selectAllState = 'unchecked';
        }
        this._tg.selectedMarkers.next(this.mySelection);
    }

    public exportToPDF(grid: GridComponent): void {
        console.log(grid);
        // grid.saveAsPDF();
    }

    public exportToExcel(grid: GridComponent): void {
        console.log(grid);
        // grid.saveAsExcel();
      }

}
