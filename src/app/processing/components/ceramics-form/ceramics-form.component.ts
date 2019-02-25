import { FormsService } from './../../services/forms.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DataService } from 'app/data.service';
import { Subscription } from 'rxjs';
import { ElephantModel } from '../models/elephant-model';

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
  public formsSubmitted = [];

  constructor(public fb: FormBuilder, public _dataService: DataService, public _formsService: FormsService) {

    this.ceramicsForm = fb.group({
      locusNumber: ['', Validators.compose([Validators.required])],
      locusNumPre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.pattern('[a-zA-z]*'),
        Validators.maxLength(1)])],
      locusNumSuf: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-z]*'),
        Validators.minLength(1),
        Validators.maxLength(1)])],
      objectGroupNumber: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.pattern('[0-9]*')])],
      objectNumber: ['', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.pattern('[0-9]*')])],
      numberOfObjects: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(4),
        Validators.pattern('[0-9]*')])],
      typeDescription: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
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

  submitForm(formValue: any) {
    console.log(formValue);
    this.formsSubmitted.push(formValue);
    this.ceramicsForm.reset();
    this._formsService.activeForm.next(this.formsSubmitted);

  }

  disable() {
    const state = this.isFormsDisabled;
    if (state) { this.ceramicsForm.disable();
    } else { this.ceramicsForm.enable(); }
    this.isFormsDisabled = !state;
  }






}
