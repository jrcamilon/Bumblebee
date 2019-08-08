import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from 'app/processing/services/forms.service';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
import { ceramicTypes } from '../ceramics-form/ceramic-types';
import * as _ from 'lodash'; 
import { EventEmitter } from 'events';

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
  burnishingOptions: any[];
  sherdTypeOptions: any[];

  weightString: string;
  weightSum: any;

  recordToEdit: any;

  // Dropdown Options
  wareOptions: any[];
  decorationOptions: any[];
  blackeningOptions: any[];

  ceramicTypes: any[];
  ceramicFamilyTypes;
  selectedValue = '';
  familyImages;
  typeDescription;

  @Output() onFormIdChange = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public formService: FormsService,
    public khppFormSerivce: KhppFormService) {
    this.formService.detailedFormArray.subscribe( detailedArray => {this.detailedFormArray = detailedArray; });
    this.formService.recordToEdit.subscribe( recordToEdit => {
      this.recordToEdit = recordToEdit;
    });

    // Create Family Types
    this.createFamilyTypes();

    // Set Defaults for Drop Down Options
    this.wareOptions = this.khppFormSerivce.getWareOptions();
    this.fabricTypeOptions = this.khppFormSerivce.getFabricTypeOptions();
    this.decorationOptions = this.khppFormSerivce.getDecorationOptions();
    this.burnishingOptions = this.khppFormSerivce.getBurnihsingOptions();

    this.surfaceTreatmentOptions = this.khppFormSerivce.getSurfaceTreatmentOptions();
    this.sherdTypeOptions = this.khppFormSerivce.getSherdTypeOptions();
    this.blackeningOptions = this.khppFormSerivce.getBlackeningOptions();




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
    formValues.notes = formValues.fabricType + ' Notes - ' + (formValues.notes === null ? '' : formValues.notes);
    formValues.weight = this.weightSum == null ? 0 : this.weightSum;

    formValues.weightType = formValues.weightType === true ? 'kg' : 'g';
    formValues.isDrawn = formValues.isDrawn === true ? 1: 0;
    formValues.rimsTstc = formValues.rimsTstc === true ? 1: 0;
    formValues.hasPhoto = formValues.hasPhoto === true ? 1: 0;
    formValues.objectNumber = formValues.objectNumber == null ? 0: formValues.objectNumber;
    formValues.blackening = formValues.blackening == null ? '' : formValues.blackening;
    formValues.decoration = formValues.decoration == null ? '' : formValues.decoration;
    formValues.surfaceTreatment = formValues.surfaceTreatment == null ? '' : formValues.surfaceTreatment;
    formValues.ware = formValues.ware == null ? '' : formValues.ware;


    // SELECTED VALUE
    formValues.typeNumber = this.selectedValue;
    formValues.typeDescription = this.typeDescription;

    formValues.diameter = formValues.diameter == null ? 0 : formValues.diameter;
    formValues.fabricType = formValues.fabricType == null ? '' : formValues.fabricType;
    formValues.percentage = formValues.percentage == null ? 0 : formValues.percentage;
    formValues.sheetNumber = formValues.sheetNumber == null ? '' : formValues.sheetNumber;
    formValues.typeDescription = formValues.typeDescription == null ? '' : formValues.typeDescription;
    formValues.typeFamily = formValues.typeFamily == null ? '' : formValues.typeFamily;
    formValues.typeNumber = formValues.typeNumber == null ? '' : formValues.typeNumber;
    formValues.typeVariant = formValues.typeVariant == null ? '' : formValues.typeVariant;


    this.detailedFormArray.push(formValues);
    this.formService.detailedFormArray.next(this.detailedFormArray);

    this.selectedValue = '';
    this.typeDescription = '';
    this.activeDetailedForm.reset();

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.createNewTriageForm();
  }

  onFormEditSave(formValues: any) {
    this.detailedFormArray.splice(this.indexEditing, 1);
    formValues.weight = this.weightSum == null ? 0 : this.weightSum;
    formValues.weightType = formValues.weightType === true ? 'kg' : 'g';
    formValues.isDrawn = formValues.isDrawn === true ? 1: 0;
    formValues.rimsTstc = formValues.rimsTstc === true ? 1: 0;
    formValues.hasPhoto = formValues.hasPhoto === true ? 1: 0;
    formValues.objectNumber = formValues.objectNumber == null ? 0: formValues.objectNumber;
    formValues.blackening = formValues.blackening == null ? '' : formValues.blackening;
    formValues.decoration = formValues.decoration == null ? '' : formValues.decoration;
    formValues.surfaceTreatment = formValues.surfaceTreatment == null ? '' : formValues.surfaceTreatment;
    formValues.ware = formValues.ware == null ? '' : formValues.ware;


    formValues.typeNumber = this.selectedValue;
    formValues.typeDescription = this.typeDescription == null ? '': formValues.typeDescription;

    formValues.diameter = formValues.diameter == null ? 0 : formValues.diameter;
    formValues.fabricType = formValues.fabricType == null ? '' : formValues.fabricType;
    formValues.percentage = formValues.percentage == null ? 0 : formValues.percentage;
    formValues.sheetNumber = formValues.sheetNumber == null ? '' : formValues.sheetNumber;
    formValues.typeDescription = formValues.typeDescription == null ? '' : formValues.typeDescription;
    formValues.typeFamily = formValues.typeFamily == null ? '' : formValues.typeFamily;
    formValues.typeNumber = formValues.typeNumber == null ? '' : formValues.typeNumber;
    formValues.typeVariant = formValues.typeVariant == null ? '' : formValues.typeVariant;

    this.detailedFormArray.push(formValues);
    this.formService.detailedFormArray.next(this.detailedFormArray);

    this.weightString = '';
    this.weightSum = '';
    this.isEditMode = false;
    this.isFormActive = false;
    this.indexEditing = undefined;
    // console.log(this.detailedFormArray);
    this.createNewTriageForm();
  }

  onFormCancel(): void {
    this.isFormActive = false;
    this.indexEditing = undefined;
    this.createNewTriageForm();
  }

  onFormRemove(index: number): void {
    // console.log('REMOVING', this.detailedFormArray[index]);
    this.formService.addToRemoveArray(this.detailedFormArray[index]);
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
    // this.activeDetailedForm = this.fb.group({
    //   fabricType: [item.fabricType, Validators.compose([Validators.required])],
    //   surfaceTreatment: [item.surfaceTreatment, Validators.compose([Validators.required])],
    //   sherdType: [item.sherdType, Validators.compose([Validators.required])],
    //   count: [item.count, Validators.compose([Validators.required, Validators.minLength(1)])],
    //   weight: [item.weight, Validators.compose([Validators.required, Validators.minLength(1)])],
    //   weightType: [(item.weightType === 'kg' ? true : false), null],
    //   comments: [item.comments, null],
    //   notes: [item.notes, null]
    // });

    this.typeDescription = item.typeDescription !== null ? item.typeDescription : '';
    this.selectedValue = item.typeNumber !== null ? item.typeNumber : '';

    this.activeDetailedForm = this.fb.group({
      id: item.id,
      formId: item.formId,
      bodyOrDiagnostic: item.bodyOrDiagnostic,
      objectNumber: item.objectNumber,
      rimsTstc: item.rimsTstc,
      ware: item.ware,
      surfaceTreatment: item.surfaceTreatment,
      decoration: item.decoration,
      blackening: item.blackening,
      count: item.count,
      weight: item.weight,
      weightType: item.weightType === 'kg' ? true : false,
      hasPhoto: item.hasPhoto,
      diameter: item.diameter,
      percentage: item.percentage,
      typeFamily: item.typeFamily,
      typeNumber: item.typeNumber,
      typeVariant: item.typeVariant,
      burnishing: item.burnishing,
      typeDescription: item.typeDescription,
      isDrawn: item.isDrawn,
      fabricType: item.fabricType,
      sheetNumber: item.sheetNumber,
      notes: item.notes
    });
  }

  createNewTriageForm() {
    // this.activeDetailedForm = this.fb.group({
    //   fabricType: ['', Validators.compose([Validators.required])],
    //   surfaceTreatment: ['', Validators.compose([Validators.required])],
    //   sherdType: ['', Validators.compose([Validators.required])],
    //   count: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    //   weight: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    //   weightType: null,
    //   comments: null,
    //   notes: null
    // });
    this.activeDetailedForm = this.fb.group({
      bodyOrDiagnostic: 'body',
      objectNumber: null,
      rimsTstc: false,
      ware: null,
      surfaceTreatment: null,
      decoration: 'none',
      blackening: 'none',
      count: 1,
      weight: null,
      weightType: null,
      hasPhoto: false,
      diameter: null,
      percentage: null,
      typeFamily: null,
      typeNumber: null,
      typeVariant: null,
      typeDescription: null,
      burnishing: 'none',
      isDrawn: false,
      fabricType: null,
      sheetNumber: null,
      notes: null
    });

    // console.warn(this.activeDetailedForm);

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
  // onFabricTypeChange(fabricType: any) {
  //   this.surfaceTreatmentOptions = this.khppFormSerivce.getSurfaceTreatmentOptions(fabricType);
  // }

  onTypeNumberChange(e: any) {
    console.log(e.target.value);
    this.selectedValue = e.target.value;
    this.activeDetailedForm.typeNumber = e.target.value;
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

   public onFamilySelect(value: any) {
    const matchingFamily = ceramicTypes.filter(e => {
      return e.family === value;
    });

    this.selectedValue = matchingFamily[0].image;
    this.typeDescription = matchingFamily[0].typeDesc;
    this.familyImages = matchingFamily;
  }

  createFamilyTypes() {
    // console.log(ceramicTypes);
    this.ceramicFamilyTypes = _.uniqBy(ceramicTypes, (e) => {
      return e.family;
    });
  }

  public getImage(item: any) {
    const image =  'assets/ceramics/' + item.image + '.png';
    return image;
  }

  public onSelectImage(item: any) {

    const words = item.image.split('.');
    // console.log(item);
    this.selectedValue = item.image;
    this.activeDetailedForm.value.typeNumber = item.image;
    // console.log(words);
    this.typeDescription = item.typeDesc;
  }

}
