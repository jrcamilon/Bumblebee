import { DataService } from './../../../data.service';
import { Component, OnInit, Input } from '@angular/core';
import { SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { TableGridService } from 'services/TableGridService/table-grid.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-table-grid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.scss']
})
export class TableGridComponent implements OnInit {
    @Input() data: any[];
    @Input() type: string;
    @Input() tableHeight: number;
    public dataGrid: any[];
    public filterState: any;
    public mySelection: number[] = [];
    public selectAllState: SelectAllCheckboxState = 'unchecked';

    constructor(public _tg: TableGridService, public _dataService: DataService) {
        const selected = this._dataService.selectedData.subscribe(data => {
            this.dataGrid = data;
        })
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

    public onFilterChange(filter: any) {
        this.filterState = filter;
    }


    public onSelectAllChange(checkedState: SelectAllCheckboxState, ) {
        if (checkedState === 'checked') {
            const newState: State = { filter: this.filterState };
            const newDataState = process(this.data, newState );
            this.mySelection = newDataState.data.map(ele => { return ele.id});
            this.selectAllState = 'checked';
        } else {
            this.mySelection = [];
            this.selectAllState = 'unchecked';
        }
        this._tg.selectedMarkers.next(this.mySelection);
    }

    public exportToPDF(grid: GridComponent): void {
        console.log(grid);
    }

    public exportToExcel(grid: GridComponent): void {
        console.log(grid);
      }

}