import { TableGridService } from './../tables/components/table-grid/table-grid.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';


@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  public data: any[];
  public selection: string;
  public forms = ['Red Notebook', 'Elephantine'];

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
  constructor(private _ds: DataService, public _tableGridService: TableGridService) {

  }

  ngOnInit() {
    this.selection = this.forms[0];
    this.onFormSelect(this.selection);
  }

  getAllElephantine(): void {
    this._ds.getElephantineData()
    .subscribe((res) => {
      this.data = this._tableGridService.processElephantine(res);
      console.log(this.data);
    },
    (err) => {
      alert('error with api');
    });
  }

  getAllRedData(): void {
    this._ds.getRedNotebookData()
    .subscribe((res) => {
      this.data = this._tableGridService.processRed(res);
      console.log(this.data);
    },
    (err) => {
      alert('error with api');
    });
  }

}
