import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'app/processing/services/forms.service';

@Component({
  selector: 'app-body-processing',
  templateUrl: './body-processing.component.html',
  styleUrls: ['./body-processing.component.scss']
})
export class BodyProcessingComponent implements OnInit, OnDestroy {

  isFormActive = false;
  activeTriageForm: any;
  triageFormArray = [];
  isCollapsed = true;
  isEditMode = false;
  indexEditing: number;

  weightString: string;
  weightSum: any;
  recordToEdit: any;

  constructor(public editserivce: KhppFormService, public fb: FormBuilder, public formService: FormsService) {
    this.formService.triageFormArray.subscribe(triageArray => { this.triageFormArray = triageArray; });
    this.editserivce.offlineDBrecordToEdit.subscribe(recordToEdit => {
      console.log(recordToEdit);
      this.recordToEdit = recordToEdit;
    })
  }

  ngOnInit(): void {
    console.log(this.recordToEdit);
  }

  ngOnDestroy(): void {

  }

  onCollapseList() {
    this.isCollapsed = !this.isCollapsed;
  }

  onAdd(): void {
    this.isFormActive = true;
    this.createNewTriageForm();

  }

  onFormSave(formValues: any): void {
    this.isFormActive = false;
    formValues.notes = formValues.fabricType + ' Notes -' + (formValues.notes === null ? '' : formValues.notes);
    formValues.weight = this.weightSum;
    formValues.weightType = formValues.weightType === true ? 'kg' : 'g';
    this.triageFormArray.push(formValues);
    this.formService.triageFormArray.next(this.triageFormArray);

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.createNewTriageForm();
  }

  onFormEditSave(formValues: any) {
    this.triageFormArray.splice(this.indexEditing, 1);
    formValues.weight = this.weightSum;
    formValues.weightType = formValues.weightType === true ? 'kg' : 'g';
    this.triageFormArray.push(formValues);
    this.formService.triageFormArray.next(this.triageFormArray);

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.isFormActive = false;
    this.indexEditing = undefined;
    console.log(this.triageFormArray);
    this.createNewTriageForm();
  }

  onFormCancel(): void {
    this.isFormActive = false;
    this.indexEditing = undefined;
    this.createNewTriageForm();
  }

  onFormRemove(index: number): void {
    this.triageFormArray.splice(index, 1);
    this.formService.triageFormArray.next(this.triageFormArray);
  }

  onFormEdit(index: number): void {
    this.isFormActive = true;
    this.isEditMode = true;
    this.indexEditing = index;
    const item = this.triageFormArray[index];
    this.weightSum = item.weight;
    console.log(item);
    this.activeTriageForm = this.fb.group({
      fabricType: [item.fabricType, Validators.compose([Validators.required])],
      bodyOrDiagnostic: [item.bodyOrDiagnostic, Validators.compose([Validators.required])],
      sherdType: [item.sherdType, Validators.compose([Validators.required])],
      count: [item.count, Validators.compose([Validators.required, Validators.minLength(1)])],
      weight: [item.weight, Validators.compose([Validators.required, Validators.minLength(1)])],
      weightType: [(item.weightType === 'kg' ? true : false), null],
      comments: [item.comments, null],
      notes: [item.notes, null]
    });
  }

  createNewTriageForm() {
    this.activeTriageForm = this.fb.group({
      fabricType: ['', Validators.compose([Validators.required])],
      bodyOrDiagnostic: ['', Validators.compose([Validators.required])],
      sherdType: ['', Validators.compose([Validators.required])],
      count: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      weight: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      weightType: null,
      comments: null,
      notes: null
    });

  }

  /** Custom function to add or subtract a string of characters */
  onWeightFieldChange(e: any) {
    // console.log(e.target.value);
    const numbers = e.target.value.split(/[+]/);
    const total = [];
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].includes('-')) {
        const values = numbers[i].split('-').map(Number);
        const reducerDiff = (acc, curVal) => acc - curVal;
        const difference = parseFloat(values.reduce(reducerDiff));
        total.push(difference);
      } else {
        total.push(parseFloat(numbers[i]));
      }
    }

    const reducer = (acc, curVal) => acc + curVal;
    // console.log(parseFloat(total.reduce(reducer)));
    this.weightSum = parseFloat(total.reduce(reducer))
    this.weightString = '(' + e.target.value + ')'
  }

  /** Custom function to restrict a field to only allow specific characters */
  restrictNumeric(e: any) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
     return false;
    }
    if (e.which === 0) {
     return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/^[0-9.+-]/.test(input);
   }
}
