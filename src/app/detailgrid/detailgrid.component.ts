import { DataService } from 'app/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { GridDataResult, PageChangeEvent, SelectAllCheckboxState, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { TableGridService } from 'services/TableGridService/table-grid.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-detailgrid',
  templateUrl: './detailgrid.component.html',
  styleUrls: ['./detailgrid.component.scss']
})
export class DetailgridComponent implements OnInit {

  @Input() data: any[];
    @Input() type: string;
    @Input() tableHeight: number;
    public dataGrid: any[];

    public mySelection: number[] = [];
    public selectAllState: SelectAllCheckboxState = 'unchecked';

    constructor(public _tg: TableGridService, public _dataService: DataService) {
        const selected = this._dataService.selectedData.subscribe(data => {
            this.dataGrid = data;
        })
    }

    ngOnInit() {
        // console.log(this.data);
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
