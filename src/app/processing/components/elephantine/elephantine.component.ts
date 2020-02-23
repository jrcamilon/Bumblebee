
import { Component, OnInit } from '@angular/core';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import { FormsService } from 'app/processing/services/forms.service';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';
// import { ElephantineFormsService } from '/'

@Component({
  selector: 'app-elephantine',
  templateUrl: './elephantine.component.html',
  styleUrls: ['./elephantine.component.scss']
})
export class ElephantineComponent implements OnInit {

  public opened = false;
  recordToDelete = null;
  isOnline: boolean;
  visibleTab = 'input';

  tagHasError = false;
  validTagChar = true;

  isFormBodyVisible = false;
  isBasicVisible = true;

  isElephantineFormValid = false;
  buttonValue = 'SUBMIT';
  isEditing = false;

  editFormID: number;

  // Form records
  tagNumber = '';
  processedby = '';
  dueDate = '';
  depositDate
  basicRecords = [];
  detailedRecords = [];

  offlineDBRecords = [];
  onlineDBRecords = [];
  onlineDBRecordsCopy = [];
  filteredDBRecords = [];

  detailed = [];
  basic = [];

  isEditingOnlineDB = false;

  constructor(
    public editService: ElephantineFormService,
    public onlineSerivice: OnlineServiceService,
    public formSerivce: FormsService,
    public offlineDB: OfflineDBService
  ) {
    this.onlineSerivice.isOnline.subscribe(status => { this.isOnline = status; console.log('online-status', status)});
    this.formSerivce.eleTriageFormArray.subscribe(triageArray => {this.basicRecords = triageArray; this.checkFormValidity()});
    this.formSerivce.eleDetailedFormArray.subscribe(detailedArray => { this.detailedRecords = detailedArray; this.checkFormValidity()});
    this.editService.eleResponseObject.subscribe(res => { this.offlineDBRecords = res; });
    this.offlineDB.getAllEle().then(res => { this.offlineDBRecords = res; });

    if (this.isOnline) {
      this.formSerivce.readFromElephantine().subscribe(res => {
          // console.log('online db records', res);
          this.onlineDBRecords = res;
          this.onlineDBRecordsCopy = res;
      });
    }

    // Set Form Date
    this.setFormDateToTodaysDate();
  }

  ngOnInit() {
  }

