
import { Component, OnInit } from '@angular/core';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import { FormsService } from 'app/processing/services/forms.service';
import { OfflineDBService } from 'services/OfflineDB/offline-db.service';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';
// import { ElephantineFormsService } from '/'
import * as redsDetailedData from './eleDetailed.json';
import * as _ from 'lodash';

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

  tagNumberContextHasError = false;
  validTagChar = true;
  validTagGroupChar = true;

  isFormBodyVisible = false;
  isBasicVisible = true;

  isElephantineFormValid = false;
  buttonValue = 'SUBMIT';
  isEditing = false;

  editFormID: number;

  // Form records
  tagNumber = '';
  tagNumberContext = '';
  tagNumberGroupNumber = '';

  processedBy = '';

  dueDate = '';
  // depositDate;
  broadDateOptions = [];
  detailedDateOptions = [];

  basicRecords = [];
  detailedRecords = [];

  offlineDBRecords = [];
  onlineDBRecords = [];
  onlineDBRecordsCopy = [];
  filteredDBRecords = [];

  detailed = [];
  basic = [];

  houseNumberOptions: any[];
  roomNumberOptions: any[];

  selectedHouseNumber;
  selectedRoomNumber;

  selectedBroadDate;
  selectedDetailedDate;

  public redsDetailed = redsDetailedData;

  isEditingOnlineDB = false;
