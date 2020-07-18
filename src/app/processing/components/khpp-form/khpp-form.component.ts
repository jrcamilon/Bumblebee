import { OfflineDBService } from './../../../../services/OfflineDB/offline-db.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsService } from 'app/processing/services/forms.service';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';
// import {MatTableDataSource} from '@angular/material/table';
import * as _ from 'lodash';
import { ExporterService } from 'services/excel/exporter.service';

import * as redsBasicData from './redsBasic.json';
import * as redsDetailedData from './redsDetailed.json';
import { ElephantineFormService } from 'services/Elephantine-Form/elephantine-form.service';

// REDS IMPORT

// export interface PeriodicElement {
//     name: string;
//     position: number;
//     weight: number;
//     symbol: string;
//   }

//   const ELEMENT_DATA: PeriodicElement[] = [
//     {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//     {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//     {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//     {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//     {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//     {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//     {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//     {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//     {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//     {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   ];

@Component({
    selector: 'app-khpp-form',
    templateUrl: './khpp-form.component.html',
    styleUrls: ['./khpp-form.component.scss']
})
export class KhppFormComponent implements OnInit, OnDestroy {

    public opened = false;
    recordToDelete = null;
    isOnline: boolean;
    visibleTab = 'input';
    public redsBasic = redsBasicData;
    public redsDetailed = redsDetailedData;


    tagHasError = false;
    validTagChar = true;

    isFormBodyVisible = false;
    isBasicVisible = true;

    isKhppFormValid = false;
    buttonValue = 'SUBMIT';
    isEditing = false;

    editFormID: number;

    // Form records
    tagNumber = '';
    processedBy = '';
    dueDate = '';
    basicRecords = [];
    detailedRecords = [];

    offlineDBRecords = [];
    onlineDBRecords = [];
    onlineDBRecordsCopy = [];
    filteredDBRecords = [];

    detailed = [];
    basic = [];

    broadDateOptions = [];
    detailedDateOptions = [];
    selectedBroadDate;
    selectedDetailedDate;


    isEditingOnlineDB = false;

    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    // dataSource = new MatTableDataSource(ELEMENT_DATA);

    constructor(
        public editService: KhppFormService,
        public elephantineFormService: ElephantineFormService,
        public onlinService: OnlineServiceService,
        public exporter: ExporterService,
        public offlineDB: OfflineDBService,
        public formSerivce: FormsService) {
        // Subscriptions
        this.onlinService.isOnline.subscribe(status => { this.isOnline = status; console.log('online-status', status) });
        this.formSerivce.triageFormArray.subscribe(triageArray => { this.basicRecords = triageArray; this.checkFormValidity()});
        this.formSerivce.detailedFormArray.subscribe(detailedArray => { this.detailedRecords = detailedArray; this.checkFormValidity() });
        this.editService.responseObject.subscribe(res => { this.offlineDBRecords = res; });
        this.offlineDB.getAll().then( res => { this.offlineDBRecords = res; });
        if (this.isOnline) {
            this.formSerivce.readFromKHPP().subscribe(res => {
                // console.log('online db records', res);
                this.onlineDBRecords = res;
                this.onlineDBRecordsCopy = res;
            });
        }

        let d: Date = new Date();
        this.dueDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        // Get Deposit Date
        this.broadDateOptions = this.elephantineFormService.getBroadDate();
        this.detailedDateOptions = this.elephantineFormService.getDynasticDate();
        // Broad and Detailed Date defailt selected
        this.setDefaultDepositDates();

    }

    setDefaultDepositDates() {
        this.selectedBroadDate = this.elephantineFormService.getBroadDate()[0].value;
        this.selectedDetailedDate = this.elephantineFormService.getDynasticDate()[0].value;
      }


    ngOnDestroy(): void {
        this.clearSubFormsArray();
    }

