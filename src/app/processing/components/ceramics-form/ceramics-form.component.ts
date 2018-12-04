import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { DataService } from 'app/data.service';
import { Subscription } from 'rxjs';

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
  mockData: Subscription;

  @Input() public onPrev: any;

  constructor(public fb: FormBuilder, private dataService: DataService) {
    this.mockData = this.dataService.mockData.subscribe(data => {
      this.processMockData(data);
    });

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
    })

    this.send()


  }

  ngOnInit() {
    this.getMockData();
  }

  processMockData(data: any[]) {
    this.elephantData = data;
    console.log(this.elephantData)
    this.loadRecord(this.currentRecordIndex);
  }

  getMockData() {
    this.mockData = this.dataService.getMockData().subscribe(data => {
      const tmpData = JSON.parse(data._body);
      this.dataService.mockData.next(tmpData);
    })
  }

  send() {
    this.dataService.postElephantData(this.ceramicsForm.value);
  }

  loadRecord(index) {
    const record = this.elephantData[index];
    this.ceramicsForm = this.formBuilder.group(record);
  }

  prev() {
    if (this.currentRecordIndex !== 0) {
      this.currentRecordIndex--;
      this.loadRecord(this.currentRecordIndex);
    }
  }

  clear() {
    this.ceramicsForm.reset();
  }

  next() {
    this.currentRecordIndex++;
    this.loadRecord(this.currentRecordIndex);
  }

  disable() {
    const state = this.isFormsDisabled;
    if (state) { this.ceramicsForm.disable();
    } else { this.ceramicsForm.enable(); }

    this.isFormsDisabled = !state;

  }






}
