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
        this.formSerivce.triageFormArray.subscribe(triageArray => { this.basicRecords = triageArray; console.log(triageArray)});
        this.formSerivce.detailedFormArray.subscribe(detailedArray => { this.detailedRecords = detailedArray; console.log(detailedArray) });
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
    }
    public onProcessedByChange(e: any) {
        this.processedby = e.target.value;
        this.showBody();
    }
    public onDueDateChange(e: any) {
        this.dueDate = e.target.value;
        this.showBody();
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

        this.editService.combineObjects(form);

        this.clearForm();
        this.clearSubFormsArray();
    }

    public onDBdelete(record: any) {
        console.log(record);
        this.offlineDB.remove(record.id);
        this.offlineDB.getAll().then(res => {
            this.offlineDBRecords = res;
            this.editService.responseObject.next(res);
        });
    }
}
