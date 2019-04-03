import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'app/processing/services/forms.service';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';

@Component({
  selector: 'app-detailed-processing',
  templateUrl: './detailed-processing.component.html',
  styleUrls: ['./detailed-processing.component.scss']
})
export class DetailedProcessingComponent implements OnInit, OnDestroy {

  isFormActive = false;
  activeDetailedForm: any;
  detailedFormArray = [];
  isCollapsed = true;
  isEditMode = false;
  indexEditing: number;

  // Fabric Type Options
  fabricTypeOptions: any[];
  surfaceTreatmentOptions: any[];
  sherdTypeOptions: any[];

  weightString: string;
  weightSum: any;

  recordToEdit: any;

  constructor(
    public fb: FormBuilder,
    public formService: FormsService,
    public khppFormSerivce: KhppFormService) {
    this.formService.detailedFormArray.subscribe( detailedArray => {this.detailedFormArray = detailedArray; });
    this.formService.recordToEdit.subscribe( recordToEdit => {
      this.recordToEdit = recordToEdit;
    });

    // Set Defaults for Drop Down Options
    this.fabricTypeOptions = this.khppFormSerivce.getFabricTypeOptions();
    this.surfaceTreatmentOptions = this.khppFormSerivce.getSurfaceTreatmentOptions();
    this.sherdTypeOptions = this.khppFormSerivce.getSherdTypeOptions();

  }

  ngOnInit(): void {
    // console.log('ngOnInit detailed');
    // console.log(this.recordToEdit);
    if (this.recordToEdit.length !== 0) {
      this.detailedFormArray = this.recordToEdit;
    }
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
    // console.log(formValues)
    formValues.weightType = formValues.weightType === true ? 'kg' : 'g';

    this.detailedFormArray.push(formValues);
    this.formService.detailedFormArray.next(this.detailedFormArray);

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.createNewTriageForm();
  }

  onFormEditSave(formValues: any) {
    this.detailedFormArray.splice(this.indexEditing, 1);
    formValues.weight = this.weightSum;
    formValues.weightType = formValues.weightType === true ? 'kg' : 'g';

    this.detailedFormArray.push(formValues);
    this.formService.detailedFormArray.next(this.detailedFormArray);

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.isFormActive = false;
    this.indexEditing = undefined;
    console.log(this.detailedFormArray);
    this.createNewTriageForm();
  }

  onFormCancel(): void {
    this.isFormActive = false;
    this.indexEditing = undefined;
    this.createNewTriageForm();
  }

  onFormRemove(index: number): void {
    this.detailedFormArray.splice(index, 1);
    this.formService.detailedFormArray.next(this.detailedFormArray);
  }

  onFormEdit(index: number): void {
    this.isFormActive = true;
    this.isEditMode = true;
    this.indexEditing = index;
    const item = this.detailedFormArray[index];
    this.weightSum = item.weight;
    console.log(item);
    this.activeDetailedForm = this.fb.group({
      fabricType: [item.fabricType, Validators.compose([Validators.required])],
      surfaceTreatment: [item.surfaceTreatment, Validators.compose([Validators.required])],
      sherdType: [item.sherdType, Validators.compose([Validators.required])],
      count: [item.count, Validators.compose([Validators.required, Validators.minLength(1)])],
      weight: [item.weight, Validators.compose([Validators.required, Validators.minLength(1)])],
      weightType: [(item.weightType === 'kg' ? true : false), null],
      comments: [item.comments, null],
      notes: [item.notes, null]
    });
  }

  createNewTriageForm() {
    this.activeDetailedForm = this.fb.group({
      fabricType: ['', Validators.compose([Validators.required])],
      surfaceTreatment: ['', Validators.compose([Validators.required])],
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

  // Change the Surface Treatment Options depending on the Fabric Type Selected
  onFabricTypeChange(fabricType: any) {
    this.surfaceTreatmentOptions = this.khppFormSerivce.getSurfaceTreatmentOptions(fabricType);
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