    // applyFilter(filterValue: string) {
    //     this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    // custom function to search through tag numbers and filter applicable ones
    onTagSearch(e: any) {
        this.detailed = [];
        this.basic = [];
        const value = e.target.value.toUpperCase();

        // Filter Values
        const _filterVals = _.map(this.onlineDBRecordsCopy, function(o) {
            if (o.tagNumber.includes(value)) { return o; }
        });
        const _newVals = _.without(_filterVals, undefined);

        // console.log(_newVals);

        this.filteredDBRecords = _newVals;
        this.onlineDBRecords = _newVals;
        // console.log(value === '');

        if (value === '') {
            this.onlineDBRecords = this.onlineDBRecordsCopy;
        }
    }

    onExportToExcel(): void {
        console.log(this.filteredDBRecords);

        if (this.filteredDBRecords.length !== 0) {
            for (let i = 0; i < this.filteredDBRecords.length; i++) {
                const element = this.filteredDBRecords[i];
                if (element.detailedCount !== 0) {
                    this.detailed.push(element);
                } else {
                    this.basic.push(element);
                }
            }
        } else {
            for (let i = 0; i < this.onlineDBRecordsCopy.length; i++) {
                const element = this.onlineDBRecordsCopy[i];
                if (element.detailedCount !== 0) {
                    this.detailed.push(element);
                } else {
                    this.basic.push(element);
                }
            }
        }

        const detailedTagNumbers = this.detailed.map(ele => {
            return ele.tagNumber;
        });

        const basicTagNumbers = this.basic.map(ele => {
            return ele.tagNumber;
        });

        // console.log('detailed', detailedTagNumbers);
        // console.log('basic', basicTagNumbers);
        console.log(basicTagNumbers.length + detailedTagNumbers.length);

        // make query to get detailed and basic sheets
        this.formSerivce.getExcelRecords(detailedTagNumbers, basicTagNumbers).subscribe(res => {
            console.log(res);
            this.exporter.exportToExcel(res.data, 'FILTERED');
        });
    }

    public ngOnInit(): void {

    }

    public onTagChange(e: any) {

        this.validTagChar = true;
        this.tagHasError = false

        const position = e.target.selectionStart;

        if (position === 1) {
            e.target.value = e.target.value.toUpperCase();
            if (!isNaN(e.target.value[0])) {
                this.validTagChar = false;
                this.tagHasError = true;
            }
        }

        if (e.target.value.length === 3) {
            const dot =  e.target.value + '.';
            e.target.value = dot;
        }

        if (e.target.value.length === 5) {
            const dash = e.target.value + '-';
            e.target.value = dash;
        }

        if (e.target.value.length === 9) {
            const dash = e.target.value + '-';
            e.target.value = dash;
        }

        // if (e.target.value.length === 12) {
        //     const dot = e.target.value + '.';
        //     e.target.value = dot;
        // }


        this.tagNumber = e.target.value;
        this.showBody();
        this.checkFormValidity();
    }

    public restrictTagChars(e: any) {
        const char = e.target.value;
        return this.validTagChar;
    }

    public onProcessedByChange(e: any) {
        this.processedBy = e.target.value;
        this.showBody();
        this.checkFormValidity();
    }
    public onDueDateChange(e: any) {
        console.log(e.target.value);
        this.dueDate = e.target.value;
        this.showBody();
        this.checkFormValidity();
    }

    /** Custom function to check weather the to show the body based on three fields */
    private showBody() {
        this.isFormBodyVisible =
        (this.editService.tagNumberFiledValid(this.tagNumber)
        && this.processedBy !== ''
        && this.dueDate !== ''
        && this.selectedBroadDate !== ''
        && this.selectedDetailedDate !== ''
        ) ? true : false;
    }


    public clearForm() {
        this.isFormBodyVisible = false;
        this.tagNumber = '';
        this.processedBy = '';
        let d: Date = new Date();
        this.dueDate =  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();;
    }

    public clearSubFormsArray() {
        this.formSerivce.triageFormArray.next([]);
        this.formSerivce.detailedFormArray.next([]);
    }

    /** Custom function to change processing type to basic or detailed */
    public onProcessingTypeChange(value: any) {
        this.isBasicVisible = value === 'basic' ? true : false;
    }

