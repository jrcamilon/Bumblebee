import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'app/processing/services/forms.service';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';

@Component({
  selector: 'app-basic-processing',
  templateUrl: './basic-processing.component.html',
  styleUrls: ['./basic-processing.component.scss']
})
export class BasicProcessingComponent implements OnInit {


  isFormActive = false;
  activeTriageForm: any;
  eleTriageFormArray = [];
  isCollapsed = true;
  isEditMode = false;
  indexEditing: number;

  weightString: string;
  weightSum: any;
  recordToEdit: any;

  constructor(
    public fb: FormBuilder,
    public editservice: ElephantineFormService,
    public formService: FormsService) {
      this.formService.eleTriageFormArray.subscribe(triageArray => { this.eleTriageFormArray = triageArray});
      this.formService.eleRecordToEdit.subscribe(recordToEdit => { 
        this.recordToEdit = recordToEdit
      });

      this.editservice.offlineDBrecordToEdit.subscribe(recordToEdit => {
        console.log(recordToEdit);
        this.recordToEdit = recordToEdit;
      });

    }

  ngOnInit() {
    if (this.recordToEdit.length !== 0) {
      this.eleTriageFormArray = this.recordToEdit;
    }
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
    this.eleTriageFormArray.push(formValues);
    this.formService.eleTriageFormArray.next(this.eleTriageFormArray);

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.createNewTriageForm();
  }

  onFormEditSave(formValues: any) {
    this.eleTriageFormArray.splice(this.indexEditing, 1);
    formValues.weight = this.weightSum;
    formValues.weightType = formValues.weightType === true ? 'kg' : 'g';
    this.eleTriageFormArray.push(formValues);
    this.formService.eleTriageFormArray.next(this.eleTriageFormArray);

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.isFormActive = false;
    this.indexEditing = undefined;
    console.log(this.eleTriageFormArray);
    this.createNewTriageForm();
  }

  onFormCancel(): void {
    this.isFormActive = false;
    this.indexEditing = undefined;
    this.createNewTriageForm();
  }

  onFormRemove(index: number): void {
    this.eleTriageFormArray.splice(index, 1);
    this.formService.triageFormArray.next(this.eleTriageFormArray);
  }

  onFormEdit(index: number): void {
    this.isFormActive = true;
    this.isEditMode = true;
    this.indexEditing = index;
    const item = this.eleTriageFormArray[index];
    this.weightSum = item.weight;
    console.log(item);
    this.activeTriageForm = this.fb.group({
      id: item.id,
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
