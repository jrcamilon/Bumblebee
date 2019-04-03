import { OfflineDBService } from './../../../../services/OfflineDB/offline-db.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsService } from 'app/processing/services/forms.service';
import { OnlineServiceService } from 'services/OnlineServices/online-service.service';
import { KhppFormService } from 'services/Khpp-Form/Khpp-Form.service';


@Component({
    selector: 'app-khpp-form',
    templateUrl: './khpp-form.component.html',
    styleUrls: ['./khpp-form.component.scss']
})
export class KhppFormComponent implements OnInit, OnDestroy {


    isOnline: boolean;
    visibleTab = 'input';

    isFormBodyVisible = false;
    isBasicVisible = true;

    isKhppFormValid = false;
    buttonValue = 'SUBMIT';
    isEditing = false;

    editFormID: number;

    // Form records
    tagNumber = '';
    processedby = '';
    dueDate = '';
    basicRecords = [];
    detailedRecords = [];

    offlineDBRecords = [];


    constructor(
        public editService: KhppFormService,
        public onlinService: OnlineServiceService,
        public offlineDB: OfflineDBService,
        public formSerivce: FormsService) {
        // Subscriptions
        this.onlinService.isOnline.subscribe(status => { this.isOnline = status; console.log(status) });
        this.formSerivce.triageFormArray.subscribe(triageArray => { this.basicRecords = triageArray; this.checkFormValidity()});
        this.formSerivce.detailedFormArray.subscribe(detailedArray => { this.detailedRecords = detailedArray; this.checkFormValidity() });
        this.editService.responseObject.subscribe(res => { this.offlineDBRecords = res; });
        this.offlineDB.getAll().then( res => { this.offlineDBRecords = res; });
    }


    ngOnDestroy(): void {
        this.clearSubFormsArray();
    }

    public ngOnInit(): void { }

    public onTagChange(e: any) {
        this.tagNumber = e.target.value;
        this.showBody();
        this.checkFormValidity();
    }
    public onProcessedByChange(e: any) {
        this.processedby = e.target.value;
        this.showBody();
        this.checkFormValidity();
    }
    public onDueDateChange(e: any) {
        this.dueDate = e.target.value;
        this.showBody();
        this.checkFormValidity();
    }

    /** Custom function to check weather the to show the body based on three fields */
    private showBody() {
        this.isFormBodyVisible = (this.editService.tagNumberFiledValid(this.tagNumber)
        && this.processedby !== '' && this.dueDate !== '') ? true : false;
    }


    public clearForm() {
        this.isFormBodyVisible = false;
        this.tagNumber = '';
        this.processedby = '';
        this.dueDate = '';
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
        this.visibleTab = value;
    }

    /** Custom method when the user submits the form */
    public onFormSubmit() {
        let form: any;

        if (this.isBasicVisible) {
            form = {
                tagNumber: this.tagNumber,
                dueDate: this.dueDate,
                processedBy: this.processedby,
                basicRecords: this.basicRecords,
            }

        } else {
            form = {
                tagNumber: this.tagNumber,
                dueDate: this.dueDate,
                processedBy: this.processedby,
                detailedRecords: this.detailedRecords
            }

        }

        if (this.isEditing) {
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

        this.clearForm();
        this.clearSubFormsArray();
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
            this.dbRecordEdit(recordToEdit[0]);
            this.isEditing = true;
            this.buttonValue = 'SAVE EDITS';
            this.visibleTab = 'input';

        });
    }

    public dbRecordEdit(record: any) {
        this.tagNumber = record.tagNumber;
        this.dueDate = record.dueDate;
        this.processedby = record.processedBy;
        this.showBody();
        this.checkFormValidity();
        // check if the record being edited has basic or detailed records
        this.isBasicVisible = record.basicRecords !== undefined;

        this.editFormID = record.id;

        // load the record to the child processing
        if (this.isBasicVisible) {
            console.log(record.basicRecords);
            this.formSerivce.recordToEdit.next(record.basicRecords);
        } else {
            console.log(record.detailedRecords);
            this.formSerivce.recordToEdit.next(record.detailedRecords);
        }


    }
}
