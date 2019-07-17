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

    public opened = false;
    recordToDelete = null;
    isOnline: boolean;
    visibleTab = 'input';


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
    processedby = '';
    dueDate = '';
    basicRecords = [];
    detailedRecords = [];

    offlineDBRecords = [];
    onlineDBRecords = [];


    constructor(
        public editService: KhppFormService,
        public onlinService: OnlineServiceService,
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
                console.log('online db records', res);
                this.onlineDBRecords = res;
            });
        }

        let d: Date = new Date();
        console.log(d);
        // 2019-07-10
        // this.selDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
        console.log(d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate());
        this.dueDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
        
    }


    ngOnDestroy(): void {
        this.clearSubFormsArray();
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

        if (e.target.value.length === 12) {
            const dot = e.target.value + '.';
            e.target.value = dot;
        }


        this.tagNumber = e.target.value;
        this.showBody();
        this.checkFormValidity();
    }

    public restrictTagChars(e: any) {
        const char = e.target.value;
        return this.validTagChar;
    }

    public onProcessedByChange(e: any) {
        this.processedby = e.target.value;
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
        this.isFormBodyVisible = (this.editService.tagNumberFiledValid(this.tagNumber)
        && this.processedby !== '' && this.dueDate !== '') ? true : false;
    }


    public clearForm() {
        this.isFormBodyVisible = false;
        this.tagNumber = '';
        this.processedby = '';
        let d: Date = new Date();
        this.dueDate =  d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();;
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

    public onDelete(record: any) {
        console.log(record);
        this.recordToDelete = record;
        this.opened = true;

        // prompt if the user wants to delete the record

        // this.formSerivce.deleteFromKHPP(record.id).subscribe(res => {
        //     console.log(res);
        //     this.formSerivce.readFromKHPP().subscribe(res => {
        //         console.log('online db records', res);
        //         this.onlineDBRecords = res;
        //     });
        // })
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
