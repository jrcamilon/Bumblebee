import { TableGridService } from './../tables/components/table-grid/table-grid.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/data.service';
import { CeramicsFormService } from './components/ceramics-form/ceramics-form.service';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  public data: any[];
  public selection: string;
  public forms = ['Red Notebook', 'Elephantine'];
  public formValue: any;

  onFormSelect(form: any) {
    this.selection = form;
    switch (this.selection) {
      case 'Red Notebook':
        // this.getAllRedData();
        break;
      case 'Elephantine':
        // this.getAllElephantine();
        break;
    }
  }
  constructor(
    private _ds: DataService,
    public _tableGridService: TableGridService,
    public _ceramicFormService: CeramicsFormService,
    public snackBar: MatSnackBar
    ) {
    this._ceramicFormService.formValue.subscribe(value => {
      console.log(value);
      this.formValue = value;
    });
  }

  ngOnInit() {
    this.selection = this.forms[1];
    this.onFormSelect(this.selection);
  }

  save() {
    switch (this.selection) {
      case 'Red Notebook':
        // this.getAllRedData();

        break;
      case 'Elephantine':
        // this.getAllElephantine();
        this._ds.postElephantData(this.formValue);
        this.openSnackBar();

        break;
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
    });
  }

}

@Component({
  selector: 'app-snack-bar-component',
  templateUrl: './snack-bar-component-example-snack.html',
  styles: [`
    .snackbar-container {
      color: white;
    }
  `],
})
export class SnackBarComponent {}
