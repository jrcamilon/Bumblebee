import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { TableGridService } from './components/table-grid/table-grid.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [TableGridService]
})
export class TablesComponent implements OnInit {

  selection: string;
  data: any;
  forms = ['Red Notebook', 'Elephantine'];

  constructor(private _ds: DataService, private _tableGirdService: TableGridService) {
    console.log('here');
  }

  ngOnInit() {
    this.selection = this.forms[0];
    this.onFormSelect(this.selection);
  }

  runQueries() {
    this.selection = this.forms[0];
    this.getAllElephantine();
    this.getAllRedData();
  }

  onFormSelect(form: any) {
    this.selection = form;
    switch (this.selection) {
      case 'Red Notebook':
        this.getAllRedData();
        break;
      case 'Elephantine':
        this.getAllElephantine();
        break;
    }
  }

  getAllElephantine(): void {
    this._ds.getElephantineData()
    .subscribe((res) => {
      this.data = this._tableGirdService.processElephantine(res);
      console.log(this.data);
    },
    (err) => {
      alert('error with api');
    });

  }

  getAllRedData(): void {
    this._ds.getRedNotebookData()
    .subscribe((res) => {
      this.data = this._tableGirdService.processRed(res);
      console.log(this.data);
    },
    (err) => {
      alert('error with api');
    });
  }

}