  setFormDateToTodaysDate() {
    const d = new Date();
    this.dueDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.depositDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  public restrictTagChars(e: any) {
    return this.validTagChar;
  }

  public onTagChange(e: any) {

    // console.log(e.key);
    if (e.key === 'Backspace') { return; }

    this.validTagChar = true;
    this.tagHasError = false

    const position = e.target.selectionStart;
    // console.log(position);

    if (position === 1 || position === 2 || position === 3 || position === 4 || position === 5) {
        console.log(position)
        if (isNaN(e.target.value[position - 1])) {
          this.validTagChar = false;
          this.tagHasError = true;
        }
    }

    if (position === 6) {
      e.target.value = e.target.value.toUpperCase();
         if (!isNaN(e.target.value[position - 1])) {
            this.validTagChar = false;
            this.tagHasError = true;
        }
        e.target.value = e.target.value + '/';
    }

    if (position === 7) {
      if (e.target.value !== '/') {
        this.validTagChar = false;
        this.tagHasError = true;
      }
    }

    if (position === 8) {
      // e.target.value = e.target.value.toLowerCase();
        if (!isNaN(e.target.value[position - 1])) {
          this.validTagChar = false;
          this.tagHasError = true;
        }
        const dash = e.target.value + '-';
        e.target.value = dash;
    }

    if (position === 9) {
      if (e.target.value !== '-') {
        this.validTagChar = false;
        this.tagHasError = true;
      }
    }

    this.tagNumber = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  public onDueDateChange(e: any) {
    console.log(e.target.value);
    this.dueDate = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  public onDepositDateChange(e: any) {
    console.log(e.target.value);
    this.depositDate = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  /** Custom function to check weather the to show the body based on three fields */
  private showBody() {
    this.isFormBodyVisible = (this.editService.tagNumberElephantineFiledValid(this.tagNumber)
    && this.processedby !== '' && this.dueDate !== '') ? true : false;
  }

  public onProcessedByChange(e: any) {
    this.processedby = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  public onFormSubmit() {
    let form: any;

    if (this.isBasicVisible) {
      form = {
        idForm: this.editFormID,
        tagNumber: this.tagNumber,
        dueDate: this.dueDate,
        depositDate: this.depositDate,
        processedby: this.processedby,
        basicRecords: this.basicRecords,
        type: 'basic'
      }
    } else {
      form = {
        idForm: this.editFormID,
        tagNumber: this.tagNumber,
        dueDate: this.dueDate,
        depositDate: this.depositDate,
        processedBy: this.processedby,
        detailedRecords: this.detailedRecords,
        type: 'detailed'
      }
    }

    console.log('Elephantine FORM', form);

    if (this.isEditing) {
      // TO DO:
      // Send edited online db records to DB
      if (this.isEditingOnlineDB === true) {
          const recordsToRemove = this.formSerivce.getRemoveArray_elephantine();

          this.formSerivce.updateToElephantine(form, recordsToRemove).subscribe(res => {
              console.log(res);
          });
      }

      this.offlineDB.updateEle(this.editFormID, form);
      this.isEditing = false;
      this.editFormID = undefined;
      this.formSerivce.eleRecordToEdit.next([]);
      this.offlineDB.getAllEle().then(res => {
          this.offlineDBRecords = res;
          this.editService.eleResponseObject.next(res);
      });
      this.buttonValue = 'SUBMIT';
  } else {
      this.editService.combineObjects(form);
  }
  this.formSerivce.clearToRemoveArray_elephantine();
  this.clearForm();
  this.clearSubFormsArray();

  }

public onDBedit(record: any) {
    this.offlineDB.getAllEle().then(res => {
        const recordToEdit = res.map(ele => {
            if (ele.id === record.id) { return ele; }
        }).filter(el => { return el !== undefined; });
        console.log(recordToEdit[0]);

        this.dbRecordEdit(recordToEdit[0]);
        this.isEditing = true;
        this.buttonValue = 'SAVE OFFLINE DB EDITS';
        this.visibleTab = 'input';
    });
}



public onDBdelete(record: any) {
  console.log(record);
  this.offlineDB.removeEle(record.id);
  this.offlineDB.getAllEle().then(res => {
      this.offlineDBRecords = res;
      this.editService.eleResponseObject.next(res);
  });
}

  public clearSubFormsArray() {
    this.formSerivce.eleTriageFormArray.next([]);
    this.formSerivce.eleDetailedFormArray.next([]);
}


  public clearForm() {
    this.isFormBodyVisible = false;
    this.tagNumber = '';
    this.processedby = '';
    const d: Date = new Date();
    this.dueDate =  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();;
}


  public onCancelEdit() {
    this.isEditing = false;
    this.visibleTab = 'offlineDB';
    this.editFormID = undefined;
    this.formSerivce.eleRecordToEdit.next([]);
    this.offlineDB.getAllEle().then(res => {
        this.offlineDBRecords = res;
        this.editService.eleResponseObject.next(res);
    });
    this.buttonValue = 'SUBMIT';
    this.clearForm();
    this.clearSubFormsArray();
  }

  public onProcessingTypeChange(value: any) {
    this.isBasicVisible = value === 'basic' ? true : false;
  }

  public checkFormValidity() {
    this.isElephantineFormValid = this.isFormBodyVisible && this.detailedRecords.length !== 0 || this.basicRecords.length !== 0;
  }


  public toggleScreens(value: string): void {
    // Fetch Data and make section visible
    switch (value) {
        case 'onlineDB':
            // fetch
            // if (this.isOnline) {
            //     this.formSerivce.readFromKHPP().subscribe(res => {
            //         // console.log('online db records', res);
            //         this.onlineDBRecords = res;
            //     });
            // }
            break;
        case 'offlineDB':
            break;
        case 'input':
            break;
    }
    this.visibleTab = value;
  }

  public dbRecordEdit(record: any) {
    this.tagNumber = record.tagNumber;
    this.dueDate = record.dueDate;
    this.processedby = record.processedby;
    this.showBody();
    this.checkFormValidity();
    // check if the record being edited has basic or detailed records
    this.isBasicVisible = record.basicRecords !== undefined;

    this.editFormID = record.id;

    // load the record to the child processing
    if (this.isBasicVisible) {
        // console.log(record.basicRecords);
        this.formSerivce.eleRecordToEdit.next(record.basicRecords);
    } else {
        // console.log(record.detailedRecords);
        this.formSerivce.eleRecordToEdit.next(record.detailedRecords);
    }


  }
}
