import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FormsService } from 'app/processing/services/forms.service';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import { DataService } from 'app/data.service';
import { Subscription, Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import {KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
@Component({
  selector: 'app-khpp-form',
  templateUrl: './khpp-form.component.html',
  styleUrls: ['./khpp-form.component.scss']
})
export class KhppFormComponent implements OnInit {
  public view: Observable<GridDataResult>;
  public gridState: State = {
      sort: [],
      skip: 0,
      take: 10
  };
  public formGroup: FormGroup;

  // private editService: EditService;
  private editedRowIndex: number;

  constructor(/* @Inject(EditService) editServiceFactory: any */) {
      // this.editService = editServiceFactory();
  }

  public ngOnInit(): void {
      // this.view = this.editService.pipe(map(data => process(data, this.gridState)));

      // this.editService.read();
  }

  public onStateChange(state: State) {
      this.gridState = state;

      // this.editService.read();
  }

  public addHandler({sender}) {
      this.closeEditor(sender);

      this.formGroup = new FormGroup({
          'TagNumber': new FormControl('', Validators.required),
          'ProcessedBy': new FormControl('', Validators.required),
          'DueDate': new FormControl('', Validators.required),
          'type': new FormControl('', Validators.required),
          'BodyOrDiagnostic': new FormControl('', Validators.required),

          'RimCount': new FormControl('', Validators.required),
          'RimWeight': new FormControl('', Validators.required),
          'BaseCount': new FormControl('', Validators.required),
          'BaseWeight': new FormControl('', Validators.required),
          'DecoratorCount': new FormControl('', Validators.required),
          'DecoratorWeight': new FormControl('', Validators.required),

      });

      sender.addRow(this.formGroup);
  }

  public editHandler({sender, rowIndex, dataItem}) {
      this.closeEditor(sender);

      this.formGroup = new FormGroup({
          'ProductID': new FormControl(dataItem.ProductID),
          'ProductName': new FormControl(dataItem.ProductName, Validators.required),
          'UnitPrice': new FormControl(dataItem.UnitPrice),
          'UnitsInStock': new FormControl(
                  dataItem.UnitsInStock,
                  Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
          'Discontinued': new FormControl(dataItem.Discontinued)
      });

      this.editedRowIndex = rowIndex;

      sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({sender, rowIndex}) {
      this.closeEditor(sender, rowIndex);
  }

  public saveHandler({sender, rowIndex, formGroup, isNew}) {
      // const product: Product = formGroup.value;

      // this.editService.save(product, isNew);

      sender.closeRow(rowIndex);
  }

  public removeHandler({dataItem}) {
      // this.editService.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
      grid.closeRow(rowIndex);
      this.editedRowIndex = undefined;
      this.formGroup = undefined;
  }
}