;

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
          console.log('online db records', res);
          this.onlineDBRecords = res;
          this.onlineDBRecordsCopy = res;
      });
    }

    // Get Deposit Date
    this.broadDateOptions = this.editService.getBroadDate();
    this.detailedDateOptions = this.editService.getDynasticDate();
    // Broad and Detailed Date defailt selected
    this.setDefaultDepositDates();

    // Set Form Date
    this.setFormDateToTodaysDate();

    // house and room number options
    this.houseNumberOptions = this.editService.getHouseNumber();
    this.roomNumberOptions = this.editService.getRoomNumber();
    // house and room number default selected
    this.setDefaultRoomAndHouse();


  }

  ngOnInit() {
  }

  setDefaultRoomAndHouse() {
    this.selectedHouseNumber = this.editService.getHouseNumber()[0].value;
    this.selectedRoomNumber = this.editService.getRoomNumber()[0].value;
  }

  setDefaultDepositDates() {
    this.selectedBroadDate = this.editService.getBroadDate()[0].value;
    this.selectedDetailedDate = this.editService.getDynasticDate()[0].value;
  }

  setFormDateToTodaysDate() {
    const d = new Date();
    this.dueDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  // Tag Number Context
  public restrictTagChars(e: any) {
    return this.validTagChar;
  }
  // Tag Number Context
  public onTagChange(e: any) {

    // console.log(e.key);
    if (e.key === 'Backspace') { return; }

    this.validTagChar = true;
    this.tagNumberContextHasError = false

    const position = e.target.selectionStart;
    // console.log(position);

    if (position === 1 || position === 2 || position === 3 || position === 4 || position === 5) {
        console.log(position)
        if (isNaN(e.target.value[position - 1])) {
          this.validTagChar = false;
          this.tagNumberContextHasError = true;
        }
    }

    if (position === 6) {
      e.target.value = e.target.value.toUpperCase();
         if (!isNaN(e.target.value[position - 1])) {
            this.validTagChar = false;
            this.tagNumberContextHasError = true;
        }
        e.target.value = e.target.value + '/';
    }

    if (position === 7) {
      if (e.target.value !== '/') {
        this.validTagChar = false;
        this.tagNumberContextHasError = true;
      }
    }

    if (position === 8) {
      // e.target.value = e.target.value.toLowerCase();
        if (!isNaN(e.target.value[position - 1])) {
          this.validTagChar = false;
          this.tagNumberContextHasError = true;
        }
    }

    this.tagNumberContext = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  onTagNumberGroupChange(e: any) {
    if (e.key === 'Backspace') { return; }
    this.tagNumberGroupNumber = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }


  public onDueDateChange(e: any) {
    console.log(e.target.value);
    this.dueDate = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  public onDepositDateChange(e: any, type) {
    const value = e.target.value;
    switch (type) {
      case 'broad':
        this.selectedBroadDate = value;
        break;
      case 'detailed':
        this.selectedDetailedDate = value;
        break;
      default:
        break;
    }
    this.showBody();
    this.checkFormValidity();
  }

  /** Custom function to check weather the to show the body based on three fields */
  private showBody() {
    this.isFormBodyVisible = (
      // this.tagNumberContext.length !==  7 &&
      this.processedBy !== '' &&
      this.selectedRoomNumber !== '' &&
      this.selectedHouseNumber !== '' &&
      this.selectedBroadDate !== '' &&
      this.selectedDetailedDate !== '' &&
      this.dueDate !== '' &&
      this.tagNumberGroupNumber !== '' );

    console.log(this.isFormBodyVisible);
  }

  public onHouseNumberRoomNumberChange(e: any, type) {
    console.log(e.target.value);
    switch (type) {
      case 'house':
        this.selectedHouseNumber = e.target.value;
        break;
      case 'room':
        this.selectedRoomNumber = e.target.value;
    }
  }

  public onProcessedByChange(e: any) {
    this.processedBy = e.target.value;
    this.showBody();
    this.checkFormValidity();
  }

  public onFormSubmit(type) {
    let form: any;

    this.tagNumber = this.tagNumberContext + '-' + this.tagNumberGroupNumber;

    if (this.isBasicVisible) {
      form = {
        idForm: this.editFormID,
        tagNumber: this.tagNumber,
        tagNumberContext: this.tagNumberContext,
        tagNumberGroupNumber: this.tagNumberGroupNumber,
        houseNumber: this.selectedHouseNumber,
        roomNumber: this.selectedRoomNumber,
        broadDate: this.selectedBroadDate,
        detailedDate: this.selectedDetailedDate,
        dueDate: this.dueDate,
        processedBy: this.processedBy,
        basicRecords: this.basicRecords,
        type: 'basic'
      }
    } else {
      form = {
        idForm: this.editFormID,
        tagNumber: this.tagNumber,
        tagNumberContext: this.tagNumberContext,
        tagNumberGroupNumber: this.tagNumberGroupNumber,
        houseNumber: this.selectedHouseNumber,
        roomNumber: this.selectedRoomNumber,
        broadDate: this.selectedBroadDate,
        detailedDate: this.selectedDetailedDate,
        dueDate: this.dueDate,
        processedBy: this.processedBy,
        detailedRecords: this.detailedRecords,
        type: 'detailed'
      }
    }

    console.log('Elephantine FORM', form);

    if (type === 'save') {
        if (this.isEditing) {
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
          // this.editing === false
            this.editService.combineObjects(form);
        }
      this.formSerivce.clearToRemoveArray_elephantine();
      this.clearForm();
      this.clearSubFormsArray();
    } else {

    }

  }

public onDBedit(record: any) {
    this.offlineDB.getAllEle().then(res => {
        const recordToEdit = res.map(ele => {
            if (ele.id === record.id) { return ele; }
        }).filter(el => { return el !== undefined; });
        console.log('Record To Edit', recordToEdit[0]);

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
    this.tagNumberContext = '';
    this.tagNumberGroupNumber = '';
    // this.selectedBroadDate = '';
    // this.selectedDetailedDate = '';
    // this.selectedHouseNumber = '';
    // this.selectedRoomNumber = '';
    this.setDefaultRoomAndHouse();
    this.setDefaultDepositDates();
    this.processedBy = '';
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
    console.log(value);
    this.isBasicVisible = value === 'basic' ? true : false;
  }

  public checkFormValidity() {
    this.isElephantineFormValid =
    this.isFormBodyVisible && this.detailedRecords.length !== 0 || this.basicRecords.length !== 0;
  }


  public toggleScreens(value: string): void {
    // Fetch Data and make section visible
    switch (value) {
        case 'onlineDB':
            // fetch
            if (this.isOnline) {
                this.formSerivce.readFromElephantine().subscribe(res => {
                    console.log('online db records', res);
                    this.onlineDBRecords = res;
                });
            }
            break;
        case 'offlineDB':
            break;
        case 'input':
            break;
    }
    this.visibleTab = value;
  }

  public onDBOnlineEdit(record: any) {

    const type = record.basicCount > record.detailedCount ? 'basic' : 'detailed';

    this.formSerivce.editFromElephantine(record.id, type).subscribe(res => {
        console.log(res);
        const splitDate = record.dueDate.split('-');
        const newDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2];

        let recordToEdit;

        if (type === 'detailed') {
            recordToEdit = {
                tagNumber: record.tagNumber,
                tagNumberContext: record.tagNumberContext,
                tagNumberGroupNumber: record.tagNumberGroupNumber,

                dueDate: newDate,

                broadDate: record.broadDate,
                detailedDate: record.detailedDate,

                houseNumber: record.houseNumber,
                roomNumber: record.roomNumber,

                id: record.id,
                processedBy: record.processedBy,
                detailedRecords: res.records
            }
        } else {
            recordToEdit = {
                tagNumber: record.tagNumber,
                tagNumberContext: record.tagNumberContext,
                tagNumberGroupNumber: record.tagNumberGroupNumber,

                dueDate: newDate,

                broadDate: record.broadDate,
                detailedDate: record.detailedDate,

                houseNumber: record.houseNumber,
                roomNumber: record.roomNumber,

                id: record.id,
                processedBy: record.processedBy,
                basicRecords: res.records
            }
        }

        this.isEditingOnlineDB = true;

        console.log('RECORD TO EDIT', recordToEdit);

        this.dbRecordEdit(recordToEdit);
        this.editFormID = record.id;
        this.isEditing = true;
        this.buttonValue = 'SAVE ONLINE DB EDITS';
        this.visibleTab = 'input';

    });
  }

  public onDelete(record: any) {
    console.log(record);
    this.recordToDelete = record;
    this.opened = true;
  }

  public close(status) {
    console.log(`Dialog result: ${status}`);
    switch (status) {
        case 'no':
            // don't delete
            break;
        case 'yes':
            // delete record
            this.formSerivce.deleteFromElephantine(this.recordToDelete.id).subscribe(res => {
                console.log(res);
                this.formSerivce.readFromElephantine().subscribe(res => {
                    console.log('online db records', res);
                    this.onlineDBRecords = res;
                });
            })
            break;
    };
    this.opened = false;
    this.recordToDelete = null;

  }

  onJsonDetailedProcess() {
    console.log('processing Red Notebook Data for Detailed');
    console.log(this.redsDetailed);
    const grouped = _.groupBy(this.redsDetailed, (ele) => {
        return ele.tagNumber;
    });

    // console.log(grouped);
    Object.keys(grouped).forEach((tagNumber, index) => {
        // console.log(tagNumber); // tagNumber
        // console.log(grouped[tagNumber]); // array of records


        const processedBy = grouped[tagNumber][0].processedBy;
        const tagNumberContext = grouped[tagNumber][0].tagNumberContext;
        const tagNumberGroupNumber = grouped[tagNumber][0].tagNumberGroupNumber;
        const houseNumber = grouped[tagNumber][0].houseNumber;
        const roomNumber = grouped[tagNumber][0].roomNumber;
        const broadDate =  grouped[tagNumber][0].broadDate;
        const detailedDate = grouped[tagNumber][0].detailedDate;
        const dueDate = grouped[tagNumber][0].dueDate;
        const detailedRecrods = grouped[tagNumber].map(ele => {
            console.log('HERE', ele.diameter);
            console.log('HERE', ele.percentage);
            return {
                bodyOrDiagnostic: ele.bodyOrDiagnostic,
                objectNumber: ele.objectNumber === '' ? 0 : ele.objectNumber.toString(),
                houseNumber: ele.houseNumber,
                roomNumber: ele.roomNumber,
                sherdDate: ele.sherdDate,
                rimsTstc: ele.rimsTstc === '' ? 0 : 1,
                ware: ele.ware,
                surfaceTreatment: ele.surfaceTreatment,
                decoration: ele.decoration,
                blackening: ele.blackening,
                count: ele.count,
                weight: ele.weight === '' ? 0 : ele.weight,
                weightType: ele.weightType === '' ? 'g' : ele.weightType,
                hasPhoto: ele.hasPhoto === 'yes' ? 1 : 0,
                diameter: ele.diameter === '' ? 0 : ele.diameter,
                percentage: ele.percentage === '' ? 0 : ele.percentage,
                typeFamily: ele.typeFamily,
                typeNumber: ele.typeNumber,
                typeVariant: ele.typeVariant,
                typeDescription: ele.typeDescription,
                burnishing: ele.burnishing,
                isDrawn: ele.isDrawn === '' ? 0 : 1,
                fabricType: ele.fabricType,
                sheetNumber: ele.sheetNumber,
                notes: ele.notes
            }
        });

        let jsDate;
        let newDate;

        if (dueDate === '') {
          newDate = ''
        } else {
          jsDate = new Date(dueDate);
          newDate = jsDate.getFullYear() + '-' + (jsDate.getMonth() + 1) + '-' + jsDate.getDate();
        }



        // idForm: this.editFormID,
        // tagNumber: this.tagNumber,
        // tagNumberContext: this.tagNumberContext,
        // tagNumberGroupNumber: this.tagNumberGroupNumber,
        // houseNumber: this.selectedHouseNumber,
        // roomNumber: this.selectedRoomNumber,
        // broadDate: this.selectedBroadDate,
        // detailedDate: this.selectedDetailedDate,
        // dueDate: this.dueDate,
        // processedBy: this.processedBy,
        // detailedRecords: this.detailedRecords,
        // type: 'detailed'

        const form = {
            idForm: undefined,
            tagNumber: tagNumber,
            tagNumberContext: tagNumberContext,
            tagNumberGroupNumber: tagNumberGroupNumber === '' ? 0 : tagNumberGroupNumber.toString(),
            houseNumber: houseNumber,
            roomNumber: roomNumber,
            broadDate: broadDate,
            detailedDate: detailedDate,
            dueDate: newDate,
            processedBy: processedBy,
            detailedRecords: detailedRecrods,
            type: 'detailed'
        }

        console.log('Reds Form #: ', index + 1, form);

        // console.log('writing form');

        this.editService.combineObjects(form);
        this.formSerivce.clearToRemoveArray();
        this.clearForm();
        this.clearSubFormsArray();

    });

}

  public dbRecordEdit(record: any) {
    // console.log(record.roomNumber);
    // console.log(record.houseNumber);

    this.tagNumber = record.tagNumber;
    this.tagNumberContext = record.tagNumberContext;
    this.tagNumberGroupNumber = record.tagNumberGroupNumber;
    this.dueDate = record.dueDate;

    this.selectedBroadDate = record.broadDate;
    this.selectedDetailedDate = record.detailedDate;
    this.selectedRoomNumber = record.roomNumber;
    this.selectedHouseNumber = record.houseNumber;

    this.processedBy = record.processedBy;
    this.showBody();
    this.checkFormValidity();
    // check if the record being edited has basic or detailed records
    this.isBasicVisible = record.basicRecords !== undefined;

    // eidt form ID from Record
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