    public toggleScreens(value: string): void {
        // Fetch Data and make section visible
        switch (value) {
            case 'onlineDB':
                // fetch
                if (this.isOnline) {
                    this.formSerivce.readFromKHPP().subscribe(res => {
                        // console.log('online db records', res);
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

    /** Custom method when the user submits the form */
    public onFormSubmit() {

        console.log('ON FORM SUBMIT', this.basicRecords);


        let form: any;

        if (this.isBasicVisible) {
            form = {
                idForm: this.editFormID,
                tagNumber: this.tagNumber,
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
                broadDate: this.selectedBroadDate,
                detailedDate: this.selectedDetailedDate,
                dueDate: this.dueDate,
                processedBy: this.processedBy,
                detailedRecords: this.detailedRecords,
                type: 'detailed'
            }
        }

        console.log('FORM', form);

        if (this.isEditing) {
            // TO DO:
            // Send edited online db records to DB
            if (this.isEditingOnlineDB === true) {
                const recordsToRemove = this.formSerivce.getRemoveArray();

                this.formSerivce.updateToKHPP(form, recordsToRemove).subscribe(res => {
                    console.log(res);
                });
            }

            this.offlineDB.update(this.editFormID, form);
            this.isEditing = false;
            this.editFormID = undefined;
            this.formSerivce.recordToEdit.next([]);
            this.offlineDB.getAll().then(res => {
                this.offlineDBRecords = res;
                this.editService.responseObject.next(res);
            });
            this.buttonValue = 'SUBMIT';
        } else {
            this.editService.combineObjects(form);
        }
        this.formSerivce.clearToRemoveArray();
        this.clearForm();
        this.clearSubFormsArray();
    }
    // REDS Detailed
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
            const dueDate = grouped[tagNumber][0].dueDate;
            const detailedRecrods = grouped[tagNumber].map(ele => {
                return {
                    bodyOrDiagnostic: ele.bodyOrDiagnostic,
                    objectNumber: ele.objectNumber,
                    rimsTstc: ele.rimsTstc === '' ? 0 : 1,
                    ware: ele.ware,
                    surfaceTreatment: ele.surfaceTreatment,
                    decoration: ele.decoration,
                    blackening: ele.blackening,
                    count: ele.count,
                    weight: ele.weight === '' ? 0 : ele.weight,
                    weightType: ele.weightType === '' ? 'g' : ele.weight,
                    hasPhoto: ele.hasPhoto === 'yes' ? 1 : 0,
                    diameter: ele.diameter,
                    percentage: ele.percentage,
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

            const jsDate = new Date(dueDate);
            const newDate = jsDate.getFullYear() + '-' + (jsDate.getMonth() + 1) + '-' + jsDate.getDate();

            const form = {
                idForm: undefined,
                tagNumber: tagNumber,
                dueDate: newDate,
                processedBy: processedBy,
                detailedRecords: detailedRecrods,
                type: 'detailed'
            }

            console.log('Reds Form #: ', index + 1, form);

            // console.log('writing form');
            // this.formSerivce.write(form).subscribe(res => {
            //     console.log('response #:', index + 1, res);
            // });

            this.editService.combineObjects(form);
            this.formSerivce.clearToRemoveArray();
            this.clearForm();
            this.clearSubFormsArray();

        });

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

    // REDS Basic
    onJsonBasicProcess() {
        console.log('processing Red Notebook Data for Basic');
        console.log(this.redsBasic);
        const grouped = _.groupBy(this.redsBasic, (ele) => {
            return ele.tagNumber;
        });

        // console.log(grouped);
        Object.keys(grouped).forEach((tagNumber, index) => {
            // console.log(tagNumber); // tagNumber
            // console.log(grouped[tagNumber]); // array of records

            const processedBy = grouped[tagNumber][0].processedBy;
            const dueDate = grouped[tagNumber][0].dueDate;

            const basicRecords = grouped[tagNumber].map(ele => {
                return {
                    fabricType: ele.fabricType,
                    bodyOrDiagnostic: ele.bodyOrDiagnostic,
                    sherdType: ele.sherdType,
                    count: parseInt(ele.count, 0),
                    weight: parseFloat(ele.weight),
                    weightType: ele.weightType,
                    comments: ele.comments,
                    notes: ele.notes,
                }
            });

            const jsDate = new Date(dueDate);
            const newDate = jsDate.getFullYear() + '-' + (jsDate.getMonth() + 1) + '-' + jsDate.getDate();

            const form = {
                idForm: undefined,
                tagNumber: tagNumber,
                dueDate: newDate,
                processedBy: processedBy,
                basicRecords: basicRecords,
                type: 'basic'
            }

            console.log('Reds Form Basic #: ', index + 1, form);

            // console.log('writing form');
            // this.formSerivce.write(form).subscribe(res => {
            //     console.log('response #:', index + 1, res);
            // });

            this.editService.combineObjects(form);
            this.formSerivce.clearToRemoveArray();
            this.clearForm();
            this.clearSubFormsArray();

        });

    }

    public onCancelEdit() {
        this.isEditing = false;
        this.visibleTab = 'offlineDB';
        this.editFormID = undefined;
        this.formSerivce.recordToEdit.next([]);
        this.offlineDB.getAll().then(res => {
            this.offlineDBRecords = res;
            this.editService.responseObject.next(res);
        });
        this.buttonValue = 'SUBMIT';
        this.clearForm();
        this.clearSubFormsArray();
    }

    public checkFormValidity() {
        this.isKhppFormValid = this.isFormBodyVisible && this.detailedRecords.length !== 0 || this.basicRecords.length !== 0;
    }

    public onDBdelete(record: any) {
        this.offlineDB.remove(record.id);
        this.offlineDB.getAll().then(res => {
            this.offlineDBRecords = res;
            this.editService.responseObject.next(res);
        });
    }

    public onDBedit(record: any) {
        this.offlineDB.getAll().then(res => {
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

    /**
     *  Editing an Online Record from the Database
     * @param record
     */
    public onDBOnlineEdit(record: any) {

        const type = record.basicCount > record.detailedCount ? 'basic' : 'detailed';

        this.formSerivce.editFromKHPP(record.id, type).subscribe(res => {
            console.log('editFromKHPP', res.records);
            const splitDate = record.dueDate.split('-');
            const newDate = splitDate[0] + '-' + splitDate[1] + '-' + splitDate[2];

            let recordToEdit;

            if (type === 'detailed') {
                recordToEdit = {
                    tagNumber: record.tagNumber,
                    broadDate: record.broadDate,
                    detailedDate: record.detailedDate,
                    dueDate: newDate,
                    id: record.id,
                    processedBy: record.processedBy,
                    detailedRecords: res.records
                }
            } else if (type === 'basic') {
                recordToEdit = {
                    tagNumber: record.tagNumber,
                    broadDate: record.broadDate,
                    detailedDate: record.detailedDate,
                    dueDate: newDate,
                    id: record.id,
                    processedBy: record.processedBy,
                    basicRecords: res.records
                }
            }

            this.isEditingOnlineDB = true;

            console.log('onDBOnlineEdit', recordToEdit);

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

    // Close dialog
    public close(status) {
        console.log(`Dialog result: ${status}`);
        switch (status) {
            case 'no':
                // don't delete
                break;
            case 'yes':
                // delete record
                this.formSerivce.deleteFromKHPP(this.recordToDelete.id).subscribe(res => {
                    console.log(res);
                    this.formSerivce.readFromKHPP().subscribe(res => {
                        console.log('online db records', res);
                        this.onlineDBRecords = res;
                    });
                })
                break;
        }

        this.opened = false;
        this.recordToDelete = null;
      }

    public dbRecordEdit(record: any) {
        // debugger;
        this.tagNumber = record.tagNumber;
        this.selectedBroadDate = record.broadDate;
        this.selectedDetailedDate = record.detailedDate;
        this.dueDate = record.dueDate;
        this.processedBy = record.processedBy;
        this.showBody();
        this.checkFormValidity();
        // check if the record being edited has basic or detailed records
        this.isBasicVisible = record.basicRecords !== undefined;

        this.editFormID = record.id;

        // load the record to the child processing
        if (this.isBasicVisible) {
            // console.log(record.basicRecords);
            this.formSerivce.recordToEdit.next(record.basicRecords);
        } else {
            // console.log(record.detailedRecords);
            this.formSerivce.recordToEdit.next(record.detailedRecords);
        }


    }
}
