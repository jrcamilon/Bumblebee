import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DataService } from 'app/data.service';
import { Subscription } from 'rxjs';
import { ElephantModel } from '../models/elephant-model';
import { CeramicsFormService } from './ceramics-form.service';

@Component({
  selector: 'app-ceramics-form',
  templateUrl: './ceramics-form.component.html',
  styleUrls: ['./ceramics-form.component.scss']
})
export class CeramicsFormComponent implements OnInit {

  public ceramicsForm: FormGroup;
  public formBuilder: FormBuilder = new FormBuilder();
  public elephantData: any;
  public currentRecordIndex = 0;
  public isFormsDisabled = true;
  public mockData: Subscription;
  public buttonMode = 'Save';

  constructor(public fb: FormBuilder, private _dataService: DataService, private _formService: CeramicsFormService) {

    this.ceramicsForm = fb.group({
      locusNumber: null,
      objectGroupNumber: null,
      objectNumber: null,
      numberOfObjects: null,
      typeDescription: null,
      typeNumber: null,
      weight: null,
      fabric: null,
      diameter: null,
      preservation: null,
      sfCoating: null,
      sfTreatment: null,
      blackened: null,
      incisedDecoration: null,
      application: null,
      paintedDecoration: null,
      comments: null,
      photo: null,
      processedBy: null,
      processDate: null,
      enteredBy: null,
      enteredDate: null,
      rlNumber: null,
      sheetNumber: null
    });
  }

  ngOnInit() {

  }

  send() {
    if (this.buttonMode === 'Save') {
      this._formService.formValue.next(this.ceramicsForm.value);
      this.buttonMode = 'Edit';
      this.disable();
    } else {
      this.buttonMode = 'Save';
      this.disable();
    }

  }

  disable() {
    const state = this.isFormsDisabled;
    if (state) { this.ceramicsForm.disable();
    } else { this.ceramicsForm.enable(); }

    this.isFormsDisabled = !state;

  }






}
